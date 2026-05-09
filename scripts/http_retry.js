const https = require("https");

const MAX_RETRIES = 7;
const BASE_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 60000;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseRetryAfter(header) {
  if (!header) return null;
  const seconds = Number(header);
  if (!Number.isNaN(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  if (!Number.isNaN(date)) return Math.max(0, date - Date.now());
  return null;
}

function backoffMs(attempt) {
  const exp = Math.min(MAX_BACKOFF_MS, BASE_BACKOFF_MS * 2 ** attempt);
  return Math.floor(exp * (0.5 + Math.random() * 0.5));
}

function httpGetOnce(urlPath, { base, accept }) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath, base);
    https
      .get(
        {
          hostname: url.hostname,
          path: url.pathname + url.search,
          headers: { Accept: accept },
        },
        (res) => {
          if (res.statusCode !== 200) {
            const err = new Error(`HTTP ${res.statusCode} for ${urlPath}`);
            err.statusCode = res.statusCode;
            err.retryAfter = res.headers["retry-after"];
            res.resume();
            return reject(err);
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks).toString()));
        }
      )
      .on("error", reject);
  });
}

async function httpGetWithRetry(urlPath, { base, accept = "application/json" } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await httpGetOnce(urlPath, { base, accept });
    } catch (err) {
      if (err.statusCode !== 429 || attempt >= MAX_RETRIES) throw err;
      const waitMs = parseRetryAfter(err.retryAfter) ?? backoffMs(attempt);
      console.error(`  retry ${attempt + 1}/${MAX_RETRIES} after ${Math.round(waitMs)}ms: ${err.message}`);
      await sleep(waitMs);
    }
  }
}

module.exports = { httpGetWithRetry, sleep };

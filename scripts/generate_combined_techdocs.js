/**
 * generate_combined_techdocs.js — Build a single combined Markdown file
 * from the individual TechDocs source files, using frontmatter depth
 * to set heading hierarchy.
 *
 * Usage:
 *   node scripts/generate_combined_techdocs.js [--product prisma-browser]
 */

const fs = require("fs");
const path = require("path");
const { PRODUCTS, VALID_PRODUCTS } = require("./techdocs_config.js");

const COMBINED_FILES = {
  "prisma-browser": "prisma-access-browser-combined.md",
};

function parseProductFlag() {
  const idx = process.argv.indexOf("--product");
  if (idx === -1 || idx + 1 >= process.argv.length) {
    // Default to all products
    return "all";
  }
  const value = process.argv[idx + 1];
  if (!PRODUCTS[value]) {
    console.error(
      `Error: unknown product "${value}" — choose from: ${VALID_PRODUCTS.join(", ")}`
    );
    process.exit(1);
  }
  return value;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { frontmatter: {}, body: content };

  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
    if (m) fm[m[1]] = m[2];
  }

  const body = content.slice(match[0].length);
  return { frontmatter: fm, body };
}

function shiftHeadings(md, depth, filename) {
  if (depth <= 1) return md;

  // Shift so that depth 1 → h1, depth 2 → h2, etc.
  const shift = depth - 1;
  let inCodeBlock = false;

  return md
    .split("\n")
    .map((line) => {
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      return line.replace(/^(#{1,6}) /, (_, hashes) => {
        const newLevel = Math.min(hashes.length + shift, 6);
        if (hashes.length + shift > 6) {
          console.log(
            `WARNING: heading capped at h6 in ${filename}: "${line.replace(/^#{1,6} /, "")}"`
          );
        }
        return "#".repeat(newLevel) + " ";
      });
    })
    .join("\n");
}

function main() {
  const productFlag = parseProductFlag();
  const targets = productFlag === "all" ? VALID_PRODUCTS : [productFlag];

  for (const productKey of targets) {
    const product = PRODUCTS[productKey];
    if (!product) continue;

    const combinedName = COMBINED_FILES[productKey];
    if (!combinedName) {
      console.log(`No combined file configured for ${productKey}, skipping.`);
      continue;
    }

    const sourceDir = path.join(__dirname, "..", product.outDir);
    if (!fs.existsSync(sourceDir)) {
      console.error(`Error: ${sourceDir} not found — run \`npm run fetch:techdocs\` first`);
      process.exit(1);
    }

    const files = fs
      .readdirSync(sourceDir)
      .filter((f) => /^\d+-/.test(f) && f.endsWith(".md"))
      .sort();

    if (files.length === 0) {
      console.error(`Error: No source files in ${sourceDir}`);
      process.exit(1);
    }

    console.log(`[${productKey}] Combining ${files.length} files...`);

    const sections = [];
    for (const filename of files) {
      const raw = fs.readFileSync(path.join(sourceDir, filename), "utf-8");
      const { frontmatter, body } = parseFrontmatter(raw);
      const depth = parseInt(frontmatter.depth || "0", 10);
      const shifted = shiftHeadings(body.trim(), depth, filename);
      sections.push(shifted);
    }

    const combined = sections.filter(Boolean).join("\n\n");
    const outPath = path.join(sourceDir, combinedName);
    fs.writeFileSync(outPath, combined + "\n", "utf-8");
    console.log(`Combined file: ${outPath}`);
    console.log(`${files.length} topics, ${combined.split("\n").length} lines`);
  }
}

module.exports = { shiftHeadings, parseFrontmatter, COMBINED_FILES };

if (require.main === module) {
  main();
}

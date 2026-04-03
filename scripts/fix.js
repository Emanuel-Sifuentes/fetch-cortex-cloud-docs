const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const { resolveTargetMaps } = require("./map_config.js");
const { SASE_PRODUCTS, PRODUCT_FAMILIES } = require("./aem_config.js");

const OUT_DIR = path.join(__dirname, "..", "sources_fetch");

const targets = resolveTargetMaps();
const dirs = [...new Set(targets.map((t) => path.join(OUT_DIR, t)))];

const productIdx = process.argv.indexOf("--product");
const productValue = productIdx !== -1 ? process.argv[productIdx + 1] : null;

if (!productValue || PRODUCT_FAMILIES[productValue] || SASE_PRODUCTS[productValue]) {
  const aemTargets = PRODUCT_FAMILIES[productValue]
    ? PRODUCT_FAMILIES[productValue]
    : productValue && SASE_PRODUCTS[productValue]
      ? [productValue]
      : Object.keys(SASE_PRODUCTS);
  for (const t of aemTargets) {
    dirs.push(path.join(OUT_DIR, t));
  }
}

for (const dir of dirs) {
  if (!fs.existsSync(dir)) {
    console.log(`Skipping ${path.basename(dir)}/ (not found)`);
    continue;
  }

  const files = fs.readdirSync(dir).filter((f) => /^\d+-/.test(f) && f.endsWith(".md"));
  if (files.length === 0) {
    console.log(`Skipping ${path.basename(dir)}/ (no source files)`);
    continue;
  }

  console.log(`\n=== Fixing ${path.basename(dir)}/ (${files.length} files) ===\n`);

  const cmds = [
    `python scripts/fix_abstract_lines.py --sources "${dir}"`,
    `python scripts/fix_escaped_chars_in_fences.py "${dir}"`,
    `python scripts/fix_escaped_underscores.py --sources "${dir}"`,
    `python scripts/fix_images_and_fences.py --sources "${dir}"`,
    `python scripts/fix_broken_tables.py --sources "${dir}"`,
  ];

  for (const cmd of cmds) {
    try {
      const output = execSync(cmd, { cwd: path.join(__dirname, ".."), encoding: "utf-8" });
      if (output.trim()) console.log(output.trim());
    } catch (err) {
      console.error(`FAILED: ${cmd}`);
      if (err.stdout) console.error(err.stdout);
      if (err.stderr) console.error(err.stderr);
      process.exit(1);
    }
  }
}

// Run combine with same --product flag
const productArgs = productIdx !== -1 ? ` --product ${process.argv[productIdx + 1]}` : "";
console.log("\n=== Generating combined files ===\n");
try {
  const output = execSync(`node scripts/generate_combined.js${productArgs}`, {
    cwd: path.join(__dirname, ".."),
    encoding: "utf-8",
  });
  if (output.trim()) console.log(output.trim());
} catch (err) {
  console.error("FAILED: generate_combined.js");
  if (err.stdout) console.error(err.stdout);
  if (err.stderr) console.error(err.stderr);
  process.exit(1);
}

// Update metadata snapshots after successful pipeline run
console.log("\n=== Updating metadata snapshots ===\n");
try {
  const snapshotOutput = execSync(`node scripts/snapshot.js${productArgs}`, {
    cwd: path.join(__dirname, ".."),
    encoding: "utf-8",
  });
  if (snapshotOutput.trim()) console.log(snapshotOutput.trim());
} catch (err) {
  console.error("WARNING: snapshot update failed (non-fatal)");
  if (err.stderr) console.error(err.stderr);
}

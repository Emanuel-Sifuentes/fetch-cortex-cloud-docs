const MAP_IDS = {
  appsec:  "aUsxSwBeRrRs3Jm36XHckg",
  posture: "BNCvOg6pEdBp~axnn92pBQ",
  runtime: "bKDBlplrokDJKA~h8O9o6A",
};

const COMBINED_FILES = {
  appsec:  "cortex-cloud-appsec-combined.md",
  posture: "cortex-cloud-posture-combined.md",
  runtime: "cortex-cloud-runtime-combined.md",
};

const VALID_MAPS = Object.keys(MAP_IDS);

function parseMapFlag(defaultValue) {
  const idx = process.argv.indexOf("--map");
  if (idx === -1 || idx + 1 >= process.argv.length) return defaultValue;
  const value = process.argv[idx + 1];
  if (value !== "all" && !MAP_IDS[value]) {
    console.error(`Error: unknown map "${value}" -- choose from: ${VALID_MAPS.join(", ")}, all`);
    process.exit(1);
  }
  return value;
}

module.exports = { MAP_IDS, COMBINED_FILES, VALID_MAPS, parseMapFlag };

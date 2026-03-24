const MAP_IDS = {
  appsec:            "aUsxSwBeRrRs3Jm36XHckg",
  posture:           "BNCvOg6pEdBp~axnn92pBQ",
  runtime:           "bKDBlplrokDJKA~h8O9o6A",
  cortex_gateway:    "ZWXhaub16NEvT6KqtDECXg",
  xdr_5:             "GD6sG6FlxDWxAn13_eZuUQ",
  xdr_compatibility: "8lDOhBUPTpk2LO5DciMLSQ",
  xsiam_3:           "5CAbsl8idaK8R43ZLhoTOw",
  agentix:           "2iKvnhFnGXeKYHSA2AFcVw",
};

const COMBINED_FILES = {
  appsec:            "cortex-cloud-appsec-combined.md",
  posture:           "cortex-cloud-posture-combined.md",
  runtime:           "cortex-cloud-runtime-combined.md",
  cortex_gateway:    "cortex-gateway-combined.md",
  xdr_5:             "cortex-xdr-5-combined.md",
  xdr_compatibility: "cortex-xdr-compatibility-combined.md",
  xsiam_3:           "cortex-xsiam-3-combined.md",
  agentix:           "cortex-agentix-combined.md",
};

const PRODUCTS = {
  cloud:   ["appsec", "posture", "runtime"],
  xdr:     ["xdr_5", "xdr_compatibility"],
  xsiam:   ["xsiam_3"],
  gateway: ["cortex_gateway"],
  agentix: ["agentix"],
};

const VALID_MAPS = Object.keys(MAP_IDS);
const VALID_PRODUCTS = Object.keys(PRODUCTS);

function parseProductFlag() {
  const idx = process.argv.indexOf("--product");
  if (idx === -1 || idx + 1 >= process.argv.length) return null;
  const value = process.argv[idx + 1];
  if (!PRODUCTS[value]) {
    console.error(`Error: unknown product "${value}" -- choose from: ${VALID_PRODUCTS.join(", ")}`);
    process.exit(1);
  }
  return value;
}

function resolveTargetMaps() {
  const product = parseProductFlag();
  if (product) return PRODUCTS[product];
  return VALID_MAPS;
}

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

module.exports = { MAP_IDS, COMBINED_FILES, PRODUCTS, VALID_MAPS, VALID_PRODUCTS, parseMapFlag, parseProductFlag, resolveTargetMaps };

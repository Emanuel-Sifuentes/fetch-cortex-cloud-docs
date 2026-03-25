const STOPLIGHT_PROJECTS = {
  cloud: {
    workspace: "cortex-panw",
    projectId: "cHJqOjI3NjQwOQ",
    slug: "cortex-cloud",
    host: "https://cortex-panw.stoplight.io",
  },
};

const VALID_PRODUCTS = Object.keys(STOPLIGHT_PROJECTS);

function parseStoplightFlags() {
  const args = process.argv;
  const productIdx = args.indexOf("--product");
  let product = null;
  if (productIdx !== -1 && productIdx + 1 < args.length) {
    product = args[productIdx + 1];
    if (!STOPLIGHT_PROJECTS[product]) {
      console.error(
        `Error: unknown product "${product}" -- choose from: ${VALID_PRODUCTS.join(", ")}`
      );
      process.exit(1);
    }
  }
  const force = args.includes("--force");
  return { product, force };
}

function resolveTargetProducts() {
  const { product } = parseStoplightFlags();
  return product ? [product] : VALID_PRODUCTS;
}

module.exports = {
  STOPLIGHT_PROJECTS,
  VALID_PRODUCTS,
  parseStoplightFlags,
  resolveTargetProducts,
};

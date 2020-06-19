module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/products": { page: "/products" },
      "/produkty": { page: "/products" },
    }
  },
}

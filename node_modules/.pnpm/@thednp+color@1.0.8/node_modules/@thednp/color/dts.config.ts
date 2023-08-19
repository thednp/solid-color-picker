const config = {
  // source
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: "./dist/index.d.ts",
      noCheck: false,
      output: {
        umdModuleName: 'Color',
        noBanner: true,
      }
    },
  ],
};

module.exports = config;

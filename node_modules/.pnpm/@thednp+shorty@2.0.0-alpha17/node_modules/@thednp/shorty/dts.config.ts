// @ts-check
const packageJson = require("./package.json");

const getPackageName = () => {
  return packageJson.name.includes('@') ? packageJson.name.split('/')[1] : packageJson.name;
};

const config = {
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: `./dist/${getPackageName()}.d.ts`,
      noCheck: false,
      output: {
        umdModuleName: 'SHORTY',
        noBanner: true,
      }
    },
  ],
};

module.exports = config;

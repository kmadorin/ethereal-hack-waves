const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/test.js",
  output: {
    path: path.resolve(__dirname, "src/js"),
    filename: "ts-crypto.js"
  }
};

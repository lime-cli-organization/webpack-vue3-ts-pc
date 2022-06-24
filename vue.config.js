// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(path.join(__dirname, "src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.join(__dirname, "src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
      .before("svg-sprite-loader")
      .use("svgo-loader")
      .loader("svgo-loader")
      .options({
        plugins: [
          //!重点就是改这个位置，加个插件名字
          {
            name: "removeAttrs",
            params: {
              attrs: "(fill|stroke)",
            },
          },
        ],
      })
      .end();
  },
};

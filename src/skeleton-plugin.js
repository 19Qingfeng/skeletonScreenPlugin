const Server = require("./server");
const Skeleton = require("./skeleton");
const { resolve } = require("path");
const { validate } = require("schema-utils");
const schema = require("./uitls/schema");
const { writeFileSync } = require("fs");

const NAME = "SkeletonScreenPlugin";

class SkeletonScreenPlugin {
  constructor(options) {
    this.options = options;
    // 参数校验内容
    validate(schema, options, { name: NAME });
  }
  apply(compiler) {
    compiler.hooks.done.tap(NAME, async () => {
      // 启动静态服务器访问生成的页面
      await this.openServer();
      // 生成骨架屏内容
      // .. 使用
      this.skeleton = new Skeleton(this.options);
      // 初始化骨架屏 通过pub 生成无头浏览器
      await this.skeleton.initialize();
      // 生成骨架页面 HTML和CSS
      const { html, css } = await this.skeleton.generatePage();
      // console.log(skeletonHTML, "生成的骨架屏内容");
      const outputDom = resolve(this.options.output, "index.jsx");
      const outputCss = resolve(this.options.output, "index.css");
      // TODO: 整理HTML输出
      // 1. 引入css
      // 2. 剔除冗余不需要的DOM
      // 3. 支持可编辑独立性
      await writeFileSync(outputDom, html);
      await writeFileSync(outputCss, css);
      // 销毁骨架屏 无头浏览器
      // this.skeleton.destroy();
      // 结束后，关闭服务器
      // await this.server.close();
    });
  }
  async openServer() {
    this.server = new Server(this.options);
    await this.server.listen();
  }
}

module.exports = {
  SkeletonScreenPlugin,
};

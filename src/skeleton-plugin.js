const Server = require('./server');
const Skeleton = require('./skeleton');
const NAME = 'SkeletonScreenPlugin';

class SkeletonScreenPlugin {
  constructor(options) {
    this.options = options;
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
      const skeletonHTML = await this.skeleton.generatePage();
      console.log(skeletonHTML, 'skeletonHTML');
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

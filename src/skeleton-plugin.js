const Server = require('./server');
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
      // ..
      // 结束后，关闭服务器
      await this.server.close();
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

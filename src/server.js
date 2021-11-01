const express = require('express');
const http = require('http');

class Server {
  constructor(options) {
    this.options = options;
  }
  // 监听
  listen() {
    const { port, dir } = this.options;
    const app = (this.app = express());
    // 使用静态文件中间件，用来让返回dir中的内容
    app.use(express.static(dir));
    this.httpServer = http.createServer(app);
    return new Promise((resolve) => {
      this.httpServer.listen(port, () => {
        console.log('Now Server is run in' + port + '!');
        resolve();
      });
    });
  }
  // 关闭
  close() {
    return new Promise((resolve) => {
      this.httpServer.close(this.options.port, () => {
        resolve();
      });
    });
  }
}

module.exports = Server;

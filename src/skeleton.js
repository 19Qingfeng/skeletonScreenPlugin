const puppeteer = require('puppeteer');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { sleep } = require('./uitls');

class Skeleton {
  constructor(options) {
    this.options = options;
  }

  async initialize() {
    // 启动 puppeteer
    this.page = await puppeteer.launch({
      // 配置无头
      headless: false,
    });
  }

  async generatePage() {
    // 打开新的页签tab 拿到新的page
    this.page = await this.openNewPage();
    // 输入地址 等待仅有两个网络链接时Promise完成
    const response = await this.gotoPage({
      waitUntil: 'networkidle2',
    });
    // 失败
    if (response && !response.ok()) {
      throw new Error(`${response.status} on ${this.options.origin} is Error!`);
    }
    // 需要生成骨架屏DOM结构
    await this.makeSkeleton();
    return 'html';
  }

  // 打开新的页签
  async openNewPage() {
    const { device } = this.options;
    const page = await this.page.newPage();
    // 适配移动端 根据传入设备生成模拟器
    await page.emulate(puppeteer.devices[device]);
    return page;
  }

  // 跳转网页
  async gotoPage() {
    const { origin } = this.options;
    await this.page.goto(origin);
  }

  // 通过原始DOM结构获得骨架屏结构
  async makeSkeleton() {
    const page = this.page;
    const { defer = 500 } = this.options;
    // 往页面注入script脚本
    const content = await readFileSync(
      resolve(__dirname, './create-skeleton-script.js'),
      'utf-8'
    );
    page.addScriptTag({
      content,
    });
    // 延迟
    await sleep(defer);
  }

  // 销毁
  async destroy() {
    if (this.page) {
      // 关掉浏览器tab页
      await this.page.close();
      // 变量重置为null
      this.page = null;
    }
  }
}

module.exports = Skeleton;

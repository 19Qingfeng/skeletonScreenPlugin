window.Skeleton = (function () {
  const $$ = document.querySelectorAll.bind(document);
  // 需要删除的额外标签
  const removeBodyTags = ["script", "title", "meta", "style"];
  // 转化页面为骨架屏
  function generateSkeleton(options) {
    // 遍历页面所有的结构
    const rootElement = document.documentElement(
      (function traverse() {
        const { button, image } = options;
        // 存放当前页面所有的DOM结构
        const buttons = [];
        const images = [](
          (function preTraverse(element) {
            // 从根元素开始遍历 优先从底部节点进行遍历
            if (element.children && element.children.length > 0) {
              element.children.forEach((child) => arguments.callee(child));
            }
            // 目前已经是跟节点了
          })(rootElement)
        );
      })()
    );
    console.log("生成骨架屏幕");
  }
  // 返回骨架屏DOM结构
  function getSkeleton() {
    const styles = Array.from($$("style")).map(
      (style) => style.innerHTML || style.innerText
    );

    const html = getBodyWithoutTags();

    return {
      html,
      styles,
    };
  }

  // 排除body中多余元素
  function getBodyWithoutTags() {
    Array.from($$(removeBodyTags.join(","))).forEach((el) =>
      el.parentNode.removeChild(el)
    );
    return document.body.innerHTML;
  }

  return {
    generateSkeleton,
    getSkeleton,
  };
})();

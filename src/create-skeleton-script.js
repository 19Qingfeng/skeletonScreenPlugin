window.Skeleton = (function () {
  const $$ = document.querySelectorAll.bind(document);
  // 需要删除的额外标签
  const removeBodyTags = ["script", "title", "meta", "style"];
  // 转化页面为骨架屏
  function generateSkeleton(options) {
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
    // 删除多余DOM结构
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

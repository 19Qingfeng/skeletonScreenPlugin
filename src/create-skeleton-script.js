window.Skeleton = (function () {
  const parseToArray = Array.from.bind(Array);
  const $$ = document.querySelectorAll.bind(document);
  const styleCache = new Map();
  // 图片替代方案
  const imageUrl =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const handlers = {
    button: {
      elements: [],
      className: "sk-button",
      handler(node, elements, className, options) {
        const { button } = options;
        // 首先为当前元素添加累名
        node.classList.add(className);
        // 其次将当前元素push进入elements中
        elements.push(node);
        // 然后再次根据类名生成style
        const buttonStyles = `{
          color:${button.color}!important;
          background:${button.color}!important;
          border:none!important;
          box-shadow:none!important;
        }
        `;
        addStyles(`.${className}`, buttonStyles);
      },
    },
    img: {
      elements: [],
      className: "sk-image",
      handler(node, elements, className, options) {
        const { image } = options;
        node.classList.add(className);
        elements.push(node);
        // TODO: 图片宽度是固定的 看看能否根据以前的换成响应式大小
        const { width, height } = node.getBoundingClientRect();
        const attrs = {
          height,
          width,
          src: imageUrl,
        };
        setAttribution(node, attrs);
        const imageStyles = `{
          background:${image.color}
        }
        `;
        addStyles(`.${className}`, imageStyles);
      },
    },
  };
  // 增加样式
  function addStyles(selector, rule) {
    if (styleCache.has(selector)) {
      return;
    }
    styleCache.set(selector, rule);
  }
  // 设置属性
  function setAttribution(node, attrs) {
    Object.keys(attrs).forEach((key) => {
      const value = attrs[key];
      node.setAttribute(key, value);
    });
  }
  // 需要删除的额外标签
  const removeBodyTags = ["script", "title", "meta"];

  // 外部调用:转化页面为骨架屏
  function generateSkeleton(options) {
    // 遍历页面所有的结构
    const rootElement = document.documentElement;
    (function traverse() {
      (function preTraverse(element) {
        // 从根元素开始遍历 优先从底部节点进行遍历
        if (element.children && element.children.length > 0) {
          parseToArray(element.children).forEach((child) =>
            arguments.callee(child)
          );
        }
        tagHandler(element, options);
      })(rootElement);
      // 生成最终的style样式内容添加到页面上
      generateStyleNodeToPage();
    })();
  }

  // 插件调用:返回骨架屏DOM结构
  function getSkeleton() {
    // 挂架屏的css样式内容 我只要单独生成的样式
    // const styles = Array.from($$("style")).map(
    //   (style) => style.innerHTML || style.innerText
    // );

    const styles = parseToArray($$("style"))
      .filter((style) => style.market === "wang.haoyu")
      .map((i) => i.innerHTML);

    const html = getBodyWithoutTags();

    return {
      html,
      styles,
    };
  }

  // 不同节点的骨架屏处理方式
  function tagHandler(node, options) {
    const nodeType = node.tagName.toLowerCase();
    if (!(nodeType in handlers)) {
      console.log(`Does not support the tag:<${nodeType}>...</${nodeType}>`);
      return;
    }
    const { elements, className, handler } = handlers[nodeType];
    handler(node, elements, className, options);
  }

  // 排除body中多余元素
  function getBodyWithoutTags() {
    Array.from($$(removeBodyTags.join(","))).forEach((el) =>
      el.parentNode.removeChild(el)
    );
    return document.body.innerHTML;
  }

  // 生成最终导出样式内容
  function generateStyleNodeToPage() {
    let style = "";
    styleCache.forEach((value, key) => {
      style += `${key} ${value} \n`;
    });
    const styleEl = document.createElement("style");
    styleEl.innerHTML = style;
    styleEl.market = "wang.haoyu";
    document.head.appendChild(styleEl);
    return style;
  }

  return {
    generateSkeleton,
    getSkeleton,
  };
})();

# skeletonScreenPlugin

a Skeleton screen plugin for ReactJs.

# 生成骨架屏的实现思路。

+ 监听打包完成的事件。当`webpack`编译完成代码后，会讲打包文件输出到`output`中。通过`pub`自动化访问生成的网站，抓取骨架内容。

+ 也就是通过`pub`预览我们生成的页面，之后在通过`pub`生成页面骨架屏。抓取对应的`html`和`css`。



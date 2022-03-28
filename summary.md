# 样式重整改动

这里简单说一下这次样式重整改动点和需要注意的地方

## 一、html 结构改造

之前多个页面用了同一套 head 的 css 和 js,会导致页面加载无用代码,现在进行分类和引用所需代码.

- 客户端需要渲染页面总共有3个
  - index.html - 首页
  - products/single.html - 产品详细页
  - news/single.html - 新闻详细页
- 通用模块,在partials下:
  - head.html - html head,主要加载css和js
  - header.html - 页头导航栏
  - footer.html - 页脚copyright
- 其他模块,在partials下(在首页作为模块使用):
  - home.html - 首页第一个section部分
  - about.html - 关于我们部分
  - produc.htmlt - 产品部分
  - solution.html - 应用场景部分
  - news.html - 最新动态部分
  - concat.html - 联系我们部分
  - control.html - 控制栏(已废弃,可忽略)
- css资源,在assets下:
  - normalize.scss - 统一样式初始化
  - common.scss - 公用样式
  - main.scss - 主样式
  - media.scss - 媒体查询
  - product.scss - 产品详情样式
  - news.scss - 新闻详情样式
- js资源,,在assets下:
  - main.js - 主脚本
  - product.js - 产品详情页脚本

## 二、样式注意点

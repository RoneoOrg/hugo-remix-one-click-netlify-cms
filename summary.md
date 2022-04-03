# 样式重整改动

这里简单说一下这次样式重整改动点和需要注意的地方

## 一、html 结构改造

之前多个页面用了同一套 head 的 css 和 js,会导致页面加载无用代码,现在进行分类和引用所需代码.

- 客户端需要渲染页面总共有 3 个
  - index.html - 首页
  - products/single.html - 产品详细页
  - news/single.html - 新闻详细页
- 通用模块,在 partials 下:
  - head.html - html head,主要加载 css 和 js
  - header.html - 页头导航栏
  - footer.html - 页脚 copyright
- 其他模块,在 partials 下(在首页作为模块使用):
  - home.html - 首页第一个 section 部分
  - about.html - 关于我们部分
  - produc.htmlt - 产品部分
  - solution.html - 应用场景部分
  - news.html - 最新动态部分
  - concat.html - 联系我们部分
  - control.html - 控制栏(已废弃,可忽略)
- css 资源,在 assets 下:
  - normalize.scss - 统一样式初始化
  - common.scss - 公用样式
  - main.scss - 主样式
  - media.scss - 媒体查询
  - product.scss - 产品详情样式
  - news.scss - 新闻详情样式
- js 资源,,在 assets 下:
  - main.js - 主脚本
  - product.js - 产品详情页脚本

---

html 页面结构如下:

```html
<!DOCTYPE html>
<html lang="en">
  <!-- head link and script -->
  {{ partial "head.html" .}}

  <body>
    <!-- navigation header -->
    {{ partial "header.html" .}}

    <!-- section list -->
    <div class="main-content">
      {{ partial "home.html" .}} {{ partial "about.html" .}} {{ partial
      "products.html" .}} {{ partial "scenes.html" .}} {{ partial "news.html"
      .}} {{ partial "contact.html" .}}
    </div>

    <!-- footer copyright -->
    {{ partial "footer.html" .}}
  </body>
</html>
```

---

css 结构相对比较简单,在上面所述的拆分后,主样式都在 `main.scss`、`product.scss`、`news.scss`和`media.scss`.其余的辅助 css 可以不太理会.

其中`news.scss` 和 `product.scss` 是 2 个详细页专属,单独加载.不会对首页的样式进行污染.

main.scss 结构如下:

```css
/*导航栏(通用)*/
.header-bar {
  ...;
}

/*sec1~6是首页的各个模块*/
.sec1 {
  ...;
}

/*...省略...*/

/*页脚(通用)*/
.footer {
  ...;
}
```

## 二、开发注意点

### 资源加载与脚本运行

资源直接在 head.html 下加 link 或者 script 就好.
首页会加载 main.js 脚本,直接在 main.js 下修改即可

### 导航栏菜单

导航栏主要存放在 header.html,以下会讲解对应菜单配置:

```html
<div class="nav">
  <!-- 没有子菜单的,直接一个a标签加data-id即可,其中data-id是滚动到对应首页模块的id,在main.js下实现了滚动逻辑 -->
  <a class="item" href="/#home" data-id="home">Home</a>

  <!-- 有子菜单的 -->
  <a class="item" href="/#product" data-id="product">
    <!-- 先用span和i把文案和icon包起来 -->
    <span>Product</span>
    <i class="fa-solid fa-angle-down"></i>
    <!-- 再加入一个ul列表 -->
    <ul>
      <!-- li是子菜单项 -->
      <li>product1</li>
      <!-- 还有子菜单的 -->
      <li>
        <!-- 继续用span和i把文案和icon包起来 -->
        <span>product2</span>
        <i class="fa-solid fa-angle-down"></i>
        <!-- 再再加入一个ul列表 -->
        <ul>
          <!-- 再再再加入li孙菜单项 -->
          <li>sub product1</li>
          <li>sub product2</li>
        </ul>
      </li>
      <li>product3</li>
      <li>product4</li>
    </ul>
  </a>
</div>
```

`main.js` 中的`initNav`方法负责对应的 js 逻辑,具体可以直接看代码注释

### 产品详细页菜单

产品详细页在`layouts/products/single.html`

```html
<!-- ul列表 -->
<ul class="list">
  <!-- li为菜单 -->
  <li>
    <div>
      <span>product0</span>
    </div>
  </li>
  <!-- li为菜单, 当有子菜单的时候,可以增加class=open打开子菜单,如果不加class=open则是关闭子菜单 -->
  <li class="open">
    <div>
      <!-- 有子菜单的时候,需要加一个icon -->
      <i class="fa-solid fa-angle-right"></i>
      <span>product1</span>
    </div>
    <!-- 再增加一个子菜单列表, 有没有发现这个ul跟一开始的ul很相似, 对!这就是无限套娃,一毛一样的结构 -->
    <ul class="list">
      <li>
        <div>
          <span>sub product1</span>
        </div>
      </li>
      <li>
        <div>
          <span>sub product2</span>
        </div>
      </li>
      <li>
        <div>
          <span>sub product3</span>
        </div>
      </li>
    </ul>
  </li>
</ul>
```

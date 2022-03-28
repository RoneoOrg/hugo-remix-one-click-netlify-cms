document.addEventListener("DOMContentLoaded", init);

let clientHeight = 0;
let navEle = undefined;
let themeEle = undefined;

// 屏幕高度
function getClientHeight() {
  let height = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    height =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    height =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return height;
}

// 初始化
function init() {
  console.log("document ready!");
  initData();
  initNav();
  initScroll();
}

// 数据初始化
function initData() {
  clientHeight = getClientHeight();
  navEle = document.querySelector(".header-bar");
  const theme = localStorage.getItem("theme");
  if (theme) {
    const html = document.querySelector("html");
    html.setAttribute("class", theme);
  }
}

// 导航栏初始化
function initNav() {
  const headerEle = document.querySelector(".header-bar");
  const navItems = document.querySelectorAll(".nav .item");
  const themeEle = document.querySelector(".header-bar .theme");
  const langEle = document.querySelector(".header-bar .lang");
  const listItems = document.querySelectorAll(".nav .item ul li");
  const menuEle = document.querySelector(".header-bar .menu");

  if (navItems) {
    for (let item of navItems) {
      item.onclick = function (e) {
        e.preventDefault();
        const target = e.target;
        const parentTarget = e.target.parentElement;
        const id = target.getAttribute("data-id") || parentTarget.getAttribute("data-id");

        if (location.pathname !== "/") {
          location.href = "/#" + id;
          return;
        }

        const nextDom = document.querySelector("#" + id);
        if (nextDom) {
          const top = nextDom.offsetTop;
          document.scrollingElement.scrollTo({
            top: top,
            left: 0,
            behavior: "smooth",
          });
        }
      };
    }
  }

  if (themeEle) {
    themeEle.onclick = function () {
      const html = document.querySelector("html");
      const htmlThemeClass = html.getAttribute("class");
      const val = htmlThemeClass === "light-mode" ? "" : "light-mode";
      html.setAttribute("class", val);
      localStorage.setItem("theme", val);
    };
  }

  if (langEle) {
    langEle.onclick = function () {
      alert("你点击了我");
    };
  }

  if (listItems) {
    for (let item of listItems) {
      item.onclick = function (e) {
        const target = e.target;
        if (target.tagName === "SPAN" || target.parentElement.tagName === "A") {
          return;
        }
        e.preventDefault();
        const id = target.getAttribute("data-id");
        alert("点击了子菜单");
      };
    }
  }

  if (menuEle) {
    menuEle.onclick = function () {
      const className = headerEle.getAttribute("class");
      headerEle.setAttribute("class", className === "header-bar open-menu" ? "header-bar" : "header-bar open-menu");
    };
  }
}

// 滚动初始化
function initScroll() {
  window.onscroll = function (e) {
    if (document.scrollingElement.scrollTop >= clientHeight) {
      navEle.setAttribute("class", "header-bar scroll");
    } else {
      navEle.setAttribute("class", "header-bar");
    }
  };
}

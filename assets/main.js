document.addEventListener("DOMContentLoaded", init);

let clientHeight = 0;
let navEle = undefined;
let themeEle = undefined;
let sectionEle = undefined;

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

// hash修改
function changeHash(id) {
  const url = location.pathname + "#" + id;
  history.replaceState(null, null, url);
}

// header子菜单点击
function handleHeaderSubMenuClick(e, href) {
  e.stopPropagation();
  e.preventDefault();
  location.href = href;
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
  sectionEle = document.querySelectorAll("section.section");
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

  // 菜单点击
  if (navItems) {
    for (let item of navItems) {
      item.onclick = function (e) {
        e.preventDefault();
        const target = e.target;
        const parentTarget = e.target.parentElement;
        const id =
          target.getAttribute("data-id") ||
          parentTarget.getAttribute("data-id");

        const nextDom = document.querySelector("#" + id);
        // 如果有目标元素才进行跳转
        if (nextDom) {
          const top = nextDom.offsetTop;
          document.scrollingElement.scrollTo({
            top: top,
            left: 0,
            behavior: "smooth",
          });

          setTimeout(() => {
            changeHash(id);
          }, 1000);
        } else if (location.pathname !== "/" || location.pathname !== "/fr/") {
          if (location.pathname.indexOf("/fr") > -1) {
            location.href = "/fr/#" + id;
          } else {
            location.href = "/#" + id;
          }
        }
      };
    }
  }

  // 主题切换点击
  if (themeEle) {
    themeEle.onclick = function () {
      const html = document.querySelector("html");
      const htmlThemeClass = html.getAttribute("class");
      const val = htmlThemeClass === "light-mode" ? "" : "light-mode";
      html.setAttribute("class", val);
      localStorage.setItem("theme", val);
    };
  }

  // 语言切换点击
  if (langEle) {
    langEle.onclick = function () {
      switch (langEle.innerText) {
        case "en":
          location.href = "/fr";
          break;
        case "fr":
          location.href = "/";
          break;
      }
    };
  }

  // 子菜单点击
  // if (listItems) {
  // for (let item of listItems) {
  // item.onclick = function (e) {
  // e.stopPropagation();
  // e.preventDefault()
  // const target = e.target;
  // alert("点击了子菜单" + target.innerHTML);
  // };
  // }
  // }

  // 手机版的展开菜单点击
  if (menuEle) {
    menuEle.onclick = function () {
      const className = headerEle.getAttribute("class");
      headerEle.setAttribute(
        "class",
        className === "header-bar open-menu"
          ? "header-bar"
          : "header-bar open-menu"
      );
    };
  }
}

// 滚动初始化
function initScroll() {
  let timer;
  window.onscroll = function (e) {
    if (timer) {
      return;
    } else {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = undefined;
      }, 300);
    }
    if (document.scrollingElement.scrollTop >= clientHeight) {
      navEle.setAttribute("class", "header-bar scroll");
    } else {
      navEle.setAttribute("class", "header-bar");
    }
    let target;
    for (let ele of sectionEle) {
      const r = ele.getBoundingClientRect();
      if (r.top <= 0) {
        target = ele;
      }
    }
    if (target) {
      const id = target.getAttribute("id");
      changeHash(id);
    }
  };
}

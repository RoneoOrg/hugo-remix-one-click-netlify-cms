document.addEventListener("DOMContentLoaded", init);

let clientHeight = 0;
let navEle = undefined;
let themeEle = undefined;

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

function init() {
  console.log("document ready!");
  initData();
  initNav();
  initScroll();
}

function initData() {
  clientHeight = getClientHeight();
  navEle = document.querySelector(".header-bar");
  const theme = localStorage.getItem("theme");
  if (theme) {
    const html = document.querySelector("html");
    html.setAttribute("class", theme);
  }
}

function initNav() {
  const navitems = document.querySelectorAll(".nav .item");
  const themeEle = document.querySelector(".header-bar .theme");

  if (navitems) {
    for (let item of navitems) {
      item.onclick = function (e) {
        e.preventDefault();
        const target = e.target;
        const id = target.getAttribute("data-id");
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
}

function initScroll() {
  window.onscroll = function (e) {
    if (document.scrollingElement.scrollTop >= clientHeight) {
      navEle.setAttribute("class", "header-bar scroll");
    } else {
      navEle.setAttribute("class", "header-bar");
    }
  };
}

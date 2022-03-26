document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("document ready!");
  initNav();
}

function initNav() {
  const navitems = document.querySelectorAll(".nav .item");
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
}

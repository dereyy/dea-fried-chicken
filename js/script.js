// toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger-menu di klik

document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar side bar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// slider
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".slider .dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let active = 0;
let lengthItems = items.length - 1;

next.onclick = function () {
  if (active + 1 > lengthItems) {
    active = 0;
  } else {
    active = active + 1;
  }
  reloadSlider();
};

prev.onclick = function () {
  if (active - 1 > 0) {
    active = lengthItems;
  } else {
    active = active - 1;
  }
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  next.click();
}, 5000);

function reloadSlider() {
  let checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";

  let lastActiveDot = document.querySelector(".slider .dots li.active");
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 5000);
}

dots.forEach((li, key) => {
  li.addEventListener("click", function () {
    active = key;
    reloadSlider();
  });
});

// menu slide
const wrapper = document.querySelector(".wrapper");
const carouser1 = document.querySelector(".carouser1");
const firstCardWidth = carouser1.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper .fa-solid");
const carouser1Childrens = [...carouser1.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carouser1.offsetWidth / firstCardWidth);

carouser1Childrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carouser1.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouser1Childrens.slice(0, cardPerView).forEach((card) => {
  carouser1.insertAdjacentHTML("beforeend", card.outerHTML);
});

carouser1.classList.add("no-transition");
carouser1.scrollLeft = carouser1.offsetWidth;
carouser1.classList.remove("no-transition");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carouser1.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carouser1.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carouser1.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carouser1.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carouser1.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carouser1.scrollLeft === 0) {
    carouser1.classList.add("no-transition");
    carouser1.scrollLeft = carouser1.scrollWidth - 2 * carouser1.offsetWidth;
    carouser1.classList.remove("no-transition");
  } else if (
    Math.ceil(carouser1.scrollLeft) ===
    carouser1.scrollWidth - carouser1.offsetWidth
  ) {
    carouser1.classList.add("no-transition");
    carouser1.scrollLeft = carouser1.offsetWidth;
    carouser1.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return;
  timeoutId = setTimeout(() => (carouser1.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

carouser1.addEventListener("mousedown", dragStart);
carouser1.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carouser1.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

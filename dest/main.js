// background header

// let selectHeader = document.querySelector(".header");
// window.addEventListener("scroll", function () {
//   if (window.pageYOffset > heightSlider) {
//     selectHeader.style.background = "black";
//   } else {
//     selectHeader.style.background = "none";
//   }
// });

// back to top footer

function topFooter() {
  let backfromFooter = document.querySelector(
    ".footer .footer__item .footer__item-top "
  );
  backfromFooter.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

let slider = document.querySelector(".slider");
let heightSlider = slider.offsetHeight;
let selectHeader = document.querySelector(".header");
let heightHeader = selectHeader.offsetHeight;
let backTop = document.querySelector(".toTop");

function backTopAndBgHeader() {
  window.addEventListener("scroll", function () {
    // add background header
    if (window.pageYOffset > heightSlider - heightHeader) {
      selectHeader.style.background = "black";
    } else {
      selectHeader.style.background = "none";
    }
    // hide/show back to top
    if (window.pageYOffset > heightSlider) {
      backTop.classList.add("active");
    } else {
      backTop.classList.remove("active");
    }
  });
  backTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// select menu header
function selectMenu() {
  let menus = document.querySelectorAll(".header .header__menu li a");
  let sections = [];
  function removeActiveMenu() {
    menus.forEach(function (menu_element, menu_index) {
      menu_element.classList.remove("active");
    });
  }
  menus.forEach(function (element) {
    let className = element.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);
    element.addEventListener("click", function (e) {
      e.preventDefault();

      window.scrollTo({
        top: section.offsetTop - heightHeader + 1,
        behavior: "smooth",
      });
      removeActiveMenu();
      element.classList.add("active");
    });
  });
  window.addEventListener("scroll", function (e) {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
      if (
        positionScroll > section.offsetTop - heightHeader &&
        positionScroll < section.offsetTop + section.offsetHeight
      ) {
        removeActiveMenu();
        menus[index].classList.add("active");
      } else {
        menus[index].classList.remove("active");
      }
    });
  });
}

// menu mobile
function menuMobile() {
  let btnmenu = document.querySelector(".btnmenu");
  let nav = document.querySelector(".nav");

  btnmenu.addEventListener("click", function () {
    this.classList.toggle("active");
    nav.classList.toggle("active");
  });

  function hideNav() {
    btnmenu.classList.remove("active");
    nav.classList.remove("active");
  }
  window.addEventListener("resize", function () {
    let widthWin = window.innerWidth;
    if (widthWin > 992) {
      hideNav();
    }
  });
}

// tabs news
function changeTabsNews() {
  let tabs = document.querySelectorAll(".textboxga__selec-tabs");
  let newsList = document.querySelectorAll(".news__list");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // remove active in textboxga
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });

      this.classList.add("active");
      // remove active in news__list
      newsList.forEach(function (list) {
        list.classList.remove("active");
      });
      let id = this.dataset.tab;
      document.querySelector(".news__list-" + id).classList.add("active");
    });
  });
}

// video
function popupvid() {
  let videos = document.querySelectorAll(".scvideo__list-item .list__play");
  let popup = document.querySelector(".popupvideo");
  let iframe = document.querySelector(
    ".popupvideo .popupvideo__item .popupvideo__item-url iframe"
  );
  let btnclose = document.querySelector(
    ".popupvideo .popupvideo__item .popupvideo__item-btnclose"
  );

  videos.forEach(function (item) {
    item.addEventListener("click", function () {
      popup.classList.add("active");

      let datayt = item.getAttribute("data-video");
      iframe.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + datayt + "?autoplay=1"
      );
    });
    btnclose.addEventListener("click", function () {
      popup.classList.remove("active");
      iframe.setAttribute("src", "");
    });
    popup.addEventListener("click", function () {
      popup.classList.remove("active");
      iframe.setAttribute("src", "");
    });
  });
}

// select language
function selectLang() {
  let lang = document.querySelector(".header__dropdown");
  let langs = document.querySelectorAll(
    ".header__dropdown .header__dropdown-listdrop li a"
  );
  let langCurrent = document.querySelector(
    ".header__dropdown .header__dropdown-select span"
  );
  lang.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
  });
  langs.forEach(function (item) {
    item.addEventListener("click", function () {
      let langText = this.textContent;
      // gan tam
      let langSave = langCurrent.textContent;
      langCurrent.innerHTML = langText;
      this.innerHTML = langSave;
    });
  });
  document.addEventListener("click", function () {
    lang.classList.remove("active");
  });
}

// flickity

// img news freescroll
function imgnews() {
  let elem = document.querySelector(".news__list1");
  let flkty = new Flickity(elem, {
    cellAlign: true,
    contain: true,
    draggable: ">1",
    prevNextButtons: false,
    pageDots: false,
    freeScroll: true,
    wrapAround: true,
    lazyLoad: 3,
  });
  let $carousel = $(".news__list1").flickity();
  let $progressBar = $(".progress-bar");
  flkty.on("scroll", function (progress) {
    $carousel.on("scroll.flickity", function (event, progress) {
      progress = Math.max(0, Math.min(1, progress));
      $progressBar.width(progress * 100 + "%");
    });
  });
}

// gallery modal
function selectGallery() {
  Fancybox.bind('[data-fancybox="gallery"]', {
    infinite: true,

    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "next",
      ArrowDown: "prev",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
  });
}
// slider hero
function handleSliderHero() {
  let slider = document.querySelector(".slider__item-wrap");
  let flktySlider = new Flickity(slider, {
    cellAlign: "left",
    contain: true,
    prevNextButtons: false,
    wrapAround: true,
    on: {
      ready: function () {
        console.log("Flickity is ready");
        dotsSlider();
      },
      change: function (index) {
        console.log("Slide changed to" + index);
        handlePaging(index);
      },
    },
  });
  let btnPrev = document.querySelector(".slider__bottom-control .prev");
  let btnNext = document.querySelector(".slider__bottom-control .next");
  btnPrev.addEventListener("click", function () {
    flktySlider.previous(true);
  });
  btnNext.addEventListener("click", function () {
    flktySlider.next(true);
  });
  function dotsSlider() {
    let dot = document.querySelector(".flickity-page-dots");
    let dotSliderBottom = document.querySelector(".slider__bottom-paging");
    dotSliderBottom.appendChild(dot);
  }

  function handlePaging(index) {
    let number = document.querySelector(
      ".slider__bottom .slider__bottom-paging .number"
    );
    number.innerHTML = (index + 1).toString().padStart(2, "0");
  }
}

window.addEventListener("load", function () {
  backTopAndBgHeader();
  handleSliderHero();
  topFooter();
  selectMenu();
  imgnews();
  selectGallery();
  menuMobile();
  changeTabsNews();
  popupvid();
  selectLang();
});

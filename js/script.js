function initHeroSlider() {
  const el = document.querySelector(".hero__slider");
  if (!el) return;
  new Swiper(el, {
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1200,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hero__pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        navigation: false,
        pagination: { type: "bullets" },
      },
      415: { slidesPerView: 1, navigation: false },
      769: { slidesPerView: 1 },
      1025: { slidesPerView: 1 },
      1441: { slidesPerView: 1 },
    },
  });
}
function initReviewsSlider() {
  const el = document.querySelector(".reviews__slider");
  if (!el) return;
  new Swiper(el, {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    },
  });
}
function animateCounters() {
  const section = document.querySelector(".stats");
  if (!section) return;
  const counters = section.querySelectorAll(".stats__value");
  if (!counters.length) return;
  let started = false;
  function startAnimation() {
    if (started) return;
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight - 100) {
      counters.forEach((counter) => {
        const target = +counter.dataset.target;
        const duration = 1500;
        const startTime = performance.now();
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(target * progress);
          counter.textContent = value;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            let suffix = "+";
            if (target === 24) suffix = "/7";
            if (target === 95) suffix = "%";
            counter.textContent = target + suffix;
          }
        }
        requestAnimationFrame(update);
      });
      started = true;
    }
  }
  window.addEventListener("scroll", startAnimation);
}
function initCallbackForm() {
  const form = document.querySelector(".callback__form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const popup = document.createElement("div");
    popup.classList.add("callback__popup");
    popup.innerHTML = `
      <h3 class="callback__popup-title">Дякуємо!</h3>
      <p class="callback__popup-text">Наш менеджер зв’яжеться з вами протягом 5 хвилин.</p>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
    form.reset();
  });
}
function initBurgerMenu() {
  const burger = document.querySelector(".menu__burger");
  const mobileMenu = document.querySelector(".menu__mobile");
  const body = document.body;
  if (!burger || !mobileMenu) return;
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    mobileMenu.classList.toggle("menu__mobile--active");
    body.classList.toggle("menu-open");
  });
}
function initCatalogSorting() {
  const sortSelect = document.getElementById("sort-select");
  const catalogList = document.querySelector(".catalog__list");
  if (!sortSelect || !catalogList) return;
  const initialCards = Array.from(catalogList.children);
  const getPriceValue = (card) => {
    const priceText = card.querySelector(".car-card__price")?.textContent || "";
    return parseInt(priceText.replace(/\D/g, ""), 10);
  };
  const getYearValue = (card) => {
    const yearElement = Array.from(card.querySelectorAll(".car-card__detail")).find((el) =>
      /^\d{4}$/.test(el.textContent.trim())
    );
    return yearElement ? parseInt(yearElement.textContent.trim(), 10) : 0;
  };
  sortSelect.addEventListener("change", () => {
    const sortType = sortSelect.value;
    let cards;
    if (sortType === "default") {
      cards = [...initialCards];
    } else {
      cards = Array.from(catalogList.children).sort((a, b) => {
        const priceA = getPriceValue(a);
        const priceB = getPriceValue(b);
        const yearA = getYearValue(a);
        const yearB = getYearValue(b);
        switch (sortType) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "year-asc":
            return yearA - yearB;
          case "year-desc":
            return yearB - yearA;
          default:
            return 0;
        }
      });
    }
    catalogList.innerHTML = "";
    cards.forEach((card) => catalogList.appendChild(card));
  });
}
document.addEventListener("DOMContentLoaded", function () {
  initHeroSlider();
  initReviewsSlider();
  animateCounters();
  initCallbackForm();
  initBurgerMenu();
  initCatalogSorting();
});
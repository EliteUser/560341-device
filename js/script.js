/* Для навигации по слайдам с помощью TAB */

/* Главный слайдер */

var mainSliderLink = document.querySelectorAll(".about-btn");

for (let i = 0; i < mainSliderLink.length; i++) {
  mainSliderLink[i].addEventListener("focus", function () {
    document.querySelector(".main-slider-inner").scrollLeft = 0;
    document.getElementById( "slider-btn-" + (i + 1) ).checked = true;
  });
}

/* Слайдер с услугами */

var servicesSlider = document.querySelectorAll(".services-btn");

for (let i = 0; i < servicesSlider.length; i++) {
  servicesSlider[i].addEventListener("focus", function () {
    document.querySelector(".services-slider-inner").scrollLeft = 0;
    document.getElementById( "services-btn-" + (i + 1) ).checked = true;
  });
}
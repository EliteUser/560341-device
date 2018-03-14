/* Для навигации по слайдам с помощью TAB */

/* Главный слайдер */

var mainSliderLink = document.querySelectorAll(".about-btn");

for (var i = 0; i < mainSliderLink.length; i++)(function (i) {

  mainSliderLink[i].addEventListener("focus", function () {    
    document.querySelector(".main-slider-inner").scrollLeft = 0;
    document.getElementById("slider-btn-" + (i + 1)).checked = true;
  });
  
})(i);

/* Слайдер с услугами */

var servicesSliderLink = document.querySelectorAll(".services-btn");

for (let i = 0; i < servicesSliderLink.length; i++)(function (i) {
  
  servicesSliderLink[i].addEventListener("focus", function () {
    document.querySelector(".services-slider-inner").scrollLeft = 0;
    document.getElementById("services-btn-" + (i + 1)).checked = true;
  });
  
})(i);
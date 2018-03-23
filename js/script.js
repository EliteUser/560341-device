/* Переменные */

var mainSliderLinks = document.querySelectorAll(".about-btn");
var servicesSliderLinks = document.querySelectorAll(".services-btn");

var popups = document.querySelectorAll(".popup-window");
var openBtns = document.querySelectorAll(".open-btn");
var closeBtns = document.querySelectorAll(".close-btn");

var popupForm = document.querySelector(".popup-form");
var popupSendBtn = document.querySelector(".popup-btn");

var mapSmall = document.querySelector("#smallmap");
var map = document.querySelector("#bigmap");

var sliderElem = document.querySelector("#slider");

var catalogList = document.querySelector(".main-catalog");

/* Для навигации по слайдам с помощью TAB */
/* Главный слайдер */

for (var i = 0; i < mainSliderLinks.length; i++)(function (i) {

  mainSliderLinks[i].addEventListener("focus", function (event) {
    document.querySelector(".main-slider-inner").scrollLeft = 0;
    document.querySelector("#slider-btn-" + (i + 1)).checked = true;
  });

})(i);

/* и слайдер с услугами */

for (var i = 0; i < servicesSliderLinks.length; i++)(function (i) {

  servicesSliderLinks[i].addEventListener("focus", function (event) {
    document.querySelector(".services-slider-inner").scrollLeft = 0;
    document.querySelector("#services-btn-" + (i + 1)).checked = true;
  });

})(i);

/* Добавления события для всплывающего окна */

function windowPopup(open, window, close) {
  open.addEventListener("click", function (event) {
    event.preventDefault();
    window.classList.add("show");
    window.classList.remove("animate-appear");
    void window.offsetWidth;
    window.classList.add("animate-appear");
  });

  close.addEventListener("click", function (event) {
    event.preventDefault();
    window.classList.remove("show");
  });
}

for (var i = 0; i < popups.length; i++) {
  windowPopup(openBtns[i], popups[i], closeBtns[i]);
};

/* Упрощенная валидация формы */

if (popupForm) {
  popupSendBtn.addEventListener("click", function checkValidity() {
    var inputs = [popupForm.elements.name, popupForm.elements.email, popupForm.elements.message];

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].validity.valid == false) {
        inputs[i].classList.add("input-invalid");
        popups[1].classList.remove("animate-invalid");
        void popups[1].offsetWidth;
        popups[1].classList.add("animate-invalid");
      } else {
        inputs[i].classList.remove("input-invalid");
      }
    }
  });
}

/* Fallback для карты */

if (mapSmall) {
  mapSmall.onload = function () {
    mapSmall.style.zIndex = 2;
  };
}

if (map) {
  map.onload = function () {
    map.style.zIndex = 2;
  };
}

/* СЛАЙДЕР В КАТАЛОГЕ */

if (sliderElem) {
  var dragElemLeft = sliderElem.children[0];
  var dragElemRight = sliderElem.children[1];
  var selectedArea = sliderElem.children[2];

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right + pageXOffset
    };
  }

  dragElemRight.onmousedown = function (e) {
    var dragCoords = getCoords(dragElemRight);
    var shiftX = e.pageX - dragCoords.left;
    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function (e) {
      var newLeft = e.pageX - shiftX - sliderCoords.left;

      var dragLeftRightCoord = getCoords(dragElemLeft).right - sliderCoords.left;
      if (newLeft < dragLeftRightCoord) {
        newLeft = dragLeftRightCoord;
      }

      var rightEdge = sliderElem.offsetWidth - dragElemRight.offsetWidth / 2;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      selectedArea.style.left = dragLeftRightCoord - (dragElemLeft.offsetWidth / 2) + "px";
      selectedArea.style.width = newLeft - dragLeftRightCoord + dragElemLeft.offsetWidth + "px";

      dragElemRight.style.left = newLeft + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  dragElemRight.ondragstart = function () {
    return false;
  };

  //////////////////////////////////////////////////////////////////////

  dragElemLeft.onmousedown = function (e) {
    var dragCoords = getCoords(dragElemLeft);
    var shiftX = e.pageX - dragCoords.left;

    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function (e) {
      var newLeft = e.pageX - shiftX - sliderCoords.left;

      if (newLeft < -(dragElemLeft.offsetWidth / 2)) {
        newLeft = -(dragElemLeft.offsetWidth / 2);
      }

      var dragRightLeftCoord = getCoords(dragElemRight).left - sliderCoords.left - dragElemRight.offsetWidth;
      if (newLeft > dragRightLeftCoord) {
        newLeft = dragRightLeftCoord;
      }

      selectedArea.style.left = newLeft + (dragElemLeft.offsetWidth / 2) + "px";
      selectedArea.style.width = dragRightLeftCoord - newLeft + dragElemLeft.offsetWidth + "px";

      dragElemLeft.style.left = newLeft + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  dragElemLeft.ondragstart = function () {
    return false;
  };
}

/* Фокус на карточке товара в каталоге */

if (catalogList) {
  catalogList.addEventListener("focus", function (event) {
    var target = event.target;

    if (target.classList.contains("add-to-cart-btn") || target.classList.contains("add-to-compare")) {
      target.parentNode.classList.add("hover-show");
    }
  }, true);

  catalogList.addEventListener("blur", function (event) {
    var target = event.target;

    if (target.classList.contains("add-to-cart-btn") || target.classList.contains("add-to-compare")) {
      target.parentNode.classList.remove("hover-show");
    }
  }, true);
}

/* Для навигации по слайдам с помощью TAB */

/* Главный слайдер */

var mainSliderLink = document.querySelectorAll(".about-btn");

for (var i = 0; i < mainSliderLink.length; i++)(function (i) {

  mainSliderLink[i].addEventListener("focus", function (event) {
    document.querySelector(".main-slider-inner").scrollLeft = 0;
    document.getElementById("slider-btn-" + (i + 1)).checked = true;
  });

})(i);

/* Слайдер с услугами */

var servicesSliderLink = document.querySelectorAll(".services-btn");

for (var i = 0; i < servicesSliderLink.length; i++)(function (i) {

  servicesSliderLink[i].addEventListener("focus", function (event) {
    document.querySelector(".services-slider-inner").scrollLeft = 0;
    document.getElementById("services-btn-" + (i + 1)).checked = true;
  });

})(i);

/* Добавления события для всплывающего окна */

function windowPopup(open, window, close) {
  open.addEventListener("click", function (event) {
    event.preventDefault(event);
    window.classList.add("show");
  });

  close.addEventListener("click", function (event) {
    event.preventDefault(event);
    window.classList.remove("show");
  });
}

var popup = document.querySelectorAll(".popup-window");
var openBtn = document.querySelectorAll(".open-btn");
var closeBtn = document.querySelectorAll(".close-btn");

for (var i = 0; i < popup.length; i++) {
  windowPopup(openBtn[i], popup[i], closeBtn[i]);
};

/*var sortUp = document.querySelector(".sort-up");
var sortDown = document.querySelector(".sort-down");

sortUp.addEventListener("click", function (event) {
  event.preventDefault(event);
  sortDown.classList.remove("sort-direction-active");
  sortUp.classList.add("sort-direction-active");
});

sortDown.addEventListener("click", function (event) {
  event.preventDefault(event);
  sortUp.classList.remove("sort-direction-active");
  sortDown.classList.add("sort-direction-active");
});*/

/* СЛАЙДЕР */

var sliderElem = document.getElementById("slider");
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

  return false; // disable selection start (cursor change)
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

  return false; // disable selection start (cursor change)
};

dragElemLeft.ondragstart = function () {
  return false;
};

/* Фокус на карточке товара в каталоге */

var catalogList = document.querySelector(".main-catalog");

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
// 漢堡選單RWD js
let menuClose = document.getElementsByClassName("menuClose")[0];
let mobileMenu = document.getElementsByClassName("mobileMenu")[0];
let navMenu = document.getElementsByClassName("navMenu")[0];

menuClose.addEventListener('click', function () {
  mobileMenu.classList.add("d-none");
})

navMenu.addEventListener('click', function () {
  mobileMenu.classList.remove("d-none")
})

// Carousel

let carouselIndex = 1;
showSlides(carouselIndex);

// let prevImg = document.getElementById("prevImg");
// prevImg.onclick = function(){
// showSlides(-1);
//   console.log(-1);
// }

function plusSlides(n) {
  showSlides(carouselIndex += n);
}

function currentSlides(n) {
  showSlides(carouselIndex = n);
}

document.getElementById("prevImg").addEventListener("click", function () {
  plusSlides(-1);
  clearInterval(automove);
  automove = setInterval(autoSlides, 5000)
});
document.getElementById("nextImg").addEventListener("click", function () {
  plusSlides(1);
  clearInterval(automove);
  automove = setInterval(autoSlides, 5000)
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carouselImg");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { carouselIndex = 1 };
  if (n < 1) { carouselIndex = slides.length };
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  slides[carouselIndex - 1].style.display = "block";
  dots[carouselIndex - 1].className += " dot-active";
}

let slideIndex = 0;
// let automove = setInterval(autoSlides, 5000); //透過變數已供clearInterval使用
function autoSlides() {
  let i;
  let slides = document.getElementsByClassName("carouselImg");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";

  // let d = new Date();
  // console.log(d); 除錯用
}

// dot click
document.getElementsByClassName("dot")[0].addEventListener("click", function () {
  currentSlides(1)
  clearInterval(automove);
  automove = setInterval(autoSlides, 5000)
});
document.getElementsByClassName("dot")[1].addEventListener("click", function () {
  currentSlides(2)
  clearInterval(automove);
  automove = setInterval(autoSlides, 5000)
});
document.getElementsByClassName("dot")[2].addEventListener("click", function () {
  currentSlides(3)
  clearInterval(automove);
  automove = setInterval(autoSlides, 5000)
});
    // carousel end
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

window.onload = function () {
  getEcIndex();
}

function getEcIndex() {
  fetch('https://apiservice.mol.gov.tw/OdService/rest/datastore/A17030000J-000016-1ci')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let data = response.result.records[12];
      console.log(data);

      // 取key
      key = new Array();
      for (x in data) { key[key.length] = x };
      console.log(key);

      // 取value
      val = []
      Object.values(data).forEach((item) => val.push(item));
      console.log(val)

      document.getElementById("month").innerHTML = data.月別;
      document.getElementById("cpi").innerHTML = val[13];
      document.getElementById("cpiTitle").innerHTML = key[13];

      document.getElementById("eG").innerHTML = parseFloat(val[1].substr(1, val[1].length));
      document.getElementById("eGTitle").innerHTML = `${key[1]}`;
      let span = document.createElement("span");
      span.innerHTML = " %"
      document.getElementById("eG").appendChild(span);

      document.getElementById("cpiG").innerHTML = val[14];
      document.getElementById("cpiGTitle").innerHTML = key[14];
      console.log(val[14]);
      console.log(key[14]);
      let span3 = document.createElement("span");
      span3.innerHTML = " %"
      document.getElementById("cpiG").appendChild(span3);

    })
    .catch((error) => {
      console.log(error);
    })
}
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

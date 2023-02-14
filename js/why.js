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

// accordion
var acc = document.getElementsByClassName("subTitle");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        let span = this.getElementsByTagName("span")[0].innerHTML;
        if (span === "+") {
          this.getElementsByTagName("span")[0].innerHTML = "-";
        } else if (span === "-") {
          this.getElementsByTagName("span")[0].innerHTML = "+"
        }


        /* Toggle between hiding and showing the active panel */
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
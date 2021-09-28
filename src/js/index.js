
document.addEventListener("click", documentactions)
function documentactions (event) {
let targetelement = event.target
if (targetelement.classList.contains("header__list__menu")) {
    targetelement.nextElementSibling.classList.toggle("active__menu")
    targetelement.classList.toggle("activebtn")
}
if (!targetelement.classList.contains("header__list__menu") && document.querySelector(".active__menu")) {
    document.querySelector(".active__menu").classList.remove("active__menu")
    document.querySelector(".activebtn").classList.remove("activebtn")
}
if (targetelement.classList.contains("burger__btn")) {
    targetelement.classList.toggle("activebtn");
    document.querySelector(".header__menu").classList.toggle("active__burger");
    document.querySelector(".header__menu__links").classList.toggle("active__burger");
}
if (targetelement.classList.contains("search__btn")) {
    document.querySelector(".header__search").classList.toggle("active__search");
}
if (targetelement.classList.contains("footer__menu__btn")) {
    targetelement.classList.toggle("activefmenu");
    targetelement.nextElementSibling.classList.toggle("activefmenu");
}
}

const swiper = new Swiper('.swiper', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides:5,
    parallax: true,
    pagination: {
        el: ".main__slider__dotts",
        clickable: true,
    },
    navigation: {
        nextEl: ".main__slider__nextbtn",
        prevEl: ".main__slider__prevbtn"
    }
});
  console.log(swiper);
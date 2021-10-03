
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
if (targetelement.classList.contains("products__morebtn")) {
    targetelement.remove()
    let allProducts = document.querySelectorAll('.products__item')
    allProducts.forEach((item) => item.style.display = "block")
}
}
const mainSlider = document.querySelector(".main__slider__slider")
mainSlider.addEventListener("mouseenter", function(){
    swiper.autoplay.stop()
})
mainSlider.addEventListener("mouseleave", function(){
    swiper.autoplay.start()
})

const swiper = new Swiper('.swiper', {
    observer: true,
    effect: "coverflow",
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides:5,
    parallax: true,
    touchRatio: 2,
    autoplay: {

    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    pagination: {
        el: ".main__slider__dotts",
        clickable: true,
    },
    navigation: {
        nextEl: ".main__slider__nextbtn",
        prevEl: ".main__slider__prevbtn"
    }
});

let productsContainer = document.querySelector('.products')
async function getProducts () {
    const file = "../json/products.json"
    let response = await fetch(file, {
        method: "GET"
    })
    if (response.ok) {
        let result = await response.json()
        let products = result.products
        let productsTemplate = products.map((item)=> {
            let productItem = document.createElement("article")
        productItem.classList.add("products__item")
        let labelsItems = []
        if (item.labels) {
             labelsItems = item.labels.map((item)=>{
                let lab = document.createElement("div")
                lab.classList.add("product__labels__item")
                lab.classList.add(`${item.type}`)
                lab.innerText = item.value
                return lab.outerHTML
            })
        }
        console.log(labelsItems.join(" "));
        productItem.innerHTML = `<div class="product__head">
        <div class="product__img"><img src=${item.image} alt=${item.title}></div>
        <div class="product__labels">
        ${labelsItems.join(" ")}
        </div>
    </div>
    <div class="product__content">
        <h3 class="product__title">${item.title}</h3>
        <p class="product__text">${item.text}</p>
        <div class="product__prices">
            <p class="product__prices__actual">${item.price}</p>
            <p class="product__prices__old">${item.priceOld}</p>
        </div>
    </div>
    <div class="product__actions">
        <button class="product__cartbtn">Add to cart</button>
        <a href="#" class="product__sharebtn">Share</a>
        <a href="#" class="product__likebtn">Like</a>
    </div>`
    return productItem
        })
        productsContainer.append(...productsTemplate)
    }
    else {
        alert("Ошибка загрузки товаров")
    }
}
getProducts ()
/* let test = []
let products = document.querySelector('.products')
async function takeJson () {
    let test2 = await fetch('https://fakestoreapi.com/products').then(res=>res.json())
     console.log(test2);
     test.push(test2)
     console.log(test2[0].title);
     let product = document.createElement("div")
     product.innerHTML = `<img src=${test2[0].image}>`
     products.append(product)
}
takeJson() */
/* async function takeTest () {
await takeJson ()
console.log(test[0][0].title);
}
takeTest () */
/* category: "men's clothing"
description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
id: 1
image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
price: 109.95
rating: {rate: 3.9, count: 120}
title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 */

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
if (targetelement.classList.contains("product__cartbtn")) {
    addToCart (targetelement)
}
if (targetelement.classList.contains("header__actions__bin")) {
    if (cartlist.children.length) {
    cartContainer.classList.toggle("activecart")
    }
}
if (!targetelement.closest(".cart__container") && document.querySelector(".activecart") && !targetelement.classList.contains("cartitem__delete")) {
    document.querySelector(".activecart").classList.remove("activecart")
    console.log(targetelement);
}
}
const mainSlider = document.querySelector(".main__slider__slider")
mainSlider.addEventListener("mouseenter", function(){
    swiper.autoplay.stop()
})
mainSlider.addEventListener("mouseleave", function(){
    swiper.autoplay.start()
})
//Главный слайдер
const swiper = new Swiper('.main__slider__body', {
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
const swiper2 = new Swiper('.rooms__slider__body', {
    observer: true,
    effect: "slide",
    observeParents: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    watchOverflow: true,
    speed: 800,
    loop: true,
    loopAdditionalSlides:5,
    parallax: true,
    touchRatio: 2,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    pagination: {
        el: ".rooms__slider__dotts",
        clickable: true,
    },
    navigation: {
        nextEl: ".rooms__slider__nextbtn",
        prevEl: ".rooms__slider__prevbtn"
    }
});
// подгрузка продуктов
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
        productItem.id = item.id
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

//отправка товара в корзину
const cartBtn = document.querySelector('.header__actions__bin')
const cartCounter = document.querySelector('.header__actions__bin span')
const cartlist = document.querySelector('.cart__list')
const cartContainer = document.querySelector(".cart")
function addToCart (button) {
    let product = button.closest(".products__item")
    let productTitle = product.querySelector(".product__title")
    let productImage = product.querySelector(".product__img")
    let flyImage = productImage.cloneNode(true)
     flyImage.classList.add("flyimage")
    let flyImageWidth = productImage.offsetWidth
    let flyImageHeight = productImage.offsetHeight
    let flyImageTop = productImage.getBoundingClientRect().top
    let flyImageLeft = productImage.getBoundingClientRect().left
    flyImage.style.cssText = `
    left: ${flyImageLeft}px;
    top: ${flyImageTop}px;
    width: ${flyImageWidth}px;
    height: ${flyImageHeight}px
    `
    document.body.append(flyImage)

    const cartLeft = cartBtn.getBoundingClientRect().left
    const cartTop = cartBtn.getBoundingClientRect().top
    flyImage.style.cssText = `
    left: ${cartLeft}px;
    top: ${cartTop}px;
    width: 0px;
    height: 0px
    `
    let cartItemCheck = cartlist.querySelector(`[data-id="${product.id}"]`)
    if (!cartItemCheck) {
    let cartItem = document.createElement("li")
    cartItem.setAttribute("data-id", product.id)
    cartItem.classList.add("cartitem")
    cartItem.innerHTML = `
    <div class="cartitem__img">${flyImage.innerHTML}</div>
<div class="cartitem__content">
<p class="cartitem__title">${productTitle.textContent}</p>
<p class="cartitem__quantity">Quantity:   <span class="cartitem__quantity__count">1</span></p>
<button class="cartitem__delete">Delete</button>
</div>
    `
    cartlist.append(cartItem)
    }
    else {
       let cartItemcounter = cartItemCheck.querySelector(".cartitem__quantity__count")
       cartItemcounter.textContent++
    }
    cartCounterEdit ()
    flyImage.addEventListener("transitionend", function () {
        cartCounter.style.display = "block";
    })
}
//Удаление из корзины
cartContainer.addEventListener("click", function(event) {
    let targetEl = event.target
    if (targetEl.classList.contains("cartitem__delete")) {
        let cartItem =  targetEl.closest(".cartitem")
        let quantity = cartItem.querySelector(".cartitem__quantity__count")
        quantity.textContent--
        if (quantity.textContent == 0) {
            cartItem.remove()
        }
        cartCounterEdit ()
    }
})
function cartCounterEdit () {
    let counters = Array.from(cartlist.querySelectorAll(".cartitem__quantity__count")).map((item)=>item.textContent)
    if (counters.length) {
    let cartsum = Array.from(counters).reduce((prev, item)=> Number(prev)+Number(item))
    cartCounter.textContent = cartsum
    }
    else {
        cartCounter.style.display = "none"
        if (cartContainer.classList.contains("activecart")) {
            cartContainer.classList.remove("activecart")
        }
    }
}




import Utils from "../Utils.js";
import Api from "../Api.js";

const hotProductListContainer = document.querySelector('.hot-product-list');
const newProductListContainer = document.querySelector('.new-product-list');
function fillProduct(products, container){
            
    container.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        // <img src="${product.image.startsWith('data:image') ? product.image : `data:image/jpeg;base64,${product.image}` || '../../img/product/product.png'}" alt="${product.name}">
        // <img src="${product.image}">
        productElement.innerHTML = `
            <img src="../../img/items/Category1.png" alt="${product.name}">
            <div class="decription">
                <p class="name">${product.name}</p>
                <p class="price">${product.price.toLocaleString()} đ</p>
                <span class="material-symbols-outlined btn btn-add-cart">
                    add_shopping_cart
                </span>
                <p class="sold">Đã bán ${product.sold}</p>
            </div>
        `;
        console.log(product)
        const addToCartButton = productElement.querySelector('.btn-add-cart');
        addToCartButton.addEventListener('click', () => Utils.addItemToCart(product.product_id));
        productElement.addEventListener('click', () => {
            window.location.href = `/product-detail/${product.product_id}`
        });
        container.appendChild(productElement);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const homeContainer = document.querySelector(".home-container");
    const slider = document.querySelector(".slider");
    const carouselContainer = document.querySelector(".carousel-container")

    Utils.getHeader()
    // Utils.protectUser()
    Utils.renderCategory(carouselContainer)
    Utils.renderSlide("slide/slide", slider)
    homeContainer.insertAdjacentHTML("beforeend", Utils.getFooter())

    let hotProducts = []
    let newProducts = []
    let categories = []
    const fetchNewProduct = async ()=>{
        try {
            const response = await Api.getNewProduct(); 
            if (response.status === 200) {
                newProducts = response.productDTOList;
                fillProduct(newProducts, newProductListContainer)
            }
        } catch (e) {
            Utils.getToast("error", "Máy chủ lỗi, vui lòng thử lại!")
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await Api.getAllCategory();
            if (response.status === 200) {
                categories = response.categoryDTOList;
                Utils.fillCategory(carouselContainer, categories);
            }
        } catch (e) {
            Utils.getToast("error", "Máy chủ lỗi, vui lòng thử lại!");
        }
    };

    const fetchHotProduct = async ()=>{
        try {
            const response = await Api.getHotProduct(); 
            if (response.status === 200) {
                hotProducts = response.productDTOList;
                fillProduct(hotProducts, hotProductListContainer)
            }
        } catch (e) {
            Utils.getToast("error", "Máy chủ lỗi, vui lòng thử lại!")
            alert(e)
        }
    }
    await fetchCategories();
    await fetchNewProduct();
    await fetchHotProduct();

    //slide new product
    let currentIndexNewProduct = 0;
    const itemsPerPageNewProduct = 4;
    const totalNewProduct = document.querySelectorAll('.new-product-list .product').length;
    const nextNewProductBtn = document.querySelector(".next-new-product")
    const prevNewProductBtn = document.querySelector(".prev-new-product")

    function updateCarouselNewProduct() {
        const newProductList = document.querySelector('.new-product-list')
        const offset = -(currentIndexNewProduct * 25);
        const pixel = currentIndexNewProduct * 14;
        newProductList.style.transform = `translateX(calc(${offset}% - ${pixel}px))`;
    }

    function prevNewProduct() {
        if (currentIndexNewProduct > 0) {
            currentIndexNewProduct--;
            updateCarouselNewProduct();
            if(currentIndexNewProduct <= 0){
                prevNewProductBtn.style.display = "none"
            }
            nextNewProductBtn.style.display = "block"
        }
    }

    function nextNewProduct() {
        if (currentIndexNewProduct < totalNewProduct - itemsPerPageNewProduct) {
            currentIndexNewProduct++;
            updateCarouselNewProduct();
            if(currentIndexNewProduct >= totalNewProduct - itemsPerPageNewProduct){
                nextNewProductBtn.style.display = "none"
            }
            prevNewProductBtn.style.display = "block"
        }
    }

    prevNewProductBtn.addEventListener("click",()=>{
        prevNewProduct()
    })
    nextNewProductBtn.addEventListener("click",()=>{
        nextNewProduct()
    })

    //slide hot product
    let currentIndexHotProduct = 0;
    const itemsPerPageHotProduct = 4;
    const totalHotProduct = document.querySelectorAll('.hot-product-list .product').length;
    const nextHotProductBtn = document.querySelector(".next-hot-product")
    const prevHotProductBtn = document.querySelector(".prev-hot-product")

    function updateCarouselHotProduct() {
        const hotProductList = document.querySelector('.hot-product-list')
        const offset = -(currentIndexHotProduct * 25);
        const pixel = currentIndexHotProduct * 14;
        hotProductList.style.transform = `translateX(calc(${offset}% - ${pixel}px))`;
    }

    function prevHotProduct() {
        if (currentIndexHotProduct > 0) {
            currentIndexHotProduct--;
            updateCarouselHotProduct();
            if(currentIndexHotProduct <= 0){
                prevHotProductBtn.style.display = "none"
            }
            nextHotProductBtn.style.display = "block"
        }
    }

    function nextHotProduct() {
        if (currentIndexHotProduct < totalHotProduct - itemsPerPageHotProduct) {
            currentIndexHotProduct++;
            updateCarouselHotProduct();
            if(currentIndexHotProduct >= totalHotProduct - itemsPerPageHotProduct){
                nextHotProductBtn.style.display = "none"
            }
            prevHotProductBtn.style.display = "block"
        }
    }

    prevHotProductBtn.addEventListener("click",()=>{
        prevHotProduct()
    })
    nextHotProductBtn.addEventListener("click",()=>{
        nextHotProduct()
    })

    const btnAddAnimation = document.querySelectorAll(".btn")
    btnAddAnimation.forEach((b)=>{
        Utils.addAnimation(b)
    })
});

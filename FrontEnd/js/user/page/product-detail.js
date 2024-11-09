import Api from "../Api.js";
import Utils from "../Utils.js";

document.addEventListener("DOMContentLoaded",()=>{
    const fillData = (data) => {
        const productDetailContainer = document.querySelector(".product-detail")
        productDetailContainer.innerHTML = ""
        productDetailContainer.innerHTML = `
            <div class="navigate">
                <a href="">Trang chủ / </a>
                <a href="">Áo thun / </a>
                <a href="">${data.name}</a>
            </div>
            <div>
                <h4 class="name">${data.name}</h4>
                <p class="sold">Đã bán được ${data.sold} sản phẩm</p>
            </div>
            <p class="price">${(data.price).toLocaleString() + "đ"}</p>
            <div class="color">
                <label for="">Color</label>
                <ul class="color-option">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div class="size">
                <label for="">Size</label>
                <ul class="size-option">
                    <li><a>S</a></li>
                    <li><a>M</a></li>
                    <li><a>L</a></li>
                    <li><a>XL</a></li>
                </ul>
            </div>
            <button class="guide"> 
                <img src="../../img/utils//ruler.png" alt="">
                Hướng dẫn chọn size
            </button>
            <div class="quantity">
                <label for="">Số lượng</label>
                <div>
                    <button id="decrease" class="quantity-button">-</button>
                    <input id="quantity" class="quantity-display" value="1">
                    <button id="increase" class="quantity-button">+</button>
                </div>
            </div>
            <div class="action">
                <button class="buy-now">Mua ngay</button>
                <button class="add-cart">Thêm vào giỏ hàng</button>
            </div>
            <div class="description">
                <h2>MÔ TẢ SẢN PHẨM</h2>
                <p>
                    ${data.description}
                </p>
            </div>
        `
        const closeModalBtn = document.querySelector(".modal-body span")
        const openModalBtn = document.querySelector(".guide")
        const modal = document.querySelector("#modal-guide-container")
        openModalBtn.addEventListener("click",()=>{
            Utils.openModal(modal)
        })
        
        closeModalBtn.addEventListener("click",()=>{
            Utils.closeModal(modal)
        })
        
        modal.addEventListener("click",(e)=>{
            if(e.target === modal){
                Utils.closeModal(modal)
            }
        })
    }
    let data = {}
    const path = window.location.pathname;
    const match = path.match(/\/product-detail\/(\d+)/);
    const id = match ? match[1] : null;
    const fetchProductByCategory = async (id) => {
        try {
            const response = await Api.getProductByCategory(id)
            if(response.status === 200){
                data = response.productDTO
                fillProducts(data)
            }
        } catch (error) {
            Utils.getToast("error","Máy chủ lỗi vui lòng thử lại")
        }
    }
    const fetchData = async (id) => {
        try {
            const response = await Api.getProductById(id)
            if(response.status === 200){
                data = response.productDTO
                fillData(data)
                fetchProductByCategory(data.categoryDTO.category_id)
            }
        } catch (error) {
            Utils.getToast("error","Máy chủ lỗi vui lòng thử lại")
        }
    }
    if(id){
        fetchData(id)
    }

    
    const nameProduct = document.querySelector(".product-detail .name")
    const solded = document.querySelector(".product-detail .sold")
    const price = document.querySelector(".product-detail .price")
    const container = document.querySelector('.container')
    
    Utils.getHeader()
    // Utils.protectUser()
    container.insertAdjacentHTML("beforeend", Utils.getFooter())

    const btnAddAnimation = document.querySelectorAll(".btn")
    btnAddAnimation.forEach((b)=>{
        Utils.addAnimation(b)
    })

    let currentIndexSameProduct = 0;
    const itemsPerPageSameProduct = 4;
    const totalSameProduct = document.querySelectorAll('.same-product-list .product').length;
    const nextSameProductBtn = document.querySelector(".next-same-product")
    const prevSameProductBtn = document.querySelector(".prev-same-product")

    function updateCarouselSameProduct() {
        const sameProductList = document.querySelector('.same-product-list')
        const offset = -(currentIndexSameProduct * 25);
        const pixel = currentIndexSameProduct * 14;
        sameProductList.style.transform = `translateX(calc(${offset}% - ${pixel}px))`;
    }

    function prevSameProduct() {
        if (currentIndexSameProduct > 0) {
            currentIndexSameProduct--;
            updateCarouselSameProduct();
            if(currentIndexSameProduct <= 0){
                prevSameProductBtn.style.display = "none"
            }
            nextSameProductBtn.style.display = "block"
        }
    }

    function nextSameProduct() {
        if (currentIndexSameProduct < totalSameProduct / itemsPerPageSameProduct) {
            currentIndexSameProduct++;
            updateCarouselSameProduct();
            if(currentIndexSameProduct >= totalSameProduct / itemsPerPageSameProduct){
                nextSameProductBtn.style.display = "none"
            }
            prevSameProductBtn.style.display = "block"
        }
    }

    prevSameProductBtn.addEventListener("click",()=>{
        prevSameProduct()
    })
    nextSameProductBtn.addEventListener("click",()=>{
        nextSameProduct()
    })

    const decreaseButtons = document.querySelectorAll('#decrease');
    const increaseButtons = document.querySelectorAll('#increase');

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            let quantityDisplay = this.nextElementSibling;
            let currentQuantity = parseInt(quantityDisplay.value);
            if (currentQuantity > 1) {
                quantityDisplay.value = currentQuantity - 1;
            }
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            let quantityDisplay = this.previousElementSibling; 
            let currentQuantity = parseInt(quantityDisplay.value); 
            quantityDisplay.value = currentQuantity + 1; 
        });
    });

})

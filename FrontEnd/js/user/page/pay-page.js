
import Utils from "../Utils.js";
document.addEventListener("DOMContentLoaded", () => {
    const formattedPrice = function(priceValue){
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceValue);
    } 

    const closeModalBtn = document.querySelector(".modal-body .close")
    const openModalBtn = document.querySelector(".btn-change-address")
    const modal = document.querySelector("#modal-container")
    const cancelBtn = document.querySelector(".cancel")
    const container = document.querySelector('.pay-container')
    
    
    Utils.getHeader()
    // Utils.protectUser()
    container.insertAdjacentHTML("beforeend", Utils.getFooter())
    
    openModalBtn.addEventListener("click",()=>{
        Utils.openModal(modal)
    })
    
    closeModalBtn.addEventListener("click",()=>{
        Utils.closeModal(modal)
    })
    
    cancelBtn.addEventListener("click",()=>{
        Utils.closeModal(modal)
    })
    
    modal.addEventListener("click",(e)=>{
        if(e.target === modal){
            Utils.closeModal(modal)
        }
    })
    const provisionalTotal = document.querySelector(".provisional-total")
    const finalTotal = document.querySelector(".final-total")
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    let totalPrice = 0
    if (cartData.length > 0) {
        const tbody = document.querySelector(".pay-item-list tbody");
        tbody.innerHTML = "";
        cartData.forEach(product => {
            const row = document.createElement("tr");
            totalPrice += product.price
            row.innerHTML = `
                <td class="product-img">
                    <div><img src="${product.img}" alt=""></div>
                </td>
                <td class="product-detail">
                    <a href="" class="name">${product.name}</a>
                    <p class="color">Màu sắc: ${product.color}</p>
                    <p class="size">Size: ${product.size}</p>
                </td>
                <td><p class="quantity-display">x${product.quantity}</p></td>
                <td class="price">${(product.price).toLocaleString("vi-VN")+ "đ"} </td>
            `;
            tbody.appendChild(row);
        });
        provisionalTotal.textContent = totalPrice.toLocaleString("vi-VN") + "đ"
        finalTotal.textContent = (totalPrice + 30000).toLocaleString("vi-VN") + "đ"
        // localStorage.removeItem("cartData");
    }else{
        window.location.href = "/cart"
    }

    const checkboxes = document.querySelectorAll('.action-address input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
        checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
            }
        });
        }
    });
    });

});
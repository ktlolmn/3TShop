import Utils from "../Utils.js"
import Api from "../Api.js"

async function loadAddress() {
    try {
        const response = await Api.getDeleveryByUser();
        if(response.status === 200){
            const defaultAddressContainer = document.querySelector('.infor-container .address-content');
            const otherAddressesContainer = document.querySelector('#modal-container .content');
            const openModalBtn = document.querySelector(".btn-change-address button")
            const addresses = response.delevery_InformationDTOList;
    
            defaultAddressContainer.innerHTML = '';
            otherAddressesContainer.innerHTML = '';
            console.log(addresses.length, openModalBtn)
            addresses.length > 1 ?openModalBtn.disabled = false : openModalBtn.disabled = true
    
            addresses.forEach((address) => {    
                if (address._default) {
                    defaultAddressContainer.setAttribute("data-id",`${address.de_infor_id}`)
                    defaultAddressContainer.innerHTML = `
                        <div>
                            <p id="name" class="default-name">${address.name}</p>
                            <p id="phone" class="default-phone-number">${address.phone}</p>
                        </div>
                        <p id="address" class="address-detail">${address.address_line_2}, ${address.address_line_1}</p>
                    `;
                } else {
                    const addressHTML = `
                        <div class="address-container" data-id = "${address.de_infor_id}">
                            <div class="action-address">
                                <input type="checkbox" name="" id="">
                            </div>
                            <div class="address-content">
                                <div>
                                    <p class="name">${address.name}</p>
                                    <p class="phone">${address.phone}</p>
                                </div>
                                <p class="address-detail">${address.address_line_2}, ${address.address_line_1}</p>
                            </div>
                        </div>
                    `;
                    otherAddressesContainer.innerHTML += addressHTML;
                }
                
            });
        }else{
            if(response.status === 202){       
                const payBtn = document.querySelector(".pay-btn")  
                payBtn.disabled = true 
                const defaultAddressContainer = document.querySelector('.infor-container .address-container');
                defaultAddressContainer.innerHTML = `
                    <button class="new-address-btn"><a href = "/personal-infor">Thêm địa chỉ giao hàng mới</a></button>`;
            }
        }
    } catch (error) {
        console.error('Lỗi khi tải địa chỉ:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadAddress()
    const closeModalBtn = document.querySelector(".modal-body .close")
    const openModalBtn = document.querySelector(".btn-change-address")
    const modal = document.querySelector("#modal-container")
    const cancelBtn = document.querySelector(".cancel")
    const container = document.querySelector('.pay-container')
    const payBtn = document.querySelector(".pay-btn")
    
    Utils.getHeader()
    container.insertAdjacentHTML("beforeend", Utils.getFooter())
    
    openModalBtn.addEventListener("click", () => {
        Utils.openModal(modal)
    })
    
    closeModalBtn.addEventListener("click", () => {
        Utils.closeModal(modal)
    })
    
    cancelBtn.addEventListener("click", () => {
        Utils.closeModal(modal)
    })
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            Utils.closeModal(modal)
        }
    })

    const provisionalTotal = document.querySelector(".provisional-total")
    const finalTotal = document.querySelector(".final-total")
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    let totalPrice = 0
    
    // Kiểm tra nếu có sản phẩm trong giỏ hàng
    if (cartData.length > 0) {
        const tbody = document.querySelector(".pay-item-list tbody");
        tbody.innerHTML = "";
        cartData.forEach(product => {
            const row = document.createElement("tr");
            totalPrice += product.price * product.quantity
            row.innerHTML = `
                <td class="product-img">
                    <div><img src="${product.image}" alt=""></div>
                </td>
                <td class="product-detail">
                    <a href="" class="name">${product.name}</a>
                    <p class="color">Màu sắc: ${product.color}</p>
                    <p class="size">Size: ${product.size}</p>
                </td>
                <td><p class="quantity-display">x${product.quantity}</p></td>
                <td class="price">${(product.price * product.quantity).toLocaleString("vi-VN")+ "đ"} </td>
            `;
            tbody.appendChild(row);
        });
        provisionalTotal.textContent = totalPrice.toLocaleString("vi-VN") + "đ"
        finalTotal.textContent = (totalPrice + 30000).toLocaleString("vi-VN") + "đ"
        
        payBtn.addEventListener("click", async (e) => {
            if (cartData.length === 0) {
                Utils.getToast("warning", "Giỏ hàng của bạn không có sản phẩm để thanh toán.");
                return;
            }
            const defaultAddressContainer = document.querySelector('.infor-container .address-content');
            const idAddress = defaultAddressContainer.dataset.id
            console.log(idAddress)
            const orderData = {
                idAddress: idAddress,
                orderRequests: cartData.map(product => ({
                    productId: product.productId,
                    colorId: product.colorId,
                    sizeId: product.sizeId,
                    quantity: product.quantity
                }))
            };

            try {
                const response = await Api.createNewOrder(orderData);
                if (response.status === 200) {
                    sessionStorage.setItem('orderSuccess', 'true');
                    localStorage.removeItem("cartData");
                    window.location.href = "/success";
                } else {
                    sessionStorage.setItem('orderError', 'true');
                    localStorage.removeItem("cartData");
                    window.location.href = "/error";
                }
            } catch (error) {
                Utils.getToast("error", "Có lỗi xảy ra, vui lòng thử lại!");
            }
        })
    } else {
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

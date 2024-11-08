import Utils from "../Utils.js";
import Api from "../Api.js";

const container = document.querySelector('.cart-container')

container.insertAdjacentHTML("beforeend", Utils.getFooter())

Utils.getHeader()
// Utils.protectUser()

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

const checkAll = document.querySelector(".check-all");
const checkItems = document.querySelectorAll(".check-item");
const subtotalElement = document.querySelector(".subtotal");
const totalElement = document.querySelector(".total");
const shippingFee = 30000;

function updateTotalPrice() {
    let subtotal = 0;
    checkItems.forEach((check, index) => {
        if (check.checked) {
            const quantity = parseInt(check.closest("tr").querySelector(".quantity-display").value, 10);
            const price = parseInt(check.closest("tr").querySelector(".price").dataset.price, 10);
            subtotal += price * quantity;
        }
    });
    subtotalElement.textContent = `${subtotal.toLocaleString()}đ`;
    const total = subtotal + shippingFee;
    totalElement.textContent = `${total.toLocaleString()}đ`;
}

checkAll.addEventListener("change", () => {
    checkItems.forEach((check) => {
        check.checked = checkAll.checked;
    });
    updateTotalPrice();
});

checkItems.forEach((check) => {
    check.addEventListener("change", () => {
        checkAll.checked = Array.from(checkItems).every(item => item.checked);
        updateTotalPrice();
    });
});

document.querySelectorAll(".quantity-button").forEach(button => {
    button.addEventListener("click", function () {
        const input = this.parentElement.querySelector(".quantity-display");
        let quantity = parseInt(input.value, 10);

        if (this.id === "increase") {
            quantity++;
        } else if (this.id === "decrease" && quantity > 1) {
            quantity--;
        }
        input.value = quantity;
        updateTotalPrice();
    });
});

const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", (event) => {
    const cartData = [];
    document.querySelectorAll(".check-item").forEach(check => {
        if (check.checked) {
            const row = check.closest("tr");
            const name = row.querySelector(".name").textContent.trim();
            const image = row.querySelector(".product-img .image").getAttribute("src");
            const color = row.querySelector(".color").textContent.split(": ")[1];
            const size = row.querySelector(".size").textContent.split(": ")[1];
            const quantity = parseInt(row.querySelector(".quantity-display").value, 10);
            const priceString = row.querySelector(".price").textContent;
            const price = parsePrice(priceString);
            cartData.push({ name, color, size, image, quantity, price });
        }
    });

    localStorage.setItem("cartData", JSON.stringify(cartData));
});

function parsePrice(priceString) {
    return parseInt(priceString.replace(/\D/g, ""), 10);
}

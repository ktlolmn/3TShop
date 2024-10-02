import Utils from "../Utils.js";

const container = document.querySelector('.cart-container')

container.insertAdjacentHTML("beforeend", Utils.getFooter())

Utils.getHeader()

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

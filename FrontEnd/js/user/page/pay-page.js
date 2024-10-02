import Utils from "../Utils.js";

const closeModalBtn = document.querySelector(".modal-body .close")
const openModalBtn = document.querySelector(".btn-change-address")
const modal = document.querySelector("#modal-container")
const cancelBtn = document.querySelector(".cancel")
const container = document.querySelector('.pay-container')

container.insertAdjacentHTML("beforeend", Utils.getFooter())

Utils.getHeader()

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
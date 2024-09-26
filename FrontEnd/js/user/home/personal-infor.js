import Utils from "../Utils.js";

const container = document.querySelector('.personal-infor-container')

container.insertAdjacentHTML("beforeend", Utils.getFooter())

Utils.getHeader()

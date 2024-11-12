import Utils from "../../js/admin/Utils.js";

const BASE_URL = 'http://localhost:8080/'

async function getCategoryList() {
    try {
        const response = await fetch(BASE_URL + 'category/get-all');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        renderAllCategory(data)
        renderCategory(data)
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderAllCategory(data) {
    const categoryArr = data.categoryDTOList
    const htmls = []
    categoryArr.forEach(item => {
        htmls.push( `
            <div class="each__category">
                <h5>${item.name}</h5>
            </div>
        `
        )
    })
    document.getElementById('list__category').innerHTML = htmls.join('')  
    categoryIsActive()
}

function renderCategory(data) {
    const categoryArr = data.categoryDTOList
    const htmls = []
    categoryArr.forEach(item => {
        htmls.push( `
            <div class="each__category__wrapepr">
                <img src="../../img/utils/category_img.png">
                <h4 class="category__name">${item.name}</h4>
                <h4 class="category__created">Ngày tạo ${Utils.formatDateTime(item.create_at)}</h4>
                <div class="edit__info">
                    <span style="font-size: 20px" class="material-symbols-outlined">
                        edit
                        </span>
                </div>
                <div class="toggle__product__detail">
                    <span style="font-size: 20px" class="material-symbols-outlined">
                        visibility_off
                        </span>
                </div>
            </div>
        `
        )
    })
    document.querySelector('.category__list').innerHTML = htmls.join('')  
}

getCategoryList()

async function getAllProduct() {
    try {
        const response = await fetch(BASE_URL + 'product/get-all');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        renderProductList(data)
        getProductId()
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderProductList(data) {
    const productArr = data.productDTOList
    const htmls = []
    htmls.push( `
        <div class="product__item title__wrapper">
            <div class="info__product__wrapper title__outside">
                <h4 class="product__id" hidden></h4>
                <img class="product__image hidden__image" src="../../img/utils/product__img.png" style="opacity: 0;">
                <h4 class="item__name" style="opacity: 0;">Sản phẩm absdêd</h4>
                <h4 class="item__price">Giá</h4>
                <h4 class="item__sold">Lượt bán</h4>
                <h4 class="item__stock">Tồn kho</h4>
            </div>
        </div>
    `
    )
    productArr.forEach(item => {
        htmls.push( `
            <div class="product__item">
                <div class="info__product__wrapper">
                    <h4 class="product__id" hidden>${item.product_id}</h4>
                    <img class="product__image" src="../../img/utils/product__img.png">
                    <h4 class="item__name">${item.name}</h4>
                    <h4 class="item__price">${item.price}</h4>
                    <h4 class="item__sold">${item.sold}</h4>
                    <h4 class="item__stock">1.000.000</h4>
                </div>
                <div id="operation__wrapper">
                    <span class="material-symbols-outlined toggle__product">
                        visibility_off
                        </span>
                </div>
            </div>
        `
        )
    })
    document.getElementById('list__prouduct__wrapper').innerHTML = htmls.join('')  
    hideProduct()
}

function getProductId() {
    const productItems = document.querySelectorAll('.product__item')
    let id
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            id = item.querySelector('.product__id')
            console.log(id.textContent)
            return id
        })
    })
}

async function getProductSpecifications(product_id) {
    try {
        const response = await fetch(BASE_URL + 'product/get-all');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        renderProductList(data)
        getProductId()
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
getAllProduct()

async function getAllColors() {
    try {
        const response = await fetch(BASE_URL + 'color/get-all-colors');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        renderColorList(data)
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getAllColors()

function renderColorList(data) {
    const colorArr = data.colorDTOList
    const htmls = []
    colorArr.forEach(item => {
        htmls.push( `
            <div class="each__color__wrapepr">
                <div class="color__preview__wrapper" style="background-color: #${item.hex};"></div>
                <h4 class="color__name">${item.name}</h4>
                <h4 class="color__code">Mã màu 098445</h4>
                <h4 class="color__created"></h4>
                <div class="edit__info">
                    <span style="font-size: 20px" class="material-symbols-outlined">
                        edit
                        </span>
                </div>
                <div class="toggle__color">
                    <span style="font-size: 20px" class="material-symbols-outlined">
                        visibility_off
                        </span>
                </div>
            </div>
        `
        )
    })
    document.querySelector('.color__list').innerHTML = htmls.join('')
}

const elementId = document.querySelector('.navigation')

const items = document.getElementsByClassName('manage__items')
const iconButtonList = document.querySelectorAll('.material-symbols-outlined')
const buttonList = document.querySelectorAll('.button')
const input = document.getElementById('input__category__img')
const iconUploaded = document.getElementById('success__upload')
const iconAddNewCategory = document.getElementById('icon__add__new__category')
const filterProduct = document.querySelectorAll('.filter__product')

const buttonSaveCategory = document.getElementById('save__new__category')
const buttonCancelCategory = document.getElementById('cancel__new__category')
const buttonSaveColor = document.getElementById('save__new__color')
const buttonCancelColor = document.getElementById('cancel__new__color')

const addNewCategoryBackground = document.getElementById('new__category__background')
const addNewColorBackground = document.getElementById('new__color__background')
const iconCloseCategoryModal = document.querySelector('.icon__close__category__modal')
const iconCloseColorModal = document.querySelector('.icon__close__color__modal')
const buttonAddNewCategory = document.querySelector('.add__new__category')
const inputCategoryName = document.getElementById('input__category__name')
const inputCategoryImg = document.getElementById('input__category__img')
const inputColorName = document.getElementById('input__color__name')
const inputColorCode = document.getElementById('input__color__code')
const buttonAddNewColor = document.querySelector('.add__new__color__wrapper') 

const addNewCategoryWrapper = document.querySelector('.add__new__category__wrapper')
const addNewColorWrapper = document.querySelector('.add__new__color__outside')

const buttons = document.querySelectorAll('button')



Utils.includeNavigation(elementId)

filterProduct.forEach(item => {
    item.addEventListener('click', () => {
        console.log("Filter")
        filterProduct.forEach(i => i.classList.remove('active'))
        item.classList.toggle('active')
    })
})

buttons.forEach(item => {
    item.addEventListener('mousedown', () => {
        item.classList.toggle('active')
    })

    item.addEventListener('mouseup', () => {
        item.classList.toggle('active')
    })
})


function categoryIsActive() {
    const categories = document.querySelectorAll('.each__category')
    categories[0].classList.add('active');
    categories.forEach(item => {
        item.addEventListener('click', () => {
            console.log("Category click")
            categories.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        })
    })

}

iconButtonList.forEach(i => {
    i.addEventListener('mousedown', () => {
        i.classList.toggle('active')
    })
    i.addEventListener('mouseup', () => {
        i.classList.toggle('active')
    })
})

buttonList.forEach(i => {
    i.addEventListener('mousedown', () => {
        i.classList.toggle('active')
    })
    i.addEventListener('mouseup', () => {
        i.classList.toggle('active')
    })
})

const categoryImage = document.getElementById('category__img')

input.addEventListener('change', () => {
    if (input.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            categoryImage.hidden = false
            categoryImage.src = e.target.result
        }        
        reader.readAsDataURL(input.files[0]);
        iconAddNewCategory.style.display = 'none'
        iconUploaded.style.display = 'inline'
    }
})

addNewCategoryBackground.addEventListener('click', (e) => {
    if (e.target === addNewCategoryBackground) {
        closeModal(addNewCategoryWrapper, addNewCategoryBackground)
        clearCategoryContent()
    }
})

addNewColorBackground.addEventListener('click', (e) => {
    if (e.target === addNewColorBackground) {
        closeModal(addNewColorWrapper, addNewColorBackground)
        clearColorContent()
    }
})

iconCloseCategoryModal.addEventListener('click', () => {
    closeModal(addNewCategoryWrapper, addNewCategoryBackground)
    clearCategoryContent()
})

iconCloseColorModal.addEventListener('click', () => {
    closeModal(addNewColorWrapper, addNewColorBackground)
    clearColorContent()
})

buttonCancelCategory.addEventListener('click', () => {
    closeModal(addNewCategoryWrapper, addNewCategoryBackground)
    clearCategoryContent()
})

buttonCancelColor.addEventListener('click', () => {
    closeModal(addNewColorWrapper, addNewColorBackground)
    clearColorContent()
})



function closeModal(wrapperName, background) {
    wrapperName.classList.add('disabled')
    setTimeout(() => {
        wrapperName.classList.remove('active', 'disabled')
        background.style.display = 'none'
    }, 100);
}

function showModal(wrapperName) {
    setTimeout(() => {
        wrapperName.classList.add('active')
    }, 50);
}

buttonAddNewCategory.addEventListener('click', () => {
    clearCategoryContent()
    clearCategoryValidate()
    addNewCategoryBackground.style.display = 'flex'
    showModal(addNewCategoryWrapper)
})

buttonAddNewColor.addEventListener('click', () => {
    clearColorContent()
    clearColorValidate()
    addNewColorBackground.style.display = 'flex'
    showModal(addNewColorWrapper)
})

function clearCategoryContent(option) {
    inputCategoryName.value = ''
    inputCategoryImg.value = ''
    iconAddNewCategory.style.display = 'inline'
    iconUploaded.style.display = 'none' 
}

function clearCategoryValidate() {
    categoryImageValidate.style.opacity = 0
    categoryNameValidate.style.opacity = 0
    categoryImage.src = '#'
    categoryImage.hidden = true
}

function clearColorContent() {
    inputColorName.value = ''
    inputColorCode.value = ''
    console.log('Cleared color')
}

function clearColorValidate() {
    colorNameValidate.style.opacity = 0
    colorCodeValidate.style.opacity = 0

}


inputColorCode.addEventListener('input',() => {
    let value = inputColorCode.value.replaceAll("#","")
    const colorPreview = document.getElementById('color__code__preview')
    const iconPreviewColor = document.getElementById('color__preview__icon')
    if(value.length >= 6) {
        iconPreviewColor.hidden = true
        colorPreview.style.backgroundColor = "#" + value
    } else {
        iconPreviewColor.hidden = false
        colorPreview.style.backgroundColor = "Transparent"
    }
})


function hideProduct() {
    const toggleProducts = document.querySelectorAll('.toggle__product')
    const modal = document.querySelector('.confirm__order__background')
    toggleProducts.forEach(item => {
        item.addEventListener('click', () => {
            Utils.showModalConfirm(
                'XÁC NHẬN ẨN',
                `Bạn có chắc chắn muốn ẩn <br> sản phẩm này không?`,
                '../../img/utils/hide.png',
                modal
            )
            Utils.hiddenModalConfirm(modal)
        })
    })

}




const categoryNameValidate = document.getElementById('category__name__validate')
const categoryImageValidate = document.getElementById('category__img__validate')

const colorNameValidate = document.getElementById('color__name__validate')
const colorCodeValidate = document.getElementById('color__code__validate')

function hasSpecialCharacters(text) {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/;
    return specialChars.test(text);
}

buttonSaveCategory.addEventListener('click', () => {
    let check = true
    if (inputCategoryName.value.trim() === '') {
        categoryNameValidate.textContent = 'Vui lòng nhập tên danh mục'
        categoryNameValidate.style.opacity = 1
        check = false
    } else if (hasSpecialCharacters(inputCategoryName.value.trim())) {
        categoryNameValidate.textContent = 'Không cho phép kí tự đặc biệt'
        categoryNameValidate.style.opacity = 1
        check = false
    } else {
        categoryNameValidate.style.opacity = 0
    }
    if (inputCategoryImg.value === '') {
        categoryImageValidate.style.opacity = 1
        check = false
    } else {
        categoryImageValidate.style.opacity = 0
    }
    if (check) {
        clearCategoryValidate()
    }
})

buttonSaveColor.addEventListener('click', () => {
    let check = true
    if (inputColorName.value.trim() === '') {
        colorNameValidate.textContent = 'Vui lòng nhập tên màu sắc'
        colorNameValidate.style.opacity = 1
        check = false
    } else if (hasSpecialCharacters(inputColorName.value.trim())) {
        colorNameValidate.textContent = 'Không cho phép kí tự đặc biệt'
        colorNameValidate.style.opacity = 1
        check = false
    } else {
        colorNameValidate.style.opacity = 0
    }
    if (inputColorCode.value.trim() === '') {
        colorCodeValidate.textContent = 'Vui lòng nhập mã màu sắc'
        colorCodeValidate.style.opacity = 1
        check = false
    } else if (inputColorCode.value.startsWith('#')) {
        if (hasSpecialCharacters(inputColorCode.value.slice(1))) {
            colorCodeValidate.textContent = 'Mã màu sắc không hợp lệ'
            colorCodeValidate.style.opacity = 1
            check = false
        }
    } else if (hasSpecialCharacters(inputColorCode.value)) {
        colorCodeValidate.textContent = 'Mã màu sắc không hợp lệ'
        colorCodeValidate.style.opacity = 1
        check = false
    } else {
        colorCodeValidate.style.opacity = 0
    }
    if (check) {
        clearColorValidate()
    }
})

const toggleProuductDetails = document.querySelectorAll('.toggle__product__detail')

toggleProuductDetails.forEach(item => {
    item.addEventListener('click', () => {
        Utils.showModalConfirm(
            "XÁC NHẬN ẨN",
            `Bạn có chắc chắn muốn ẩn <br> sản phẩm này không ?`,
            "../../img/utils/hide.png",
            modal
        )
        Utils.hiddenModalConfirm(modal)
    })
})




const items = document.getElementsByClassName('manage__items')
const categories = document.querySelectorAll('.each__category')
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

const buttons = document.querySelectorAll('button')

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


categories[0].classList.add('active');
categories.forEach(item => {
    item.addEventListener('click', () => {
        categories.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    })
})

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

input.addEventListener('change', () => {
    if (input.files.length > 0) {
        console.log("Uploaded")
        iconAddNewCategory.style.display = 'none'
        iconUploaded.style.display = 'inline'
    }
})

addNewCategoryBackground.addEventListener('click', (e) => {
    if (e.target === addNewCategoryBackground) {
        addNewCategoryBackground.style.display = 'none'
        clearCategoryContent()
    }
})

addNewColorBackground.addEventListener('click', (e) => {
    if (e.target === addNewColorBackground) {
        addNewColorBackground.style.display = 'none'
        clearColorContent()
    }
})

iconCloseCategoryModal.addEventListener('click', () => {
    addNewCategoryBackground.style.display = 'none'
    clearCategoryContent()
})

iconCloseColorModal.addEventListener('click', () => {
    addNewColorBackground.style.display = 'none'
    clearColorContent()
})

buttonCancelCategory.addEventListener('click', () => {
    addNewCategoryBackground.style.display = 'none'
    clearCategoryContent()
})

buttonCancelColor.addEventListener('click', () => {
    addNewColorBackground.style.display = 'none'
    clearColorContent()
})

buttonAddNewCategory.addEventListener('click', () => {
    addNewCategoryBackground.style.display = 'flex'
})

buttonAddNewColor.addEventListener('click', () => {
    addNewColorBackground.style.display = 'flex'
})

function clearCategoryContent() {
    inputCategoryName.value = ''
    inputCategoryImg.value = ''
    iconAddNewCategory.style.display = 'inline'
    iconUploaded.style.display = 'none'
}

function clearColorContent() {
    inputColorName.value = ''
    inputColorCode.value = ''
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


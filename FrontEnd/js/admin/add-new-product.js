const displayImage = document.getElementById('uploaded__image')
const placeholderImage = document.getElementById('place__holder__image')
const button = document.querySelectorAll('button')
const productImageWrapper = document.querySelector('.product__image__wrapper')
const deteleAllImage = document.getElementById('detele__all__image')

const validateImage = document.getElementById('validate__product__image')
const validateName = document.getElementById('validate__product__name')
const validatePrice = document.getElementById('validate__product__price')
const validateDescription = document.getElementById('validate__product__description')

const cancelAddNew = document.getElementById('cancel__add__new__one')
const saveProduct = document.getElementById('save__new__one')

const inputName = document.getElementById('input__product__name')
const inputPrice = document.getElementById('input__product__price')
const inputDescription = document.getElementById('product__description__input')
const inputImage = document.getElementById('upload__product__image__input')

const addProductSizeM = document.getElementById('add__size__m')
const addProductSizeL = document.getElementById('add__size__l')
const addProductSizeXL = document.getElementById('add__size__xl')
const addProductSizeXXL = document.getElementById('add__size__xxl')

const inputQuantitySizeM = document.getElementById('input__quantity__m')
const inputQuantitySizeL = document.getElementById('input__quantity__l')
const inputQuantitySizeXL = document.getElementById('input__quantity__xl')
const inputQuantitySizeXXL = document.getElementById('input__quantity__xxl')

const validateInputSizeM = document.getElementById('validate__input__size__m')
const validateInputSizeL = document.getElementById('validate__input__size__l')
const validateInputSizeXL = document.getElementById('validate__input__size__xl')
const validateInputSizeXXL = document.getElementById('validate__input__size__xxl')

var images = []
var count = false

button.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.classList.add('active')
    })

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('active')
    })
})

deteleAllImage.addEventListener('click', () => {
    try {
        images.length = 0
        inputImage.value = ''
        count = false
        placeHolder() 
    } catch (exception){
        console.log(exception)
    }
})


inputImage.addEventListener('change', () => {
    if (!count) {
        productImageWrapper.innerHTML = ''
    }
    images = inputImage.files;
    if (images.length > 0) {
        if (inputImage.files.length > 10) {
            validateImage.textContent = "Chọn tối đa 10 ảnh"
            toggleValidate(validateImage, 1)
            placeHolder()
            return
        } else {
            toggleValidate(validateImage, 0)
        }
        if (!count && images.length === 1) {
            console.log(images.length)
            productImageWrapper.classList.remove('show-image')
        } else {
            productImageWrapper.classList.add('show-image')
        }
                
        placeholderImage.hidden = true
        for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const showImg = document.createElement('img')
            showImg.src = URL.createObjectURL(image)
            showImg.alt = image.name
            showImg.classList.add('scaled-image')
            productImageWrapper.appendChild(showImg)
        }
        count = true
    } else { 
        count = false
        placeholderImage.hidden = false
        productImageWrapper.classList.remove('show-image')
    }
})

saveProduct.addEventListener('click', () => {
    let check = true
    if (inputName.value.length === 0) {
        toggleValidate(validateName, 1)
        check = false
    } else {
        toggleValidate(validateName, 0)
    }
    if (inputPrice.value.trim() === '') {
        validatePrice.textContent = "Vui lòng nhập giá sản phẩm"
        toggleValidate(validatePrice, 1)
        check = false
    } else if (parseFloat(inputPrice.value, 10) < 0 || isNaN(inputPrice.value.trim())) {
        validatePrice.textContent = "Giá sản phẩm không hợp lệ"
        toggleValidate(validatePrice, 1)
        check = false
    } 
    else {
        toggleValidate(validatePrice, 0)
    }
    if (inputImage.files.length === 0) {
        validateImage.textContent = "Vui lòng tải lên hình ảnh sản phẩm"
        toggleValidate(validateImage, 1)
        check = false
    } else if (inputImage.files.length > 10) {
        validateImage.textContent = "Chọn tối đa 10 ảnh"
        toggleValidate(validateImage, 1)
        check = false
    } 
    else {
        toggleValidate(validateImage, 0)
    } 
    if (inputDescription.value.length === 0) {
        toggleValidate(validateDescription, 1)
        check = false
    } else {
        toggleValidate(validateDescription, 0)
    }
    check = checkAllValidateSize()
    if (check) {
        resetValidate()
    }
})

function resetValidate() {
    const validateFields = document.querySelectorAll('.validate__input')
    validateFields.forEach(i => {
        i.style.opacity = '0'
    })
}

function toggleValidate(element, value) {
    element.style.opacity = value
}

function placeHolder() {
    productImageWrapper.classList.remove('show-image')
    productImageWrapper.innerHTML = ''
    productImageWrapper.innerHTML = '<img src="../../img/utils/image.png" alt="NO IMAGE" class="product__image" id="place__holder__image">'
}

function validateAddEachSizeClicked(btn, input, validate) {
    btn.addEventListener('click', () => {
        if (input.value.trim() === '') {
            validate.textContent = "Vui lòng nhập số lượng sản phẩm"
            validate.style.opacity = 1
            return false
        } else if (parseInt(input.value, 10) <= 0 || isNaN(input.value)) {
            validate.textContent = "Số lượng sản phẩm không hợp lệ"
            validate.style.opacity = 1
            return false
        } else {
            validate.style.opacity = 0
        }
        return true
    })
}

function validateAddEachSize(btn, input, validate) {
    if (input.value.trim() === '') {
        validate.textContent = "Vui lòng nhập số lượng sản phẩm"
        validate.style.opacity = 1
        return false
    } else if (parseInt(input.value, 10) <= 0 || isNaN(input.value)) {
        validate.textContent = "Số lượng sản phẩm không hợp lệ"
        validate.style.opacity = 1
        return false
    } else {
        validate.style.opacity = 0
    }
    return true
}

function checkAllValidateSize() {
    check = true
    if (!validateAddEachSize(addProductSizeM, inputQuantitySizeM, validateInputSizeM)) {
         check = false
    }
    if (!validateAddEachSize(addProductSizeL, inputQuantitySizeL, validateInputSizeL)) {
         check = false
    }
    if (!validateAddEachSize(addProductSizeXL, inputQuantitySizeXL, validateInputSizeXL)) {
         check = false
    }
    if (!validateAddEachSize(addProductSizeXXL, inputQuantitySizeXXL, validateInputSizeXXL)) {
         check = false
    }
    return check
}

validateAddEachSizeClicked(addProductSizeM, inputQuantitySizeM, validateInputSizeM)
validateAddEachSizeClicked(addProductSizeL, inputQuantitySizeL, validateInputSizeL)
validateAddEachSizeClicked(addProductSizeXL, inputQuantitySizeXL, validateInputSizeXL)
validateAddEachSizeClicked(addProductSizeXXL, inputQuantitySizeXXL, validateInputSizeXXL)

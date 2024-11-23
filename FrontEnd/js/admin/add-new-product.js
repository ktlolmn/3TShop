import Utils from "../../js/admin/Utils.js";
import Api from "../../js/admin/Api.js";

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

const productListSizeM = document.querySelector('.size__m')
const productListSizeL = document.querySelector('.size__l')
const productListSizeXL = document.querySelector('.size__xl')
const productListSizeXXL = document.querySelector('.size__xxl')

var images = []
var count = false
let dataSizeM = []
let dataSizeL = []
let dataSizeXL = []
let dataSizeXXL = []
var imageArr = []

const backBtn = document.getElementById('button__back')
backBtn.addEventListener('click', () => {
    window.location.href = '/admin/manage-product'
})

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
        Array.from(images).length = 0
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
    createImageArray()
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
    if (inputImage.files.length === 0 && Array.from(images).length === 0) {
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
    // check = checkAllValidateSize()
    // check = validateSpecification()
    if (check) {
        if(!isEmptySpecification()) {return}
        resetValidate()
        addNewProduct(getInputData())
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

function validateAddEachSizeClicked(btn, input, validate, func) {
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
            func()
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

addProductSizeM.addEventListener('click', () => {
    if (inputQuantitySizeM.value.trim() === '') {
        validateInputSizeM.textContent = "Vui lòng nhập số lượng sản phẩm"
        validateInputSizeM.style.opacity = 1
        return false
    } else if (parseInt(inputQuantitySizeM.value, 10) <= 0 || isNaN(inputQuantitySizeM.value)) {
        validateInputSizeM.textContent = "Số lượng sản phẩm không hợp lệ"
        validateInputSizeM.style.opacity = 1
        return false
    } else {
        validateInputSizeM.style.opacity = 0
        addSpecificationSizeM()
    }
    return true
})

addProductSizeL.addEventListener('click', () => {
    if (inputQuantitySizeL.value.trim() === '') {
        validateInputSizeL.textContent = "Vui lòng nhập số lượng sản phẩm"
        validateInputSizeL.style.opacity = 1
        return false
    } else if (parseInt(inputQuantitySizeL.value, 10) <= 0 || isNaN(inputQuantitySizeL.value)) {
        validateInputSizeL.textContent = "Số lượng sản phẩm không hợp lệ"
        validateInputSizeL.style.opacity = 1
        return false
    } else {
        validateInputSizeL.style.opacity = 0
        addSpecificationSizeL()
    }
    return true
})

addProductSizeXL.addEventListener('click', () => {
    if (inputQuantitySizeXL.value.trim() === '') {
        validateInputSizeXL.textContent = "Vui lòng nhập số lượng sản phẩm"
        validateInputSizeXL.style.opacity = 1
        return false
    } else if (parseInt(inputQuantitySizeXL.value, 10) <= 0 || isNaN(inputQuantitySizeXL.value)) {
        validateInputSizeXL.textContent = "Số lượng sản phẩm không hợp lệ"
        validateInputSizeXL.style.opacity = 1
        return false
    } else {
        validateInputSizeXL.style.opacity = 0
        addSpecificationSizeXL()
    }
    return true
})

addProductSizeXXL.addEventListener('click', () => {
    if (inputQuantitySizeXXL.value.trim() === '') {
        validateInputSizeXXL.textContent = "Vui lòng nhập số lượng sản phẩm"
        validateInputSizeXXL.style.opacity = 1
        return false
    } else if (parseInt(inputQuantitySizeXXL.value, 10) <= 0 || isNaN(inputQuantitySizeXXL.value)) {
        validateInputSizeXXL.textContent = "Số lượng sản phẩm không hợp lệ"
        validateInputSizeXXL.style.opacity = 1
        return false
    } else {
        validateInputSizeXXL.style.opacity = 0
        addSpecificationSizeXXL()
    }
    return true
})

var categoryArr = []
var colorArr = []
async function getCategoryList() {
    const categoryList = await Api.getCategoryList()
    categoryArr = categoryList.categoryDTOList
    renderCategory()
}

const categoryCombobox = document.getElementById('category__combobox')

function renderCategory() {
    if (categoryArr.length === 0) {
        categoryCombobox.disabled = true
        saveProduct.disabled = true
        Utils.showToast("Danh sách danh mục trống", 'error')
        return
    }
    categoryCombobox.disabled = false
    saveProduct.disabled = false
    let htmls = []
    categoryArr.forEach(item => {
        htmls.push(`
            <option value="${item.category_id}">${item.name}</option>
        `)
    })
    categoryCombobox.value = categoryArr[0].category_id
    categoryCombobox.innerHTML = htmls.join('')
}

async function getAllColors() {
    const colorList = await Api.getAllColors()
    colorArr = colorList.colorDTOList
    renderColor()
}
const productColorCombobox = document.querySelectorAll('.product__color__combobox')
function renderColor() {
    if (colorArr.length === 0) {
        productColorCombobox.disabled = true
        saveProduct.disabled = true
        Utils.showToast("Danh sách màu sắc trống", 'error')
        return
    }
    productColorCombobox.disabled = false
    saveProduct.disabled = false
    let htmls = []
    colorArr.forEach(item => {
        htmls.push(`
            <option value="${item.color_id}">${item.name}</option>
        `)
    })
    productColorCombobox.value = colorArr[0].color_id
    productColorCombobox.forEach(item => {
        item.innerHTML = htmls.join('')
    })
}
getCategoryList()
getAllColors()
const productTypeCombobox = document.getElementById('product__type__combobox')

async function addNewProduct(data) {
    Utils.showLoading(true)
    console.log(data)
    try {
        const response = await Api.postData('product/add-product', data)
        Utils.showLoading(false)
        if (response.status === 200) {
            Utils.showToast("Thêm sản phẩm mới thành công", 'check_circle')
            resetInput()
        } else {
            Utils.showToast("Có lỗi xảy ra. Vui lòng thử lại!", 'error')
        }
    } catch (error) {
        console.log("Error: ", error)
    }
}

function resetInput() {
    const inputTag = document.querySelectorAll('input')
    inputTag.forEach(input => {
        input.value = ''
    })
    document.querySelector('textarea').value = ''
    productListSizeM.innerHTML = ``
    productListSizeL.innerHTML = ``
    productListSizeXL.innerHTML = ``
    productListSizeXXL.innerHTML = ``
    dataSizeM.length = 0
    dataSizeL.length = 0
    dataSizeXL.length = 0
    dataSizeXXL.length = 0
    imageArr.length = 0
    Array.from(images).length = 0
    inputImage.value = ''
    count = false
    placeHolder() 
    categoryCombobox.value = categoryArr[0]
    productColorCombobox.value = colorArr[0]
    console.log(inputTag)
}

resetInput()

function validateSpecification() {
    if (dataSizeM.length != 0 || dataSizeL.length != 0 || dataSizeXL.length != 0 || dataSizeXXL.length != 0) {
        return true
    } 
    return false
}

function isEmptySpecification() {
    if (dataSizeM.length === 0 && dataSizeL.length === 0 && dataSizeXL.length === 0 && dataSizeXXL.length === 0) {
        Utils.showToast("Vui lòng điền thông tin chi tiết của sản phẩm", 'warning')
        return false
    } 
    return true
}

function convertToBase64(inputFile) {
    const file = inputFile.files[0];
    if (!file) {
        throw new Error("No file selected");
    }

    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Lấy phần base64 sau ","
            resolve(base64String);
        };
        reader.onerror = () => {
            reject("Error reading file");
        };
        reader.readAsDataURL(file);
    });
}

function convertFilesToBase64() {
    const files = inputImage.files
    if (!files || files.length === 0) {
        throw new Error("No files provided");
    }

    const promises = Array.from(files).map(file => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = () => {
                const base64String = reader.result.split(',')[1]; 
                resolve(base64String);
            };
            reader.onerror = () => {
                reject("Error reading file");
            };
            reader.readAsDataURL(file);
        });
    });
    return Promise.all(promises);
}



async function createImageArray() {
    Utils.showLoading(true)
    try {
        const base64Array = await convertFilesToBase64();
        Utils.showLoading(false)
        base64Array.forEach((base64, index) => {
            imageArr.push(
                {
                    image_data: base64
                }
            )
        });
    } catch (error) {
        console.error(error.message);
    }
}

function getInputData() {
    const specificationList = []
    const inputData = {
        productDTO : {
            name : inputName.value.trim(),
            description : inputDescription.value.trim(),
            price : inputPrice.value.trim(),
            sold : 0,
            which_gender : productTypeCombobox.value,
            categoryDTO : {
                category_id : categoryCombobox.value
            }
        },
        specificationsDTO : specificationList.concat(dataSizeM, dataSizeL, dataSizeXL, dataSizeXXL),
        imagesDTOS : imageArr
    }
    return inputData
}


let htmlsSizeM = []
function addSpecificationSizeM() {
    const colorSizeM = document.querySelector('.color__size__m')
    let check = true
    dataSizeM.forEach(item => {
        if (item.colorDTO.color_id === colorSizeM.value) {
            Utils.showToast("Màu đã được thêm. Vui lòng chọn màu khác!", 'warning')
            check = false
        }
    })
    if (check) {

        htmlsSizeM.push(`
            <div class="added__product__by__size">
                <h3>Số lượng ${inputQuantitySizeM.value.trim()}</h3>
                <h3>Màu sắc ${returnColorName(colorSizeM.value)}</h3>
                <div class="detele__wrapper">
                    <span class="material-symbols-outlined remove__size__m" style="font-size: 16px">
                        close
                        </span>
                </div>
            </div>
        `)
        dataSizeM.push(
            {
                quantity : inputQuantitySizeM.value.trim(),
                colorDTO : {
                    color_id : colorSizeM.value
                },
                sizeDTO : {
                    size_id : 1
                }
            }
        )
        productListSizeM.innerHTML = htmlsSizeM.join('')
        inputQuantitySizeM.value = ''
        colorSizeM.value = colorArr[0].color_id
        console.log("M: ", dataSizeM, htmlsSizeM)
    }
}


let htmlsSizeL = []
function addSpecificationSizeL() {
    const colorSizeL = document.querySelector('.color__size__l')
    let check = true
    dataSizeL.forEach(item => {
        if (item.colorDTO.color_id === colorSizeL.value) {
            Utils.showToast("Màu đã được thêm. Vui lòng chọn màu khác!", 'warning')
            check = false
        }
    })
    if (check) {
        htmlsSizeL.push(`
            <div class="added__product__by__size">
                <h3>Số lượng ${inputQuantitySizeL.value.trim()}</h3>
                <h3>Màu sắc ${returnColorName(colorSizeL.value)}</h3>
                <div class="detele__wrapper">
                    <span class="material-symbols-outlined remove__size__l" style="font-size: 16px">
                        close
                        </span>
                </div>
            </div>
        `)
        dataSizeL.push(
            {
                quantity : inputQuantitySizeL.value.trim(),
                colorDTO : {
                    color_id : colorSizeL.value
                },
                sizeDTO : {
                    size_id : 2
                }
            }
        )
        productListSizeL.innerHTML = htmlsSizeL.join('')
        inputQuantitySizeL.value = ''
        colorSizeL.value = colorArr[0].color_id
        console.log("L: ", dataSizeL)
    }
}


let htmlsSizeXL = []
function addSpecificationSizeXL() {
    const colorSizeXL = document.querySelector('.color__size__xl')
    let check = true
    dataSizeXL.forEach(item => {
        if (item.colorDTO.color_id === colorSizeXL.value) {
            Utils.showToast("Màu đã được thêm. Vui lòng chọn màu khác!", 'warning')
            check = false
        }
    })
    if (check) {
        htmlsSizeXL.push(`
            <div class="added__product__by__size">
                <h3>Số lượng ${inputQuantitySizeXL.value.trim()}</h3>
                <h3>Màu sắc ${returnColorName(colorSizeXL.value)}</h3>
                <div class="detele__wrapper">
                    <span class="material-symbols-outlined remove__size__xl" style="font-size: 16px">
                        close
                        </span>
                </div>
            </div>
        `)
        dataSizeXL.push(
            {
                quantity : inputQuantitySizeXL.value.trim(),
                colorDTO : {
                    color_id : colorSizeXL.value
                },
                sizeDTO : {
                    size_id : 3
                }
            }
        )
        productListSizeXL.innerHTML = htmlsSizeXL.join('')
        inputQuantitySizeXL.value = ''
        colorSizeXL.value = colorArr[0].color_id
        console.log("XL: ", dataSizeXL)
    }
}


let htmlsSizeXXL = []
function addSpecificationSizeXXL() {
    const colorSizeXXL = document.querySelector('.color__size__xxl')
    let check = true
    dataSizeXXL.forEach(item => {
        if (item.colorDTO.color_id === colorSizeXXL.value) {
            Utils.showToast("Màu đã được thêm. Vui lòng chọn màu khác!", 'warning')
            check = false
        }
    })
    if (check) {
        htmlsSizeXXL.push(`
            <div class="added__product__by__size">
                <h3>Số lượng ${inputQuantitySizeXXL.value.trim()}</h3>
                <h3>Màu sắc ${returnColorName(colorSizeXXL.value)}</h3>
                <div class="detele__wrapper detele__xxl__wrapper">
                    <span class="material-symbols-outlined remove__size__xxl" style="font-size: 16px">
                        close
                        </span>
                </div>
            </div>
        `)
        dataSizeXXL.push(
            {
                quantity : inputQuantitySizeXXL.value.trim(),
                colorDTO : {
                    color_id : colorSizeXXL.value
                },
                sizeDTO : {
                    size_id : 4
                }
            }
        )
        productListSizeXXL.innerHTML = htmlsSizeXXL.join('')
        inputQuantitySizeXXL.value = ''
        colorSizeXXL.value = colorArr[0].color_id
    } 
    renderSpecSize()
}

function renderSpecSize() {
    let htmlsSize = []
    const deleteXXL = document.querySelectorAll('.detele__xxl__wrapper')
    deleteXXL.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log("click")
            dataSizeXXL.splice(index, 1)
            htmlsSizeXXL.splice(index, 1)
            productListSizeXXL.innerHTML = ''
            productListSizeXXL.innerHTML = htmlsSizeXXL.join('')
        })
    })
}

function renderList(data) {
    let html = []
    data.forEach(item => {
        html.push(`
            <div class="added__product__by__size">
                <h3>Số lượng ${item.quantity}</h3>
                <h3>Màu sắc ${returnColorName(item.colorDTO.color_id)}</h3>
                <div class="detele__wrapper detele__xxl__wrapper">
                    <span class="material-symbols-outlined remove__size__xxl" style="font-size: 16px">
                        close
                        </span>
                </div>
            </div>
        `)
    })
    productListSizeXXL.innerHTML = html.join('')
}

function returnColorName(colorId) {
    console.log(colorArr, colorArr.filter(color => color.color_id === parseInt(colorId))[0].name)
    return colorArr.filter(color => color.color_id === parseInt(colorId))[0].name
}

cancelAddNew.addEventListener('click', () => {
    setTimeout(() => {
        window.location.href = '/admin/manage-product'
    }, 250);
})

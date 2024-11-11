const orderStatus = document.querySelectorAll('.order__status')
const buttons = document.querySelectorAll('button')
const iconButtons = document.querySelectorAll('.material-symbols-outlined')

const inputShipment = document.getElementById('input__shipment')
const editShipment = document.getElementById('edit__shipment')
const saveShipment = document.getElementById('save__shipment')
const cancelEditShipmentWrapper = document.querySelector('.cancel__edit__shipment__wrapper')

const filterButton = document.getElementById('filter__button')

orderStatus.forEach(item => {
    item.addEventListener('click', () => {
        console.log(item.className)
        orderStatus.forEach(i => i.classList.remove('active'))
        item.classList.toggle('active')
    })
})

buttons.forEach(i => {
    i.addEventListener('mousedown', () => {
        i.style.scale = 0.95
    })
    i.addEventListener('mouseup', () => {
        i.style.scale = 1
    })
})

iconButtons.forEach(i => {
    i.addEventListener('mousedown', () => {
        i.classList.add('active')
    })
    i.addEventListener('mouseup', () => {
        i.classList.remove('active')
    })
})

editShipment.addEventListener('click', () => {
    console.log('Edit')
    toggleEditShipment(false)
    toggleSaveShipment(true)
})

saveShipment.addEventListener('click', () => {
    if (parseFloat(inputShipment.value) < 0) {
        showToast('Mức phí giao hàng không hợp lệ!');
        return
    } else if (inputShipment.value.trim() === '') {
        showToast('Vui lòng nhập phí giao hàng!');
        return
    }
    toggleEditShipment(true)
    toggleSaveShipment(false)
})

cancelEditShipmentWrapper.addEventListener('click', () => {
    setTimeout(() => {
        cancelEditShipmentWrapper.classList.remove('active')
        cancelEditShipmentWrapper.style.display = 'none'
        toggleSaveShipment(false)
        toggleEditShipment(true)
        
    }, 100);
})


function toggleEditShipment(option) {
    if (option) {
        editShipment.style.display = 'flex'
        inputShipment.disabled = true
        // inputShipment.value = ''  
        return  
    } 
    editShipment.style.display = 'none'
    inputShipment.disabled = false
    setTimeout(() => {
        cancelEditShipmentWrapper.classList.add('active')
    }, 200);
}

function toggleSaveShipment(option) {
    if (option) {
        saveShipment.style.display = 'flex'
        cancelEditShipmentWrapper.style.display = 'flex'
        setTimeout(() => {
            cancelEditShipmentWrapper.classList.add('active')
        }, 200);
        inputShipment.disabled = false
        return  
    } 
    saveShipment.style.display = 'none'
    inputShipment.disabled = true
    inputShipment.value = ''
}

filterButton.addEventListener('click', () => {
    const startDateInput = document.getElementById('input__start__date')
    const endDateInput = document.getElementById('input__end__date')

    let startDate = new Date(startDateInput.value)
    let endDate = new Date(endDateInput.value)

    if (startDateInput.value.trim() === '') {
        showToast('Vui lòng chọn ngày bắt đầu lọc!')
        // return
    } else if (endDateInput.value.trim() === '') {
        showToast('Vui lòng chọn ngày kết thúc lọc!')
    } else if (startDate > endDate) {
        showToast('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!')
    } else if (endDate > new Date().setHours(0,0,0,0)) {
        showToast('Ngày kết thúc phải nhỏ hơn ngày hiện tại!')
    }
    else {
        console.log(startDate.value, endDate.value)
    }
})

const orderDetailOutside = document.querySelector('.order__detail__outside')
const footerShowInfor = document.querySelector('.footer__show__information')
const placeholderImage = document.getElementById('placeholder__image')


function showPlaceholderImage(option) {
    if (option) {
        placeholderImage.hidden = false
        orderDetailOutside.classList.add('empty')
        footerShowInfor.classList.add('empty')
        return
    }
    placeholderImage.hidden = true
    orderDetailOutside.classList.remove('empty')
    footerShowInfor.classList.remove('empty')
}

showPlaceholderImage(true)

const eachOrder = document.querySelectorAll('.each__order')
eachOrder.forEach(row => {
    row.addEventListener('click', () => {
        console.log(row)
        const idValue = row.querySelector('.id__col').textContent;
        console.log('Order ID:', idValue);
        showPlaceholderImage(false)
        orderDetailOutside.innerHTML = `
            <div class="title__order__detail__wrapper">
                        <h3 id="order__id__title">MÃ ĐƠN HÀNG</h3>
                        <h3 id="order__id__content">334445</h3>
                    </div>
                    <div class="order__detail__body">
                        <div class="order__information__wrapper">
                            <div class="customer__name__title">
                                <h3>Khách hàng</h3>
                            </div>
                            <div class="customer__name__content">
                                <h3>Phạm Thanh Trường</h3>
                            </div>
                            <div class="customer__phone__title">
                                <h3>Số điện thoại</h3>
                            </div>
                            <div class="customer__phone__content">
                                <h3>0998876566</h3>
                            </div>
                            <div class="customer__address__title">
                                <h3>Địa chỉ</h3>
                            </div>
                            <div class="customer__address__content">
                                <h3>41/15, đường số 11, phường Trường Thọ, TP. Thủ Đức, TP.HCM</h3>
                            </div>
                            <div class="customer__time__title">
                                <h3>Thời gian đặt hàng</h3>
                            </div>
                            <div class="customer__time__content">
                                <h3>10/10/2024 13:30:00</h3>
                            </div>
                            <div class="customer__shipment__title">
                                <h3>Phí giao hàng</h3>
                            </div>
                            <div class="customer__shipment__content">
                                <h3>50.000đ</h3>
                            </div>
                            <div class="customer__note__title">
                                <h3>Ghi chú đơn hàng</h3>
                            </div>
                            <div class="customer__note__content">
                                <h3>Giao đúng mẫu nha shop Giao đúng mẫu nha shop Giao đúng mẫu nha shop</h3>
                            </div>
                            <div class="customer__total__title">
                                <h3>Tổng giá trị đơn hàng</h3>
                            </div>
                            <div class="customer__total__content">
                                <h3>1.000.000đ</h3>
                            </div>
                        </div>
                    </div>
                    <table class="ordered__product__list">
                        <thead class="table__header__wrapper">
                                <tr>
                                    <th class="table__header">STT</th>
                                    <th class="table__header">Sản phẩm</th>
                                    <th class="table__header">Số lượng</th>
                                    <th class="table__header">Giá</th>
                                    <th class="table__header">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody id="tbody__table">
                            </tbody>
                    </table>
        `
        const tbodyTable = document.getElementById('tbody__table')
        tbodyTable.innerHTML =  `
                            <tr class="table__row">
                                <td>1</td>
                                <td>
                                    <div class="product__information">
                                        <img src="../../img/utils/product__order.png" class="product__image" alt="product">
                                        <div class="product__specifications">
                                            <h3 class ="product__name">Basic tea</h3>
                                            <h3 class ="product__color">Màu sắc Xanh lá</h3>
                                            <h3 class ="product__size">Size XXL</h3>
                                        </div>
                                    </div>
                                </td>
                                <td>x5</td>
                                <td>100.000đ</td>
                                <td>500.000đ</td>
                            </tr>
                            <tr class="table__row">
                                <td>1</td>
                                <td>
                                    <div class="product__information">
                                        <img src="../../img/utils/product__order.png" class="product__image" alt="product">
                                        <div class="product__specifications">
                                            <h3 class ="product__name">Basic tea</h3>
                                            <h3 class ="product__color">Màu sắc Xanh lá</h3>
                                            <h3 class ="product__size">Size XXL</h3>
                                        </div>
                                    </div>
                                </td>
                                <td>x5</td>
                                <td>100.000đ</td>
                                <td>500.000đ</td>
                            </tr>
        `
    })
})

function showToast(message, type) {

    const iconType = {
        error : 'material-symbols-outline:error',
        warning: 'material-symbols-outline:warning',
        success: 'material-symbols-outline:check_circle'
    }

    const toastContainer = document.getElementById('toast-container');

    if (message) {
      const toastElement = document.createElement('div');
      toastElement.classList.add('toast-message');

    //   const toastIcon = document.createElement('span');
    //   toastText.textContent = message;
  
      const toastText = document.createElement('p');
      toastText.textContent = message;
  
      const toastCloseButton = document.createElement('button');
      toastCloseButton.classList.add('toast-close');
      toastCloseButton.innerHTML = `
        <span class="material-symbols-outlined" id="close__toast">
            close
        </span>`;
  
      toastCloseButton.addEventListener('click', () => {
        toastElement.style.animationName = 'fadeOut';
        setTimeout(() => {
          toastContainer.removeChild(toastElement);
        }, 200);
      });
  
      toastElement.appendChild(toastText);
      toastElement.appendChild(toastCloseButton);
      toastContainer.appendChild(toastElement);
  
      setTimeout(() => {
        toastElement.style.animationName = 'fadeOut';
        setTimeout(() => {
          toastContainer.removeChild(toastElement);
        }, 300);
      }, 4000);
    }
  }


const confirmOrderBackground = document.querySelector('.confirm__order__background')
const cancelOrderBackground = document.querySelector('.cancel__order__background')
const closeModalConfirm = document.querySelector('.close__modal__confirm')
const closeModalCancel = document.querySelector('.close__modal__cancel')

const clickToConfirmOrder = document.getElementById('confirm__order')
const clickToCancelOrder = document.getElementById('cancel__order')

const confirmOrderBtn = document.getElementById('confirm__order__btn')
const hiddenConfirmOrderBtn = document.getElementById('hidden__confirm__order__btn')

const hiddenCancelOrderBtn = document.getElementById('hidden__cancel__order__btn')
const cancelOrderBtn = document.getElementById('cancel__order__btn')

const validateInputReason = document.getElementById('validate__input__reason')
const inputCancelReason = document.getElementById('input__cancel__reason')

const confirmOrderWrapper = document.querySelector('.confirm__order__animation')
const cancelOrderWrapper = document.querySelector('.cancel__order__animation')


function showModal(modalName, btn = null, wrapper) {
    if (btn) {
        btn.addEventListener('click', () => {
            modalName.style.display = 'flex'
            setTimeout(() => {
                wrapper.classList.add('active')
            }, 10);
            return
        })
    } else {
        console.log("Modal was shown without button")
        modalName.style.display = 'flex'
        setTimeout(() => {
            wrapper.classList.add('active')
        }, 10);
    }

}  

function hiddenModal(modalName, btn = null, wrapper) {
    if (btn) {
        btn.addEventListener('click', (e) => {
            wrapper.classList.add('disabled')
            console.log(modalName, btn, wrapper)
            setTimeout(() => {
                modalName.style.display = 'none'
                wrapper.classList.remove('active', 'disabled')
            }, 300);
            return
        })
    } 
    modalName.addEventListener('click', (e) => {
        if(e.target === modalName) {
            wrapper.classList.add('disabled')
            setTimeout(() => {
                wrapper.classList.remove('active', 'disabled')
                modalName.style.display = 'none'
            }, 300);
        }
    })
}

function flexibleConfirmModalContent(title, content, handleFunc) {
    const showTitle = document.getElementById('title__confirm__modal')
    const showContent = document.getElementById('content__confirm__modal')
    const handle = document.getElementById('confirm__order__btn')

    console.log(showTitle, showContent)
    showTitle.textContent = title
    showContent.innerHTML = content
    handle.addEventListener('click', handleFunc)
}

function flexibleCancelModalContent(title, content, handleFunc) {
    const showTitle = document.getElementById('title__confirm__modal')
    const showContent = document.getElementById('content__confirm__modal')
    const handle = document.getElementById('confirm__order__btn')

    console.log(showTitle, showContent)
    showTitle.textContent = title
    showContent.innerHTML = content
    handle.addEventListener('click', handleFunc)
}

cancelOrderBtn.addEventListener('click', () => {
    if (inputCancelReason.value.trim() === '') {
        validateInputReason.style.opacity = 1
    } else {
        validateInputReason.style.opacity = 0
    }
})

hiddenModal(confirmOrderBackground, null, confirmOrderWrapper)
hiddenModal(confirmOrderBackground, hiddenConfirmOrderBtn, confirmOrderWrapper)
hiddenModal(confirmOrderBackground, closeModalConfirm, confirmOrderWrapper)

hiddenModal(cancelOrderBackground, null, cancelOrderWrapper)
hiddenModal(cancelOrderBackground, hiddenCancelOrderBtn, cancelOrderWrapper)
hiddenModal(cancelOrderBackground, closeModalCancel, cancelOrderWrapper)

// showModal(confirmOrderBackground, clickToConfirmOrder, confirmOrderWrapper)
// showModal(cancelOrderBackground, clickToCancelOrder, cancelOrderWrapper)

const completeOrder = document.getElementById('complete__order')

// showModal(confirmOrderBackground, completeOrder, confirmOrderWrapper)

completeOrder.addEventListener('click', () => {
    flexibleConfirmModalContent(
        'XÁC NHẬN XÓA',
        `Bạn có chắc chắc muốn xóa <br> đơn hàng 887777 không ?`,
        console.log("Flexible")
    ) 
    showModal(confirmOrderBackground, null, confirmOrderWrapper)
})





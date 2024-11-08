const orderStatus = document.querySelectorAll('.order__status')
const buttons = document.querySelectorAll('button')
const iconButtons = document.querySelectorAll('.material-symbols-outlined')

const inputShipment = document.getElementById('input__shipment')
const editShipment = document.getElementById('edit__shipment')
const saveShipment = document.getElementById('save__shipment')

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
    toggleEditShipment(true)
    toggleSaveShipment(false)
})

inputShipment.addEventListener('input', () => {
    if (inputShipment.value.trim() === '') {
        toggleEditShipment(true)
        toggleSaveShipment(false)
    }
})

function toggleEditShipment(option) {
    if (option) {
        editShipment.style.display = 'flex'
        inputShipment.disabled = true
        inputShipment.value = ''  
        return  
    } 
    editShipment.style.display = 'none'
    inputShipment.disabled = false
}

function toggleSaveShipment(option) {
    if (option) {
        saveShipment.style.display = 'flex'
        inputShipment.disabled = false
        return  
    } 
    saveShipment.style.display = 'none'
    inputShipment.disabled = true
    inputShipment.value = ''
}

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

      const toastIcon = document.createElement('span');
      toastText.textContent = message;
  
      const toastText = document.createElement('p');
      toastText.textContent = message;
  
      const toastCloseButton = document.createElement('button');
      toastCloseButton.classList.add('toast-close');
      toastCloseButton.textContent = '×';
  
      toastCloseButton.addEventListener('click', () => {
        toastElement.style.animationName = 'fadeOut';
        setTimeout(() => {
          toastContainer.removeChild(toastElement);
        }, 300);
      });
  
      toastElement.appendChild(toastText);
      toastElement.appendChild(toastCloseButton);
      toastContainer.appendChild(toastElement);
  
      setTimeout(() => {
        toastElement.style.animationName = 'fadeOut';
        setTimeout(() => {
          toastContainer.removeChild(toastElement);
        }, 300);
      }, 3000);
    }
  }
  
  // Example usage:
eachOrder[0].addEventListener('click', () => {
    showToast('This is a sample toast message');
})
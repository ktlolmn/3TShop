export default class Utils {
    static async includeNavigation(elementId) {
        fetch('../../view/admin/navigation.html')
            .then(response => response.text())
            .then(data => {
                elementId.innerHTML = data;
    
                const manageItems = document.querySelectorAll('.manage__items')
                manageItems.forEach(item => {
                    item.addEventListener('click', () => {
                        console.log("Click")
                        manageItems.forEach(i => i.classList.remove('active'))
                        item.classList.add('active')
                    })
    
                    item.addEventListener('mousedown', () => {
                        item.classList.add('clicked')
                    })
                    item.addEventListener('mouseup', () => {
                        item.classList.add('clicked')
                    })
                })
            })
            .catch(error => console.error('Lỗi khi tải file:', error));
    }

    static showToast(message, type) {
        const toastContainer = document.getElementById('toast-container');

        if (message) {
            const toastElement = document.createElement('div');
            toastElement.classList.add('toast-message');

            const toastIcon = document.createElement('span');
            toastIcon.style.color = '#ffffff'
            toastIcon.classList.add('material-symbols-outlined')
            toastIcon.textContent = type
        
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
        
            toastElement.appendChild(toastIcon);
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

    static showModalConfirm(title, content, imagePath, modalName) {
        modalName.innerHTML = `
            <div class="confirm__order__wrapper confirm__order__animation">
                <div class="icon__close close__modal__confirm">
                    <span class="material-symbols-outlined">
                        close
                        </span>
                </div>
                <div class="body__modal">
                    <img src=${imagePath} alt="Confirm order" class="confirm__order">
                    <div class="title__wrapper">
                        <h2 id="title__confirm__modal">${title}</h2>
                    </div>
                    <div class="content__wrapper">
                        <h3 class="content" id="content__confirm__modal">${content}</h3>
                    </div>
                    <div class="button__wrapper">
                        <button type="button" id="hidden__confirm__order__btn">Hủy</button>
                        <button type="button" id="confirm__order__btn">Xác nhận</button>
                    </div>
                </div>
            </div>
        `
        const wrapper = document.querySelector('.confirm__order__wrapper')
        // if (btn) {
            // btn.addEventListener('click', () => {
                modalName.style.display = 'flex'
                setTimeout(() => {
                    wrapper.classList.add('active')
                }, 10);
                return
            // })
        // } 
        // else {
        //     console.log("Modal was shown without button")
        //     modalName.style.display = 'flex'
        //     setTimeout(() => {
        //         wrapper.classList.add('active')
        //     }, 10);
        // }
    }  

    static showModalCancel(modalName) {
        modalName.innerHTML = `
            <div class="cancel__order__wrapper cancel__order__animation">
                <div class="icon__close close__modal__cancel">
                    <span class="material-symbols-outlined">
                        close
                        </span>
                </div>
                <div class="body__modal">
                    <img src="../../img/utils/confirm__order.png" alt="Confirm order" class="confirm__order">
                    <div class="title__wrapper">
                        <h2 id="title__cancel__modal">XÁC NHẬN HỦY ĐƠN</h2>
                    </div>
                    <div class="content__wrapper">
                        <label for="input__cancel__reason">Vui lòng cho biết lý do hủy đơn</label>
                        <textarea type="text" id="input__cancel__reason"></textarea>
                        <h3 id="validate__input__reason">Vui lòng nhập lý do hủy đơn</h3>
                    </div>
                    <div class="button__wrapper">
                        <button type="button" id="hidden__cancel__order__btn">Hủy</button>
                        <button type="button" id="cancel__order__btn">Xác nhận</button>
                    </div>
                </div>
            </div>
        `
        const wrapper = document.querySelector('.cancel__order__wrapper')
        // if (btn) {
            // btn.addEventListener('click', () => {
                modalName.style.display = 'flex'
                setTimeout(() => {
                    wrapper.classList.add('active')
                }, 10);
                return
        //     })
        // } else {
        //     console.log("Modal was shown without button")
        //     modalName.style.display = 'flex'
        //     setTimeout(() => {
        //         wrapper.classList.add('active')
        //     }, 10);
        // }
    }  

    static hiddenModalConfirm(modalName) {
        const wrapper = document.querySelector('.confirm__order__wrapper')
        const btn = document.querySelector('#hidden__confirm__order__btn')
        const closeModalConfirm = document.querySelector('.close__modal__confirm')
        // if (btn) {
            btn.addEventListener('click', (e) => {
                wrapper.classList.add('disabled')
                console.log(modalName, btn, wrapper)
                setTimeout(() => {
                    modalName.style.display = 'none'
                    wrapper.classList.remove('active', 'disabled')
                }, 100);
                return
            })

            closeModalConfirm.addEventListener('click', (e) => {
                wrapper.classList.add('disabled')
                console.log(modalName, btn, wrapper)
                setTimeout(() => {
                    modalName.style.display = 'none'
                    wrapper.classList.remove('active', 'disabled')
                }, 100);
                return
            })
        // } 
        modalName.addEventListener('click', (e) => {
            if(e.target === modalName) {
                wrapper.classList.add('disabled')
                setTimeout(() => {
                    wrapper.classList.remove('active', 'disabled')
                    modalName.style.display = 'none'
                }, 100);
            }
        })
    }

    static hiddenModalCancel(modalName) {
        const wrapper = document.querySelector('.cancel__order__wrapper')
        const btn = document.querySelector('#hidden__cancel__order__btn')
        const closeModalCancel = document.querySelector('.close__modal__cancel')

        // if (btn) {
            btn.addEventListener('click', (e) => {
                wrapper.classList.add('disabled')
                console.log(modalName, btn, wrapper)
                setTimeout(() => {
                    modalName.style.display = 'none'
                    wrapper.classList.remove('active', 'disabled')
                }, 300);
                return
            })

            closeModalCancel.addEventListener('click', (e) => {
                wrapper.classList.add('disabled')
                console.log(modalName, btn, wrapper)
                setTimeout(() => {
                    modalName.style.display = 'none'
                    wrapper.classList.remove('active', 'disabled')
                }, 300);
                return
            })
        // } 
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

    static flexibleConfirmModalContent(title, content, handleFunc, modalName, btn) {
        Utils.showModalConfirm(modalName, btn)
        const showTitle = document.getElementById('title__confirm__modal')
        const showContent = document.getElementById('content__confirm__modal')
        const handle = document.getElementById('confirm__order__btn')
    
        showTitle.textContent = title
        showContent.innerHTML = content
        handle.addEventListener('click', handleFunc)
    }

    static formatDateTime() {
        const now = new Date();
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        return now.toLocaleString('vi-VN', options);
    }
}
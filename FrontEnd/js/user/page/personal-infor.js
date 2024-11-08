import Api from "../Api.js";
import Utils from "../Utils.js";

const container = document.querySelector('.personal-infor-container')

container.insertAdjacentHTML("beforeend", Utils.getFooter())

Utils.getHeader()
// Utils.protectUser()
const inputsInforForm = document.querySelectorAll("#personal-infor-form input");
const editBtnInforForm = document.querySelector("#personal-infor-form .edit");
const cancelBtnInforForm = document.querySelector("#personal-infor-form .cancel-edit");
const submitBtnInforForm = document.querySelector("#personal-infor-form .save");
const name = document.querySelector('input[name="name"]');
const phone = document.querySelector('input[name="sdt"]');
const birthday = document.querySelector('input[name="birthday"]');
const genderMale = document.querySelector('input[name="gender"][value="male"]');
const genderFemale = document.querySelector('input[name="gender"][value="female"]');
const email = document.querySelector('input[name="email"]');

name.addEventListener("input",()=>{
    name.nextElementSibling.style.opacity = 0
})
phone.addEventListener("input",()=>{
    phone.nextElementSibling.style.opacity = 0
})
birthday.addEventListener("input",()=>{
    birthday.nextElementSibling.style.opacity = 0
})
genderFemale.addEventListener("click",()=>{
    document.querySelector('.gender-radio').nextElementSibling.style.opacity = 0;
})
genderMale.addEventListener("click",()=>{
    document.querySelector('.gender-radio').nextElementSibling.style.opacity = 0;
})
email.addEventListener("input",()=>{
    email.nextElementSibling.style.opacity = 0
})

function validateForm() {
    let isValid = true;

    if (!name.value.trim()) {
        name.nextElementSibling.style.opacity = 1; 
        isValid = false;
    }

    if (!phone.value.trim()) {
        phone.nextElementSibling.textContent = "Vui lòng nhập số điện thoại!";
        phone.nextElementSibling.style.opacity = 1;  
        isValid = false;
    } else {
        const phoneValue = phone.value.trim();
        if (phoneValue.length !== 10 && phoneValue.length !== 12) {
            phone.nextElementSibling.textContent = "Số điện thoại không hợp lệ!";
            phone.nextElementSibling.style.opacity = 1;  
            isValid = false;
        } else {
            if (!phoneValue.startsWith("0") && !phoneValue.startsWith("+")) {
                phone.nextElementSibling.textContent = "Số điện thoại không hợp lệ!";
                phone.nextElementSibling.style.opacity = 1;  
                isValid = false;
            } 
        }
    }   


    if (!phone.value.trim() || phone.value.length < 10) {
        phone.nextElementSibling.style.opacity = 1;  
        isValid = false;
    }

    if (!birthday.value.trim()) {
        birthday.nextElementSibling.textContent = "Vui lòng nhập ngày sinh!"
        birthday.nextElementSibling.style.opacity = 1; 
        isValid = false;
    }
    const currentDate = new Date()
    const birthdayValue = new Date(birthday.value)
    if (birthdayValue >= currentDate) {
        birthday.nextElementSibling.textContent = "Ngày sinh không hợp lệ!"
        birthday.nextElementSibling.style.opacity = 1; 
        isValid = false;
    }

    if (!genderMale.checked && !genderFemale.checked) {
        document.querySelector('.gender-radio').nextElementSibling.style.opacity = 1;
        isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.nextElementSibling.style.opacity = 1;
        isValid = false;
    }

    if (!emailRegex.test(email.value)) {
        email.nextElementSibling.textContent = "Email không hợp lệ!"
        email.nextElementSibling.style.opacity = 1;
        isValid = false;
    }

    return isValid;
}

editBtnInforForm.addEventListener('click', (e) => {
    e.preventDefault();
    cancelBtnInforForm.style.display = "block";
    editBtnInforForm.style.display = "none";
    inputsInforForm.forEach((i) => {
        i.readOnly = false;
    });
    submitBtnInforForm.disabled = false;
});

cancelBtnInforForm.addEventListener("click", (e) => {
    e.preventDefault();
    cancelBtnInforForm.style.display = "none";
    editBtnInforForm.style.display = "block";
    inputsInforForm.forEach((i) => {
        i.readOnly = true;
    });

    document.querySelector('input[name="name"]').value = "LƯU VĂN THÀNH"; 
    document.querySelector('input[name="sdt"]').value = "";  
    document.querySelector('input[name="birthday"]').value = "";
    document.querySelector('input[name="email"]').value = "";
    document.querySelector('input[name="gender"][value="male"]').checked = false;
    document.querySelector('input[name="gender"][value="female"]').checked = false;
});

submitBtnInforForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Thông tin đã được lưu thành công!");
        inputsInforForm.forEach((i) => {
            i.readOnly = true;
        });
        cancelBtnInforForm.style.display = "none";
        editBtnInforForm.style.display = "block";
    } 
});


const newAddressContainer = document.querySelector("#modal-add-address")
const closeNewAddressBtn = document.querySelector("#modal-add-address .close")
const cancelNewAddressBtn = document.querySelector("#modal-add-address .cancel")
const openNewAddFormBtn = document.querySelector(".new-address-btn")

closeNewAddressBtn.addEventListener("click",()=>{
    Utils.closeModal(newAddressContainer)
})
cancelNewAddressBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    Utils.closeModal(newAddressContainer)
})
openNewAddFormBtn.addEventListener("click",()=>{
    Utils.openModal(newAddressContainer)
})
newAddressContainer.addEventListener("click",(e)=>{
    if(e.target === newAddressContainer){
        Utils.closeModal(newAddressContainer)
    }
})

const submitNewAddressBtn = document.querySelector("#modal-add-address .submit")
const fullName = document.querySelector("#modal-add-address .full-name")
const phoneNumber = document.querySelector("#modal-add-address .phone")
const province = document.querySelector("#modal-add-address .province")
const district = document.querySelector("#modal-add-address .district")
const ward = document.querySelector("#modal-add-address .ward")
const village = document.querySelector("#modal-add-address .village")
const detailed = document.querySelector("#modal-add-address .detailed")

const errorFullname = document.querySelector("#modal-add-address .error-fullname")
const errorPhone = document.querySelector("#modal-add-address .error-phone")
const errorProvince = document.querySelector("#modal-add-address .error-province")
const errorDictrict = document.querySelector("#modal-add-address .error-district")
const errorWard = document.querySelector("#modal-add-address .error-ward")
const errorVillage = document.querySelector("#modal-add-address .error-village")
const errorDetail = document.querySelector("#modal-add-address .error-detailed")


submitNewAddressBtn.addEventListener("click",()=>{
    if(fullName.value === ""){
        errorFullname.style.opacity = 1
    }
    if(phoneNumber.value === ""){
        errorPhone.textContent = "Vui lòng nhập số điện thoại!"
        errorPhone.style.opacity = 1
    }
    if(phoneNumber.value.length !== 10 && phoneNumber.value.length !== 12){
        errorPhone.textContent = "Số điện thoại không hợp lệ!"
        errorPhone.style.opacity = 1
    }
    if((phoneNumber.value)[0] !== "0" && (phoneNumber.value)[0] !== "+"){
        errorPhone.textContent = "Số điện thoại không hợp lệ!"
        errorPhone.style.opacity = 1
    }
    if(province.value === ""){
        errorProvince.style.opacity = 1
    }
    if(district.value === ""){
        errorDictrict.style.opacity = 1
    }
    if(ward.value === ""){
        errorWard.style.opacity = 1
    }
    if(village.value === ""){
        errorVillage.style.opacity = 1
    }
    if(detailed.value === ""){
        errorDetail.style.opacity = 1
    }
})

fullName.addEventListener("input",()=>{
    errorFullname.style.opacity = 0
})
phoneNumber.addEventListener("input",()=>{
    errorPhone.style.opacity = 0
})
province.addEventListener("input",()=>{
    errorProvince.style.opacity = 0
})
district.addEventListener("input",()=>{
    errorDictrict.style.opacity = 0
})
ward.addEventListener("input",()=>{
    errorWard.style.opacity = 0
})
village.addEventListener("input",()=>{
    errorVillage.style.opacity = 0
})
detailed.addEventListener("input",()=>{
    errorDetail.style.opacity = 0
})


const changePassModelContainer = document.querySelector("#modal-change-pass")
const openChangePassBtn = document.querySelector(".change-password")
const cancelChangePass = document.querySelector("#modal-change-pass .cancel")
const closeChangePass = document.querySelector("#modal-change-pass .close")

openChangePassBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log("open")
    Utils.openModal(changePassModelContainer)
})

cancelChangePass.addEventListener("click",()=>{
    Utils.closeModal(changePassModelContainer)
})

closeChangePass.addEventListener("click",()=>{
    Utils.closeModal(changePassModelContainer)
})

changePassModelContainer.addEventListener("click",(e)=>{
    if(e.target === changePassModelContainer){
        Utils.closeModal(changePassModelContainer)
    }
})

const currentPass = document.querySelector(".current-password")
const newPass = document.querySelector(".new-password")
const confirmPass = document.querySelector(".confirm-password")
const submitChangePass = document.querySelector("#modal-change-pass .submit")
const errorCurrentPass = document.querySelector(".error-current-pass")
const errorNewPass = document.querySelector(".error-new-pass")
const errorConfirmPass = document.querySelector(".error-confirm-pass")

submitChangePass.addEventListener("click",()=>{
    if(currentPass.value === ""){
        errorCurrentPass.textContent = "Vui lòng nhập trường này!"
        errorCurrentPass.style.opacity = 1
    }
    if(newPass.value === ""){
        errorNewPass.textContent = "Vui lòng nhập trường này!"
        errorNewPass.style.opacity = 1
    }
    if(newPass.value.length < 8){
        errorNewPass.textContent = "Mật khẩu phải từ 8 kí tự!"
        errorNewPass.style.opacity = 1
    }
    if(confirmPass.value === ""){
        errorConfirmPass.textContent = "Vui lòng nhập trường này!"
        errorConfirmPass.style.opacity = 1
    }
    if(newPass.value !== confirmPass.value){
        errorConfirmPass.textContent = "Xác nhận mật khẩu không đúng!"
        errorConfirmPass.style.opacity = 1
    }
})

currentPass.addEventListener("input",()=>{
    errorCurrentPass.style.opacity = 0
})
newPass.addEventListener("input",()=>{
    errorNewPass.style.opacity = 0
})
confirmPass.addEventListener("input",()=>{
    errorConfirmPass.style.opacity = 0
})

const spans = document.querySelectorAll('.action-address span')

spans.forEach((icon) => {
    icon.addEventListener('click', (event) => {
        const addressContainer = event.target.closest('.address-container');

        if (event.target.textContent.trim() === 'edit') {
            handleEdit(addressContainer);
        } else if (event.target.textContent.trim() === 'close') {
            handleDelete(addressContainer);
        }
    });
});

function handleEdit(addressContainer) {
    const originalName = addressContainer.querySelector('.default-name, .address-content p:first-child').textContent;
    const originalPhone = addressContainer.querySelector('.default-phone-number, .address-content p:nth-child(2)').textContent;
    const originalAddressDetail = addressContainer.querySelector('.address-detail').textContent;

    const addressParts = originalAddressDetail.split(','); 
    const province = addressParts.slice(4).join(',').trim();
    const district = addressParts[3]?.trim() || ''; 
    const ward = addressParts[2]?.trim() || ''; 
    const village = addressParts[1]?.trim() || ''; 
    const detailedAddress = addressParts[0]?.trim() || ''; 

    Utils.openModal(newAddressContainer);

    document.querySelector('.full-name').value = originalName;
    document.querySelector('.phone').value = originalPhone;
    document.querySelector('.province').value = province;
    document.querySelector('.district').value = district;
    document.querySelector('.ward').value = ward;
    document.querySelector('.village').value = village;
    document.querySelector('.detailed').value = detailedAddress;
}

function handleDelete(addressContainer) {
    if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?')) {
        addressContainer.remove();
    }
}

const fillData = (data)=>{
    name.value = data.f_name + " " + data.l_name
    phone.value = data.phone
    birthday.value = data.date_of_birth
    email.value = data.email
    if(data.gender){
        genderMale.checked = true
    }else{
        genderFemale.checked = true
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    let data = {}
    const fetchData = async ()=>{
        try {
            const response = await Api.getInforUser()
            if(response.status === 200){
                data = response.userDTO
                fillData(data)
            }
        } catch (error) {
            alert(error)
        }
    }
    fetchData()
})
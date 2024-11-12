const manageItems = document.querySelectorAll('.manage__items')
console.log(manageItems)

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
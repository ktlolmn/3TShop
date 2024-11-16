const manageItems = document.querySelectorAll('.manage__items')
console.log(manageItems)

let currentPath = ''
manageItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        if (window.location.pathname === (e.currentTarget.getAttribute('href'))) {
            return
        }
        manageItems.forEach(i => i.classList.remove('active'))
        e.currentTarget.classList.add('active')
        window.location.pathname = e.currentTarget.getAttribute('href')
    })

    item.addEventListener('mousedown', () => {
        item.classList.add('clicked')
    })
    item.addEventListener('mouseup', () => {
        item.classList.remove('clicked')
    })
})




const menuOpen = document.querySelector('.menu')
const showMenu = document.querySelector('.show_menu')
const closeMenu = document.querySelector('.close_menu')
const collecrionPage = document.querySelector('.collecrion_page')
const headImg = document.querySelector('.img1')
const secondImg = document.querySelector('.img2')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const createProductPage = document.querySelector('.create_product_page')
const createProductButton = document.querySelector('.create_product')
const addBtn = document.querySelector('.add')
const closeBtn = document.querySelector('.close')
const choose = document.querySelector('.choose')
const categorySection = document.querySelector('.category_section')
const chooseIcon = document.querySelector('.choose_icon')
const categoryes = document.querySelectorAll('.categoryes')
const chooseRemove = document.querySelector('.choose_remove')


let images = ['./img/cloth1.jpg', './img/cloth2.jpg', './img/cloth11.jpg', './img/cloth22.jpg']

document.addEventListener('click', e => {
    let start = images[0]
    let end = images[3]

    if (e.target.classList.contains('next')) {
        images.shift()
        images.push(start)
        headImg.setAttribute('src', images[1])
        secondImg.setAttribute('src', images[2])
    } else if (e.target.classList.contains('prev')) {
        images.pop()
        images.unshift(end)
        headImg.setAttribute('src', images[1])
        secondImg.setAttribute('src', images[2])
    }
})

//---------------------------------------------------------------------------

menuOpen.addEventListener('click', () => {
    showMenu.style.left = 0 + '%'
    closeMenu.style.left = 65 + 'px'

    closeMenu.addEventListener('click', () => {
        showMenu.style.left = -100 + '%'
        closeMenu.style.left = -100 + '%'
    })
})

//---------------------------------------------------------------------------

createProductButton.addEventListener('click', () => {
    createProductPage.classList.add('open_create_page')

    closeBtn.addEventListener('click', () => {
        createProductPage.classList.remove('open_create_page')
    })
})

//---------------------------------------------------------------------------

choose.addEventListener('click', () => {
    choose.classList.toggle('choose_active')
    categorySection.classList.toggle('category_section_active')
    chooseIcon.classList.toggle('choose_icon_active')
})

categoryes.forEach(item => {
    item.addEventListener('click', () => {
        choose.textContent = item.textContent
        chooseIcon.style.display = 'none'
        chooseRemove.style.display = 'block'
        choose.classList.toggle('choose_active')
        categorySection.classList.toggle('category_section_active')
    })

    chooseRemove.addEventListener('click', () => {
        choose.textContent = 'Category'
        chooseIcon.style.display = 'block'
        chooseRemove.style.display = 'none'
        chooseIcon.classList.remove('choose_icon_active')
    })
})

//---------------------------------------------------------------------------
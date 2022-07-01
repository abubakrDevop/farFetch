const cardInner = document.querySelector('.card_inner')
const choose = document.querySelector('.choose')
const categorySection = document.querySelector('.category_section')
const chooseIcon = document.querySelector('.choose_icon')
const categoryes = document.querySelectorAll('.category')
const chooseRemove = document.querySelector('.choose_remove')
const search = document.querySelector('.search')

let promise = new Promise((resolve, reject) => {
    const data = JSON.parse(localStorage.getItem('cards'))
    setCart(data)
    searchProduct(data)

    const addTo = data.map((data) => setCart(data)).join('')
    cardInner.innerHTML = addTo
    resolve()
})
promise.then(filter => {
    const cards = document.querySelectorAll('.card')
    const deleteButtons = document.querySelectorAll('.delete_button')

    categoryes.forEach(item => {
        item.addEventListener('click', () => {
            let filterClass = item.dataset['filter']
            
            cards.forEach(elem => {
                let title = elem.querySelector('.name_of_product').textContent
                elem.classList.remove('card_hide')
                
                if (title !== filterClass) {
                    elem.classList.add('card_hide')
                }

                chooseRemove.addEventListener('click', () => elem.classList.remove('card_hide'))
            })
        })
    })

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let currentTitle = btn.closest('.card').querySelector('.name_of_product').textContent
            const currentData = JSON.parse(localStorage.getItem('cards'))

            let filltered = currentData.filter(item => item.title !== currentTitle)
            localStorage.setItem('cards', JSON.stringify(filltered))
        })
    })
})
promise.catch(error => console.log(error))

function setCart({title, description, price, image_url}) {
    return `
        <div class="card">
            <div class="img_inner"><img src="${image_url}"></div>
            <h2 class="name_of_product">${title}</h2>
            <p class="other_info">${description}</p>
            <h2 class="price">${price}</h2>
            <div class="grade">
                <div class="items">
                    <input type="radio" id="item_rating" class="label_input" name="star_voted" value="5">
                    <label for="item_rating" class="label_rating"></label>
                    <input type="radio" id="item_rating" class="label_input" name="star_voted" value="4">
                    <label for="item_rating" class="label_rating"></label>
                    <input type="radio" checked id="item_rating" class="label_input" name="star_voted" value="3">
                    <label for="item_rating" class="label_rating"></label>
                    <input type="radio" id="item_rating" class="label_input" name="star_voted" value="2">
                    <label for="item_rating" class="label_rating"></label>
                    <input type="radio" id="item_rating" class="label_input" name="star_voted" value="1">
                    <label for="item_rating" class="label_rating"></label>
                </div>
            </div>
            <div class="buttons">
                <button onclick="" class="delete_button">Delete</button>
                <button class="buy_buttton">Buy Now</button>
            </div>
        </div>
    `
}

//---------------------------------------------------------------------------

function searchProduct(data) {
    search.addEventListener('input', e => {
        let value = e.target.value.toLowerCase()
        const newData = data.filter( ({title}) => {
            return title.toLowerCase().includes(value)
        })
        cardInner.innerHTML = newData.map((data) => setCart(data)).join('')
    })
}

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
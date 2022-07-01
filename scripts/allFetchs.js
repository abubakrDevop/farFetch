const add = document.querySelector('.add')
const close = document.querySelector('.close')
const title = document.querySelector('.title')
const price = document.querySelector('.price')
const search = document.querySelector('.search')
const inputs = document.querySelectorAll('.input')
const imageUrl = document.querySelector('.image_url')
const description = document.querySelector('.description')
const cardsInner = document.querySelector('.cards_innner')
const startSearch = document.querySelector('.start_search')
const postCategory = document.querySelector('.post_category')
const category = document.querySelector('.category')

window.addEventListener('DOMContentLoaded', () => {
    if (!getItem('cards')) {
        setItem('cards', [])
    }
})

function setItem (key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
}

function getItem (key) {
    return JSON.parse(localStorage.getItem(key))
}

//---------------------------------------------------------------------------

const baseURL = 'https://pbasics.pythonanywhere.com'

add.addEventListener('click', (e) => {
    e.preventDefault()

    fetch(`${baseURL}/products/create/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            price: price.value,
            image_url: imageUrl.value,
            category: category.value
        })
    }) 
    .then(response => response.json())
    .then(check => {
        callBack ()      
        
        inputs.forEach(item => {
            item.value = ''
        })
    })
    .catch(error => console.log(error))
})

//---------------------------------------------------------------------------

function callBack () {
    fetch(`${baseURL}/products/`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const addCard = data.map((data) => addCards(data)).join('')
        cardsInner.innerHTML = addCard

        searchProduct(data) 
    })
    .then(getClass => {
        const cart = document.querySelectorAll('.cart')
        const cards = document.querySelectorAll('.card')

        document.body.classList.add('loaded')

        let key = 0

        categoryes.forEach(item => {
            item.addEventListener('click', () => {
                let filterItems = item.dataset['filter']
                
                cards.forEach(elem => {
                    let title = elem.querySelector('.name_of_product').textContent
                    elem.classList.remove('card_hide')

                    if (title !== filterItems) {
                        elem.classList.add('card_hide')
                    }

                    chooseRemove.addEventListener('click', () => elem.classList.remove('card_hide'))
                })
            })
        })

        cart.forEach(item => {
            item.addEventListener('click', () => {
                let toCart = item.closest('.card')
                let nameOfProduct = item.closest('.card').querySelector('.name_of_product')
                let otherInfo = item.closest('.card').querySelector('.other_info')
                let priceOfProduct = item.closest('.card').querySelector('.price')
                let imgGet = item.closest('.card').querySelector('.imgGet')

                let localImg = imgGet.getAttribute('src')

                key++
                
                const saveItem = getItem('cards')
                setItem('cards', 
                [
                    ...saveItem, 
                    {
                        key: key,
                        title: nameOfProduct.textContent,
                        description: otherInfo.textContent,
                        price: priceOfProduct.textContent,
                        image_url: localImg,
                    }
                ])
            })
        })
    })
    .catch(error => console.log(error))

    function searchProduct(data) {
        search.addEventListener('input', e => {
            let value = e.target.value.toLowerCase()
            const newData = data.filter( ({ title }) => {
                return title.toLowerCase().includes(value)
            })
            cardsInner.innerHTML = newData.map((data) => addCards(data)).join('')
        })
    }

    function addCards({id, description, image_url, price, title}) {
        return `
            <div class="card">
                <span class="cart" id="${id}"><ion-icon name="cart-outline"></ion-icon></span>
                <div class="img_inner"><img class="imgGet" src="${image_url}"></div>
                <h2 class="name_of_product">${title}</h2>
                <p class="other_info">${description}</p>
                <h2 class="price">$${price}.00</h2>
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
                    <button id="${id}" onclick="deleteProduct(${id})" class="delete_button">Delete</button>
                    <button class="buy_buttton">Buy Now</button>
                </div>
            </div>    
        `
    }
}
callBack ()

//---------------------------------------------------------------------------

function deleteProduct(id) {
    fetch(`${baseURL}/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

//---------------------------------------------------------------------------



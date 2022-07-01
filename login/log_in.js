const signInPage = document.querySelector('.sign_inPage')
const signUpPage = document.querySelector('.sign_upPage')
const linkToIn = document.querySelector('.link_toIn')
const linkToUp = document.querySelector('.link_toUp')
const passwordError = document.querySelector('.password_error')
const emailError = document.querySelector('.email_error')
const inputsIn = document.querySelectorAll('.input_in')
const buttonIn = document.querySelector('.button_in')
const passowordIn = document.querySelector('.passoword_in')
const emailIn = document.querySelector('.email_in')
const loader = document.querySelector('.loader')

let passwordReg = /[A-Za-zA-Яа-яЁё]/g
let emailReg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g

linkToUp.addEventListener('click', () => {
    signInPage.style.top = -100 + 'vh'
    signUpPage.style.top = -100 + 'vh'
    
    linkToIn.addEventListener('click', () => {
        signInPage.style.top = 0 + 'vh'
        signUpPage.style.top = 0 + 'vh'
    })
})

//---------------------------------------------------------------------------

buttonIn.addEventListener('click', (e) => {
    e.preventDefault()
    
    addErrorForIn()

    if (emailIn.value > '' && passowordIn.value > '') {
        emailValidateIn()
    }
})

function addErrorForIn() {
    passowordIn.value === '' ? passwordError.classList.add('_error') : passwordError.classList.remove('_error') 
    emailIn.value === '' ? emailError.classList.add('_error') : emailError.classList.remove('_error')
}

function emailValidateIn() {
    if (emailIn.value.match(emailReg)) {
        emailError.classList.remove('_error')
        login(emailIn.value, passowordIn.value)

        inputsIn.forEach(item => {
            setTimeout(() => {
                item.value = ''
                ForwardToHeadPage()
            }, 1000)
        })

        loader.classList.add('loader_in')
    } else {
        emailError.classList.add('_error')
    }
}

//---------------------------------------------------------------------------

function ForwardToHeadPage() {
    loader.classList.remove('loader_in')

    setTimeout(() => {
        window.location.href = 'file:///C:/Users/User/Desktop/%D0%A3%D1%87%D0%B5%D0%B1%D0%B0/MY%20WORK/Store%20Site/headpage.html'
    }, 0)
}

//---------------------------------------------------------------------------

const baseURl = 'https://pbasics.pythonanywhere.com'

async function login(email, passoword) {
    const response = await fetch(`${baseURl}/auth​/token​/login​/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            passoword
        })
    }) 
    .then(response => response.json())
    .catch(error => console.log(error))
}

//---------------------------------------------------------------------------
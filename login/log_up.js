const nameErrorUp = document.querySelector('.name_errorUp')
const emailErrorUp = document.querySelector('.email_errorUp')
const passwordError1 = document.querySelector('.password_error1')
const passwordError2 = document.querySelector('.password_error2')
const showPassword1 = document.querySelector('.showPassword1')
const hidePassword1 = document.querySelector('.hidePassword1')
const showPassword2 = document.querySelector('.showPassword2')
const hidePassword2 = document.querySelector('.hidePassword2')
const nameUp = document.querySelector('.name_up')
const emailUp = document.querySelector('.email_up')
const passwordUp1 = document.querySelector('.password_up1')
const passwordUp2 = document.querySelector('.password_up2')
const inputsUp = document.querySelectorAll('.input_up')
const buttonUp = document.querySelector('.button_up')
const loaderUp = document.querySelector('.loader_up')

buttonUp.addEventListener('click', (e) => {
    e.preventDefault()
    
    addErrorForUp()

    if (nameUp.value > '' && emailUp.value > '' && passwordUp1.value > '' && passwordUp2.value > '') {
        if (passwordUp1.value == passwordUp2.value) {
            emailValidateForUp()
        }
    }
}) 

function addErrorForUp() {
    nameUp.value === '' ? nameErrorUp.classList.add('_error') : nameErrorUp.classList.remove('_error')
    emailUp.value === '' ? emailErrorUp.classList.add('_error') : emailErrorUp.classList.remove('_error')
    passwordUp1.value === '' ? passwordError1.classList.add('_error') : passwordError1.classList.remove('_error')
    passwordUp2.value === '' ? passwordError2.classList.add('_error') : passwordError2.classList.remove('_error')
    passwordUp1.value !== passwordUp2.value ? passwordError2.classList.add('_error') : ''
}

function emailValidateForUp() {
    if (emailUp.value.match(emailReg)) {
        emailErrorUp.classList.remove('_error')
        sendForm(emailUp.value, nameUp.value, passwordUp1.value)

        inputsUp.forEach(item => {
            setTimeout(() => {
                item.value = ''
                loaderUp.classList.remove('loader_in')
            }, 1000)
        })

        loaderUp.classList.add('loader_in')
    } else {
        emailErrorUp.classList.add('_error')
    }
}

//---------------------------------------------------------------------------

hidePassword1.addEventListener('click', () => {
    hidePassword1.style.opacity = 0
    hidePassword1.style.zIndex = 0
    showPassword1.style.opacity = 1
    showPassword1.style.zIndex = 1
    passwordUp1.setAttribute('type', 'text')

    showPassword1.addEventListener('click', () => {
        hidePassword1.style.opacity = 1
        hidePassword1.style.zIndex = 1
        showPassword1.style.opacity = 0
        showPassword1.style.zIndex = 0
        passwordUp1.setAttribute('type', 'password')
    })
})

hidePassword2.addEventListener('click', () => {
    hidePassword2.style.opacity = 0
    hidePassword2.style.zIndex = 0
    showPassword2.style.opacity = 1
    showPassword2.style.zIndex = 1
    passwordUp2.setAttribute('type', 'text')

    showPassword2.addEventListener('click', () => {
        hidePassword2.style.opacity = 1
        hidePassword2.style.zIndex = 1
        showPassword2.style.opacity = 0
        showPassword2.style.zIndex = 0
        passwordUp2.setAttribute('type', 'password')
    })
})

//---------------------------------------------------------------------------

const baseUrl = 'https://pbasics.pythonanywhere.com'

async function sendForm(email, username, password) {
    const response = await fetch(`${baseUrl}/auth/users/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email,
            username,
            password
        })
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

//---------------------------------------------------------------------------


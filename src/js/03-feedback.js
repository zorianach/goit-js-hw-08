import throttle from "lodash.throttle";

const LOCAL_DATA = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
// const formInput = document.querySelector(".feedback-form input");
// const formMessage = document.querySelector(".feedback-form textarea");


let dataForm = {};
const {email, message} = form.elements;
pageLoading();

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', submitForm)
pageLoading();



function onInputData(event) {
    dataForm = { email: email.value, message: message.value };
    localStorage.setItem(LOCAL_DATA, JSON.stringify(dataForm));
}

function pageLoading() {
    const savedValues = JSON.parse(localStorage.getItem(LOCAL_DATA));

    if (savedValues) {
        dataForm = savedValues;
        email.value = savedValues.email || '';
        message.value = savedValues.message || '';
    }
}
function submitForm (event){
    event.preventDefault();
    console.log({ email: email.value, message: message.value })

    if (email.value === '' || message.value === '') {
        return alert('Please fill in all the fields!');
      }
    
      localStorage.removeItem(LOCAL_DATA);
      event.currentTarget.reset();
      dataForm = {};
}


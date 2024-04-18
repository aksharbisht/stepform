var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var form3 = document.getElementById("form3");

var next1 = document.getElementById("next1");
var next2 = document.getElementById("next2");
var back1 = document.getElementById("back1");
var back2 = document.getElementById("back2");

const email = document.getElementById("email");
const passwordMain = document.getElementById("passwordMain");
const passwordReq = document.getElementById("passwordReq");
const linkedin = document.getElementById("linkedin");
const github = document.getElementById("github");
const facebook = document.getElementById("facebook");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phone = document.getElementById("phone");
var progress = document.getElementById("progress");
let stepCount = 0;

const formOneValidation = [true, true, true];

const selectForm = {
    0: "form1",
    1: "form2",
    2: "form3"
}

const formDataOne = {};
const formDataTwo = {};
const formDataThree = {};

const mapFormData = {
    0: formDataOne,
    1: formDataTwo,
    2: formDataThree
}

function emailHandler(inputValue) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailRegex.test(inputValue)) return false;
    return true;
}

function passwordChangeHandler(inputValue) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
    if(!regex.test(inputValue)) return false;
    return true;

}
function comparePassword(password, confirmPassword) {  
    return password === confirmPassword;
}


function nameKeyHandler(e) {
    const prev = (e.target.value).slice(-1);
    if(prev == " " && e.key == " ") e.preventDefault();
    if((e.key>="a" && e.key<="z") || (e.key>="A" && e.key<="z") || e.key=="backspace" || e.key==" ") {
        return;
    }
    else {
        e.preventDefault();
    }
}

function numberPressHandler(e) {
    if(((e.key>="0" && e.key<="9") || e.key=="Backspace")) {
    }
    else {
        e.preventDefault();
    }
}

function checkTheNextFrom() {
   const form = selectForm[stepCount];
   const allInputs = document.querySelector(`#${form}`).querySelectorAll("input");
   let errorFound = Array.from(allInputs).every((item) => item.value);
   if(!errorFound) disableButton(form);
   else enableButton(form);   
}

function showError(form, name, message) {
    const errorElement = document.querySelector(`#${form}`).querySelector(`#${name}`);
    errorElement.nextSibling.nextSibling.innerText = message;
}

function removeError(form, name) {
    const errorElement = document.querySelector(`#${form}`).querySelector(`#${name}`);
    errorElement.nextSibling.nextSibling.innerText = "";
}



function isFormValid() {
    const formData = mapFormData[stepCount];
    let errorFound = false;
    
    Object.keys(formData).forEach((item, index) => {
        const value = formData[item];
        const name = item;

        if(name === "email" && !emailHandler(value)) {
            errorFound = true;
            showError(selectForm[stepCount], name, "Not a valid email");
        } else if(name === "password" && !passwordChangeHandler(value)) {
            errorFound = true;
            showError(selectForm[stepCount], name, "password must contain 8 characters with 1 uppercase , 1 special character , 1 number")
        } else if(name === "passwordreq" && !comparePassword(formData["password"], value)){
            errorFound = true;
            showError(selectForm[stepCount], name, "password does not match..!");
        } else {

        }
        
    });
    console.log(errorFound);
    return errorFound;
}

function changeStep(buttonType, form) {
    console.log("running....");

    if(isFormValid()) return;

    const allForms = document.querySelectorAll(".block");

    if(buttonType === "next") {
        allForms[stepCount].style.display = "none";
        stepCount++;
        allForms[stepCount].style.display = "block";
        if(stepCount === 2) progress.style.width = "360px";
        else progress.style.width = "240px";

    } else {
        if(stepCount === 2) progress.style.width = "240px";
        else progress.style.width = "120px";
        allForms[stepCount].style.display = "none";
        stepCount--;
        allForms[stepCount].style.display = "block";
    }
    checkTheNextFrom(); // check if the form is empty or not:
}

function disableButton(form) {
    const formButton = document.querySelector(`#${form}`).querySelector(".nextBtn");
    formButton.style.backgroundColor = "gray";
    formButton.style.cursor = "not-allowed"
    formButton.style.color = "white"
    formButton.disabled = true;
}

function enableButton(form) {
    const formButton = document.querySelector(`#${form}`).querySelector(".nextBtn");
    formButton.style.backgroundColor = "orange";
    formButton.style.cursor = "pointer"
    formButton.style.color = "white"
    formButton.disabled = false;
}

function handleFormChange(e, formNumber) {
    const selectedForm = selectForm[formNumber];
    const allInputs = document.querySelector(`#${selectedForm}`).querySelectorAll("input");
    const formButton = document.getElementById(selectedForm).querySelector(".nextBtn");

    let errorFound = Array.from(allInputs).every((item) => {
        mapFormData[stepCount][item.name] = item.value;
        return item.value
    });
    if(!errorFound) disableButton(selectedForm);
    else enableButton(selectedForm)
}

function handleChange(e, name) {
   removeError(selectForm[stepCount], name);
}

function saveData(e) {
    e.preventDefault();
    const data = {
        ...formDataOne,
        ...formDataTwo,
        ...formDataThree
    }
    console.log(data);
    localStorage.setItem("formData", JSON.stringify(data));

    setTimeout(() => {
        location.href = "display.html";
    }, 2000);
}


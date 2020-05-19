let rangeRed = document.querySelector("#rangeRed");
let textRed = document.querySelector('#textRed');
let rangeGreen = document.querySelector('#rangeGreen');
let textGreen = document.querySelector('#textGreen');
let rangeBlue = document.querySelector('#rangeBlue');
let textBlue = document.querySelector('#textBlue');
let justColor = document.querySelector('.justColor');

addEventListener('load', ()=> {
    textRed.value = rangeRed.value
    textGreen.value = rangeGreen.value
    textBlue.value = rangeBlue.value
});

function changeColor() {
    justColor.style.backgroundColor = `rgb(${textRed.value} ,  ${textGreen.value} , ${textBlue.value})`;
}


function changeRageRed() {
    textRed.value = rangeRed.value
    changeColor();
}

function changeGreen() {
    textGreen.value = rangeGreen.value
    changeColor();
}

function changeBlue() {
    textBlue.value = rangeBlue.value
    changeColor();
}
let rangeRed = document.querySelector("#rangeRed");
let textRed = document.querySelector('#textRed');
let rangeGreen = document.querySelector('#rangeGreen');
let textGreen = document.querySelector('#textGreen');
let rangeBlue = document.querySelector('#rangeBlue');
let textBlue = document.querySelector('#textBlue');
let justColor = document.querySelector('#justColor');

function changeColor() {
    justColor.style.backgroundColor = `rgb(${rangeRed.value} ,  ${rangeGreen.value} , ${rangeBlue.value})`;
}

rangeRed.addEventListener('input', () => {
    textRed.value = rangeRed.value
    changeColor();
});

rangeGreen.addEventListener('input', () => {
    textGreen.value = rangeGreen.value
    changeColor();
});

rangeBlue.addEventListener('input', () => {
    textBlue.value = rangeBlue.value
    changeColor();
});
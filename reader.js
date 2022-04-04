const textArea = document.querySelector(".textarea");
const btnStart = document.querySelector(".start");
const btnCancel = document.querySelector(".cancel");
const btnPause = document.querySelector(".pause");
const btnBack = document.querySelector(".back");
const btnContinue = document.querySelector(".continue");
const btnReread = document.querySelector(".reread");
const wrapper = document.querySelector(".wrapper");
const wrapperReader = document.querySelector(".wrapper-reader");
const divWord = document.querySelector(".word");
const showSpeed = document.querySelector("#showSpeed");
const speed = document.querySelector("#slider");
let timerId;
let wordDisplaySpeed = 100;
let indexOfCurrentWord = 0;

btnStart.addEventListener("click", onStartClick);
btnCancel.addEventListener("click", onCancelClick);
btnPause.addEventListener("click", onPauseClick);
btnContinue.addEventListener("click", onContinueClick);
btnReread.addEventListener("click", onRereadClick);
btnBack.addEventListener("click", onBackClick);
speed.addEventListener("change", onSpeedChange);

function onStartClick(e) {
    const text = textArea.value.trim();
    if (!text) {
        return;
    }

    localStorage.setItem("textForFastreader", text);
    wrapper.classList.add("hidden");
    wrapperReader.classList.remove("hidden");
    wrapperReader.classList.add("visible");
    readWholeText();
}

function onCancelClick(e) {
    textArea.value = "";
    const savedText = localStorage.getItem("textForFastreader");

    if (Object.keys(savedText).length) {
        localStorage.removeItem("textForFastreader");
    }
    localStorage.removeItem("index");
}

function onPauseClick() {
    clearInterval(timerId);
    btnPause.classList.add("hidden");
    btnContinue.classList.remove("hidden");
}

function onContinueClick() {
    showPauseButton();
    readWholeText();
}

function onBackClick() {
    clearInterval(timerId);
    showPauseButton();
    wrapperReader.classList.remove("visible");
    wrapperReader.classList.add("hidden");
    wrapper.classList.remove("hidden");
}

function onRereadClick() {
    clearInterval(timerId);
    showPauseButton();
    localStorage.removeItem("index");
    readWholeText();
}

function onSpeedChange() {
    if (btnPause.classList.contains("hidden")) {
        return;
    }
    showSpeed.innerHTML = speed.value;
    wordDisplaySpeed = speed.value;
    changeInterval();
}
function conversion(wordInMinute) {
    const interval = 60000 / wordInMinute;
    console.log(interval);
    return interval;
}

function readWholeText() {
    const savedText = localStorage.getItem("textForFastreader");
    const arrOfText = savedText.split(" ");
    showWord(arrOfText);
}

function changeInterval() {
    clearInterval(timerId);
    readWholeText();
}

function showWord(arrOfText) {
    showSpeed.innerHTML = wordDisplaySpeed;

    timerId = setInterval(function () {
        if (indexOfCurrentWord > arrOfText.length - 1) {
            return;
        }

        let current = arrOfText[indexOfCurrentWord];
        if (arrOfText.indexOf(current) === arrOfText[length - 1]) {
            clearInterval(timerId);
        }

        divWord.innerHTML = current;

        indexOfCurrentWord++;
    }, conversion(speed.value));
}

function showPauseButton() {
    btnPause.classList.remove("hidden");
    btnContinue.classList.add("hidden");
}

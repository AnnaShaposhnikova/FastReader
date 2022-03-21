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
let timerId;

btnStart.addEventListener("click", onStartClick);
btnCancel.addEventListener("click", onCancelClick);
btnPause.addEventListener("click", onPauseClick);
btnContinue.addEventListener("click", onContinueClick);
btnReread.addEventListener("click", onRereadClick);
btnBack.addEventListener("click", onBackClick);

function onStartClick(e) {
    const text = textArea.value;
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
    const savedText = localStorage.getItem("textForFastreader" || {});

    if (Object.keys(savedText).length) {
        localStorage.removeItem("textForFastreader");
    }
     localStorage.removeItem("index");
}

function onPauseClick() {
    const currentWord = divWord.innerHTML;
    const savedText = localStorage.getItem("textForFastreader");
    const index = savedText.indexOf(currentWord);
    localStorage.setItem("index", index);
    clearInterval(timerId);
    btnPause.classList.add("hidden");
    btnContinue.classList.remove("hidden");
}

function onContinueClick() {
   showPauseButton();
    const index = localStorage.getItem("index" || {});
    const text = localStorage.getItem("textForFastreader");

    if (!Object.keys("index").length) {
        return;
    }
    const textToContinue = text.slice(index);
    const arrOfTextToContinue = textToContinue.split(" ");
    showWord(arrOfTextToContinue);
    localStorage.removeItem("index");
}

function onBackClick() {
    showPauseButton();
    wrapperReader.classList.remove("visible");
    wrapperReader.classList.add("hidden");
    wrapper.classList.remove("hidden");
}

function onRereadClick() {
    showPauseButton();
    localStorage.removeItem("index");
   readWholeText();

}

function readWholeText(){
     const savedText = localStorage.getItem("textForFastreader");
     const arrOfText = savedText.split(" ");
     showWord(arrOfText);
}

function showWord(arrOfText) {
    let i = 0;
    timerId = setInterval(function () {
        if (i > arrOfText.length - 1) {
            return;
        }

        let current = arrOfText[i];
        if (arrOfText.indexOf(current) === arrOfText[length - 1]) {
            clearInterval(timerId);
        }

        divWord.innerHTML = current;

        i++;
    }, 250);
}

function showPauseButton(){
     btnPause.classList.remove("hidden");
     btnContinue.classList.add("hidden");
}

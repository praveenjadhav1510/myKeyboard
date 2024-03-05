let originalText;
let charactersTyped;
let startTime;
let endTime;
let timerInterval;
function initialize() {
    document.getElementById('paragraph-select').selectedIndex = 0;
    loadSelectedParagraph();
    charactersTyped = [];
}
function resetTimer() {
    stopTimer();
    document.getElementById('timer').innerText = 'Timer: 0:00.00';
    document.getElementById('typing-input').value = '';
    startTime = null;
    document.getElementById('results').innerText = 'Accuracy: 00.00%';
}
function loadSelectedParagraph() {
    resetTimer();
    const select = document.getElementById('paragraph-select');
    const selectedParagraph = select.options[select.selectedIndex].value;
    document.getElementById('custom-text').value = '';
    document.getElementById('original-paragraph').innerText = selectedParagraph;
    originalText = selectedParagraph;
    charactersTyped = [];
    updateOriginalText();
}
function loadCustomText() {
    resetTimer();
    const customText = document.getElementById('custom-text').value.trim();
    document.getElementById('paragraph-select').selectedIndex = 0;
    document.getElementById('original-paragraph').innerText = customText;
    originalText = customText;
    charactersTyped = [];
    updateOriginalText();
}
function updateOriginalText() {
    const originalParagraph = document.getElementById('original-paragraph');
    originalParagraph.innerHTML = '';
    originalText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        if (charactersTyped[index] === char) {
            span.classList.add('correct');
        } else if (charactersTyped[index]) {
            span.classList.add('incorrect');
        }
        originalParagraph.appendChild(span);
    });
}
function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 10);
}
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    document.getElementById('timer').innerText = `Timer: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}.${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
}
function stopTimer() {
    clearInterval(timerInterval);
}
function checkAccuracy() {
    if (!startTime) {
        startTimer();
    }
    const userInput = document.getElementById('typing-input').value.trim();
    let correctCharacters = 0;
    for (let i = 0; i < originalText.length; i++) {
        if (userInput[i] && userInput[i] === originalText[i]) {
            correctCharacters++;
        }
    }
    const accuracy = ((correctCharacters / originalText.length) * 100).toFixed(2);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `Accuracy: ${accuracy}%`;
    charactersTyped = userInput;
    updateOriginalText();
    if (userInput.length === originalText.length) {
        stopTimer();
    }
}
function submitText() {
    stopTimer();
    const userInput = document.getElementById('typing-input').value.trim();
    alert('Submitted text: ' + userInput);
}
window.onload = initialize;

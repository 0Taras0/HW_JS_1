function generateTest() {
    let countInput = document.getElementById('questionCount');
    let count = parseInt(countInput.value);

    if (isNaN(count) || count < 1) {
        countInput.value = 1;
        return;
    }

    let container = document.getElementById('testContainer');
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
        let num1 = generateRandomNumber(1, 10);
        let num2 = generateRandomNumber(1, 10);
        let question = document.createElement('div');
        question.classList.add('mb-4');
        question.innerHTML = `<label class="block text-lg font-medium text-white">${num1} × ${num2} = ?</label>
                              <input type="number" class="w-full mt-2 p-2 border rounded-lg" data-answer="${num1 * num2}" required>`;
        container.appendChild(question);
    }

    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('resetBtn').classList.remove('hidden');
    document.getElementById('questionsLabel').classList.add('hidden');
    document.getElementById('questionCount').classList.add('hidden');
    document.getElementById('generateTestButton').classList.add('hidden');
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function resetTest(event) {
    event.preventDefault();

    let container = document.getElementById('testContainer');
    container.innerHTML = '';

    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('resetBtn').classList.add('hidden');
    document.getElementById('result').innerText = '';

    document.getElementById('questionsLabel').classList.remove('hidden');
    document.getElementById('questionCount').classList.remove('hidden');
    document.getElementById('generateTestButton').classList.remove('hidden');

    document.getElementById('questionCount').value = '';
    document.getElementById('submitBtn').disabled = false;
}
function checkAnswers(event) {
    event.preventDefault();
    let inputs = document.querySelectorAll('#testContainer input');
    let correct = 0;
    let total = inputs.length;

    inputs.forEach(input => {
        if (parseInt(input.value) === parseInt(input.dataset.answer)) {
            correct++;
        }
        input.disabled = true;
        document.getElementById('submitBtn').disabled = true;
    });

    let score = (correct / total) * 100;
    document.getElementById('result').innerText = `Ваш результат: ${correct} з ${total}. Оцінка: ${score.toFixed(2)}%`;

    if (score.toFixed(2) == 0) {
        document.getElementById('result').style.color = 'red';
        document.getElementById('result').innerText += '\nАле ти дурне :)))';
    }
    else if (score.toFixed(2) < 50) {
        document.getElementById('result').style.color = 'yellow';
        document.getElementById('result').innerText += '\nЄ куди стремитися!';
    }
    else if (score.toFixed(2) == 100) {
        document.getElementById('result').style.color = 'green';
        document.getElementById('result').innerText += '\nЩо дуже розумний, чи як?';
    }
    else {
        document.getElementById('result').style.color = 'white';
    }
}
(function () {
    const ANSWER_INPUT_SELECTOR = 'textarea[data-test="challenge-translate-input"]';
    let answerInput = null;
    let isNormalizing = false;

    function normalizeAnswerValue() {
        if (isNormalizing || !answerInput || !answerInput.value) {
            return;
        }

        const answer = String(answerInput.value);

        if (answer.trim() !== '') {
            const normalizedAnswer = answer.normalize();

            if (answer !== normalizedAnswer) {
                isNormalizing = true;
                answerInput.value = normalizedAnswer;
                answerInput.dispatchEvent(new Event('change'));
                answerInput.dispatchEvent(new Event('blur'));
                isNormalizing = false;
            }
        }
    }

    window.setInterval(function () {
        let newAnswerInput = document.querySelector(ANSWER_INPUT_SELECTOR);

        if (newAnswerInput && (newAnswerInput !== answerInput)) {
            answerInput = newAnswerInput;

            answerInput.addEventListener('blur', function () {
                normalizeAnswerValue();
            });

            answerInput.addEventListener('keydown', function(e) {
                if (13 === e.keyCode) {
                    normalizeAnswerValue();
                }
            });
        }
    }, 100);
})();

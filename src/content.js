(function () {
    const WORD_ANSWER_INPUT_SELECTOR = 'input[data-test="challenge-text-input"]';
    const FULL_ANSWER_INPUT_SELECTOR = 'textarea[data-test="challenge-translate-input"]';
    let answerInput = null;
    let isNormalizing = false;

    function normalizeAnswerValue(dispatchChange) {
        if (isNormalizing || !answerInput || !answerInput.value) {
            return;
        }

        const answer = String(answerInput.value);

        if (answer.trim() !== '') {
            const normalizedAnswer = answer.normalize();

            if (answer !== normalizedAnswer) {
                isNormalizing = true;
                answerInput.value = normalizedAnswer;

                if (dispatchChange) {
                    answerInput.dispatchEvent(new Event('change'));
                    answerInput.dispatchEvent(new Event('blur'));
                }

                isNormalizing = false;
            }
        }
    }

    window.setInterval(function () {
        const newAnswerInput = document.querySelector(WORD_ANSWER_INPUT_SELECTOR)
                            || document.querySelector(FULL_ANSWER_INPUT_SELECTOR);

        if (newAnswerInput && (newAnswerInput !== answerInput)) {
            answerInput = newAnswerInput;

            answerInput.addEventListener('blur', function () {
                normalizeAnswerValue(true);
            });

            answerInput.addEventListener('input', function () {
                normalizeAnswerValue(false);
            });

            answerInput.addEventListener('keydown', function(e) {
                if (13 === e.keyCode) {
                    normalizeAnswerValue(true);
                }
            });
        }
    }, 100);
})();

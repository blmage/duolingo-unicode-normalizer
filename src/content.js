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

                if ((document.activeElement === answerInput)
                    && (answerInput.selectionStart === answerInput.selectionEnd)
                ) {
                    // The answer input is focused, the cursor will be positioned at the end of the text upon changing
                    // the value: normalize the answer and reposition the cursor at its previous spot.
                    let selectionStart = answerInput.selectionStart;
                    const behindText = answer.substring(0, selectionStart);
                    selectionStart -= behindText.length - behindText.normalize().length;
                    answerInput.value = normalizedAnswer;
                    answerInput.selectionStart = selectionStart;
                    answerInput.selectionEnd = selectionStart;
                } else {
                    // Disregard the case where there is a non-empty selection, as it does not seem that it can happen
                    // with the events we currently listen to (the selection actually gets reset on user input).
                    answerInput.value = normalizedAnswer;
                }

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

document.addEventListener('DOMContentLoaded', function () {
    let options = {};

    function updateOptionValue(name, value) {
        options[name] = value;
        chrome.storage.sync.set({ options });
    }

    function isCheckboxInput(input) {
        return (input.type || '').toLowerCase() === 'checkbox';
    }

    chrome.storage.sync.get('options', function (items) {
        options = Object(items.options || {});

        ALL_OPTIONS.forEach(function (optionName) {
            const input = document.getElementById(optionName);

            if (input) {
                if (isCheckboxInput(input)) {
                    input.checked = !!(options[optionName] || false);
                }
            }
        });
    });

    ALL_OPTIONS.forEach(function (optionName) {
        const input = document.getElementById(optionName);

        if (input) {
            input.addEventListener('change', function () {
                if (isCheckboxInput(input)) {
                    updateOptionValue(optionName, !!input.checked);
                }
            });
        }
    });
});

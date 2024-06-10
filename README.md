<h1>
  <img align="center" width="48" height="48" src="https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/master/icons/icon_48.png" />
  Duolingo Unicode Normalizer
</h1>

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/faikjkggoclbeabkigadengajchidand)](https://chrome.google.com/webstore/detail/duolingo-unicode-normaliz/faikjkggoclbeabkigadengajchidand)
[![Mozilla Add-on](https://img.shields.io/amo/v/duolingo-unicode-normalizer)](https://addons.mozilla.org/firefox/addon/duolingo-unicode-normalizer/)

A minimal browser extension for **removing the typo warnings related to diacritics** on
[Duolingo](https://www.duolingo.com), and **fixing the dictionary searches** containing *decomposed characters*.

## Download

* [**Chrome** extension](https://chrome.google.com/webstore/detail/duolingo-unicode-normaliz/faikjkggoclbeabkigadengajchidand)
* [**Firefox** add-on](https://addons.mozilla.org/firefox/addon/duolingo-unicode-normalizer/)

## Description

### The problem(s)

Typos are detected in seemingly perfectly valid answers:

![you_have_a_typo](https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/assets/screenshots/correct_answer_before.png)

Searches for existing words (with accented characters) do not return any result:

![no_word_found](https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/assets/screenshots/word_search_before.png)

### The cause

[Duolingo](https://www.duolingo.com) expects answers and dictionary searches to be __NFC-normalized__ strings
(see the [Unicode Normalization FAQ](https://unicode.org/faq/normalization.html)).

But, depending on the input method, those values may contain __decomposed characters__,
making them __internally different__ from their normalized versions.

For example, the Vietnamese word _một_ (_one_) can be written in (at least)
__3 different ways__:

| Version     | Value | Escaped value   |
| ------------| ----- |---------------- |
| NFC         | một   | m [\u1ED9](https://symbl.cc/en/1ED9/) t |
| VN keyboard | một   | m [\u00F4](https://symbl.cc/en/00F4/) [\u0323](https://symbl.cc/en/0323/) t |
| NFD         | một   | mo [\u0323](https://symbl.cc/en/0323/) [\u0302](https://symbl.cc/en/0302/) t |

### The solution

Normalize the relevant values before they are handled.

The extension lets you choose in the options screen whether to normalize values after each key stroke,
or after a more meaningful change. **Both options have their pros and cons**:

![options_popup](https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/assets/screenshots/options_popup.png)


### The result

![you_are_correct](https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/assets/screenshots/correct_answer_after.png)

![translations_found](https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/assets/screenshots/word_search_after.png)

### What if I still encounter some weird typos, or if my search does not work?

Don't hesitate to [post an issue](https://github.com/blmage/duolingo-unicode-normalizer/issues/new),
including as much details as possible, so that I can try to reproduce it!

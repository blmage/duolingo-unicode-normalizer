<h1>
  <img align="center" width="48" height="48" src="https://raw.githubusercontent.com/blmage/duolingo-unicode-normalizer/master/icons/icon_48.png" />
  Duolingo Unicode Normalizer
</h1>

A minimal browser extension for automatically normalizing inputs on Duolingo.

## Download

* [**Chrome** extension](https://chrome.google.com/webstore/detail/duolingo-unicode-normaliz/faikjkggoclbeabkigadengajchidand)
* [**Firefox** add-on](https://addons.mozilla.org/firefox/addon/duolingo-unicode-normalizer/)

## Description

### The problem(s)

Typos are detected in seemingly perfectly valid answers:

![you_have_a_typo](https://user-images.githubusercontent.com/25432517/60756496-39199c00-9ffe-11e9-817c-cbd3dd337ac3.png)

Searches for existing words (with accented characters) do not return any result:

![no_word_found](https://user-images.githubusercontent.com/25432517/60760068-5a46b080-a02f-11e9-81a3-3901721b481d.png)

### The cause

Duolingo expects answers and dictionary searches to be __NFC-normalized__ strings
(see the [Unicode Normalization FAQ](https://unicode.org/faq/normalization.html)).

But, depending on the input method, those values may contain __decomposed characters__,
making them __internally different__ from their normalized versions.

For example, the Vietnamese word _một_ (_one_) can be written in (at least)
__3 different ways__:

| Version     | Value | Escaped value   |
| ------------| ----- |---------------- |
| NFC         | một   | m [\u1ED9](https://unicode-table.com/en/1ED9/) t |
| VN keyboard | một   | m [\u00F4](https://unicode-table.com/en/00F4/) [\u0323](https://unicode-table.com/en/0323/) t |
| NFD         | một   | mo [\u0323](https://unicode-table.com/en/0323/) [\u0302](https://unicode-table.com/en/0302/) t |

### The solution

Normalize relevant inputs before they are handled by Duolingo!

![you_are_correct](https://user-images.githubusercontent.com/25432517/60757095-8d287e80-a006-11e9-981c-5ec363575b8b.png)

![translations_found](https://user-images.githubusercontent.com/25432517/60760069-5b77dd80-a02f-11e9-9fd3-a328aebf6abc.png)

### What if I still encounter some weird typos, or if my search does not work?

Please do not hesitate to
[post an issue](https://github.com/blmage/duolingo-unicode-normalizer/issues/new),
including as much details as possible so that I can have a try at reproducing it!

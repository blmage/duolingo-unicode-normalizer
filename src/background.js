const DICTIONARY_HOSTS = [ 'duolingo-lexicon-prod.duolingo.com' ];
const QUERY_PARAMETER = 'query';

// Temporary fix for https://bugzilla.mozilla.org/show_bug.cgi?id=1450965#c33.
// TODO remove this work-around as soon as FF69 is available on the stable channel.
const requestEvent = !chrome.extension.getURL('/').startsWith('moz')
    ? chrome.webRequest.onBeforeRequest
    : chrome.webRequest.onHeadersReceived;

requestEvent.addListener(
    function (details) {
        if (details.method.toLowerCase() === 'options') {
            // Ignore pre-flight requests.
            return;
        }

        if (details.type.toLowerCase() === 'xmlhttprequest') {
            const url = new URL(details.url.trim());

            if (url.searchParams.has(QUERY_PARAMETER)
                && (DICTIONARY_HOSTS.indexOf(url.host) !== -1)
            ) {
                const query = String(url.searchParams.get(QUERY_PARAMETER));

                if (query.trim() !== '') {
                    const normalizedQuery = query.normalize();

                    if (query !== normalizedQuery) {
                        url.searchParams.set(QUERY_PARAMETER, normalizedQuery);
                        return { redirectUrl: url.toString() };
                    }
                }
            }
        }

        return {};
    },
    { urls: [ '<all_urls>' ] },
    [ 'blocking' ]
);

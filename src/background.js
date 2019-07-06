const DICTIONARY_HOSTS = [ 'duolingo-lexicon-prod.duolingo.com' ];
const QUERY_PARAMETER = 'query';

chrome.webRequest.onBeforeRequest.addListener(
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
    [ 'blocking', 'requestBody' ]
);

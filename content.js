let previewCount = null;
let lastUrl = null;
let interval;

let redirect = [];
let keywords = [];
let embeds = [];

/**
 * Scans DOM elments from the selectors array for
 * provided keywords.
 * @param selectors array
 * @param keywords array
 */
function antiBonk(selectors, keywords) {
    selectors.forEach(element => {
        const text = element.innerText;
        keywords.every(keyword => {
            if (text.toLowerCase().includes(keyword)) {
                element.parentNode.innerHTML = getRandom(embeds);
                return false;
            }
            return true;
        });
    });
}

/**
 * Scans the url for keywords and redirects the user
 * on a match.
 * @param url string
 */
function runBoyRun(url) {
    url = url.split('/').reverse()[0];
    if (
        !redirect ||
        !Array.isArray(redirect.channelNames) ||
        !Array.isArray(redirect.targets)
    ) {
        console.log('NOTHING TO RUN FROM');
        return;
    }
    redirect.channelNames.every(keyword => {
        if (url.toLowerCase().includes(keyword)) {
            window.location.href = getRandom(redirect.targets);
            return false;
        }
        return true;
    });
}

/**
 * Get random element from array.
 */
function getRandom(list) {
    return list[Math.floor((Math.random()*list.length))];
}

/**
 * Scans known DOM elements which contain channel previews.
 */
function scanForBonks() {
    const url = window.location.href;
    let selectors = ['.shelf-element__impression-wrapper', '.tw-flex.tw-flex-column.tw-mg-0 .tw-hover-accent-effect .tw-aspect', '.tw-flex.tw-flex-column.tw-mg-0'];
    selectors = selectors.map(s => [...document.querySelectorAll(s)]).flat(2);

    if (
        previewCount === null ||
        (previewCount != selectors.length) ||
        lastUrl === null ||
        (lastUrl != url)
    ) {
        runBoyRun(url);
        antiBonk(selectors, keywords);
    }
    previewCount = selectors.length;
}

function loadListsFromStorage() {
    chrome.storage.sync.get("filterLists", (data) => {
        console.log('store filterLists', data);
        let lists = data.filterLists;

        if (!lists || lists.length == 0) {
            lists = [
                {
                    "name": "defaults",
                    "author": "anon",
                    "url": "https://raw.githubusercontent.com/jgerstbe/nbttv/filterlists/assets/default.json",
                    "keywords": [
                      "stretch",
                      "hot tub",
                      "hottub",
                      "jacuzzi",
                      "yoga",
                      "pool",
                      "redirect"
                    ],
                    "embeds": ["<img src='https://dummyimage.com/600x400/0e0e10/a970ff&text=+NBTTV+'>"],
                    "timestamp": 1619274807917
                }
            ];
        }

        lists.forEach((list, index) => {
            // TODO save lists in storage & load from storage
            fetch(list.url)
                .then((r) => r.json())
                .then(e => {
                    console.log(e);
                    keywords = [...keywords, ...e.keywods];
                    embeds = [...embeds, ...e.embeds];
                    console.log(keywords, embeds)
                    if (index === (lists.length-1)) {
                        // TODO remove duplicates from keywords
                        setTimeout(burst, 500);
                        interval = setInterval(scanForBonks, 5000);
                    }
                })
        });
    });
}

/**
 * Run three scans in quick succession.
 */
function burst() {
    setTimeout(scanForBonks, 500);
    setTimeout(scanForBonks, 1000);
    setTimeout(scanForBonks, 1500);
}

window.onload = function() {
    loadListsFromStorage();
}

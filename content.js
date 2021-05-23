let previewCount = null;
let lastUrl = null;
let interval;

let redirect = {
    channelNames: [],
    targets: []
};
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
            if (text.toLowerCase().includes(keyword.toLowerCase())) {
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
    let selectors = ['.shelf-element__impression-wrapper', '.tw-flex.tw-flex-column.tw-mg-0 .tw-hover-accent-effect .tw-aspect', '.tw-flex.tw-flex-column.tw-mg-0', '.sc-AxjAm.dBWNsP'];
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
        let lists = data.filterLists;

        if (lists && lists.length > 0) {
            lists.forEach((list, index) => {
                fetch(list.url)
                    .then((r) => r.json())
                    .then(e => {
                        lists[index] = e;
                        keywords = [...keywords, ...e.keywords];
                        embeds = [...embeds, ...e.embeds];
                        redirect.channelNames = [...redirect.channelNames, ...e.redirect.channelNames]; 
                        redirect.targets = [...redirect.targets, ...e.redirect.targets]; 
                        if (index === (lists.length-1)) {
                            // save lists in storage
                            chrome.storage.sync.set({'filterLists': lists});
                            // remove duplicates from keywords
                            keywords = [...new Set(keywords)];
                            // start scan
                            setTimeout(burst, 500);
                            interval = setInterval(scanForBonks, 5000);
                        }
                        // load localList
                        if ((index+1) == lists.length) {
                            loadLocalListFromStorage();
                        }
                    })
            });
        } else {
            loadLocalListFromStorage();
            // start scan
            setTimeout(burst, 500);
            interval = setInterval(scanForBonks, 5000);
        }
    });
}

function loadLocalListFromStorage() {
    chrome.storage.sync.get("localList", (data) => {
        let list = data.localList;
        if (Array.isArray(list) && list[0]) {
            keywords = [...keywords, ...(list[0].keywords)];
            if (!embeds || (embeds.length === 0)) {
                embeds = [''];
            }
        }
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

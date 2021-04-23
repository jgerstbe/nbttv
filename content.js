let keywords = [
    'stretch',
    'hot tub',
    'hottub',
    'jacuzzi',
    'yoga',
    'pool',
];

let embeds = [
    `<img src="https://dummyimage.com/600x400/0e0e10/a970ff&text=+NBTTV+">`,
];

let redirect = {
    channelNames: ['twitch'],
    targets: ['https://www.twitch.tv/p/en/legal/community-guidelines/']
};


let previewCount = null;
let lastUrl = null;

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

/**
 * Run three scans in quick succession.
 */
function burst() {
    setTimeout(scanForBonks, 500);
    setTimeout(scanForBonks, 1000);
    setTimeout(scanForBonks, 1500);
}

window.onload = function() {
    setTimeout(burst, 500);
    setInterval(scanForBonks, 5000);
}

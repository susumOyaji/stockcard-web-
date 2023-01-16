const request = require('request')
const {
    JSDOM
} = require('jsdom')

request('https://finance.yahoo.co.jp/quote/%5EDJI', (e, response, body) => {
    if (e) {
        console.error(e)
    }

    try {
        const dom = new JSDOM(body)
        //console.log(body);
        let elements = dom.window.document.getElementsByTagName('a');
        console.log(elements);
        const latestDate = dom.window.document.querySelector('a')
        console.log(latestDate)
            .children[0].firstChild.textContent.trim()
        //console.log(dom.window.document.documentElement.innerHTML);
        console.log(`最新の新着情報の日付は${latestDate}です。`)
    } catch (e) {
        console.error(e)
    }
})
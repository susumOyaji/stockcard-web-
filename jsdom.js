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
        //タグ名を指定して要素ノードを取得
        //要素のタグ名を指定して一致する要素ノードをすべて取得します。
        let elements = dom.window.document.getElementsByTagName('a');
        // 取得した要素の数を取得
        let len = elements.length;
        console.log(len);

        // インデックスを指定して要素を取得
        element = elements.item(0);
        console.log(element);
        // 次の形式でもインデックスを指定して要素を取得
        element = elements[0];

        // ID属性またはname属性を指定して要素を取得
        element = elements.item('user');
        //console.log(elements);
        const latestDate = dom.window.document.querySelector('a')
        //console.log(latestDate)
        //.children[0].firstChild.textContent.trim()
        //console.log(dom.window.document.documentElement.innerHTML);
        console.log(`最新の新着情報の日付は${latestDate}です。`)
        //var elem = document.getElementById("output");
        //elem.innerText = xmlhttp.responseText;
    } catch (e) {
        console.error(e)
    }
})
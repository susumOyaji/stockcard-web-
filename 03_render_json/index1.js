// expressモジュールを読み込む
const express = require('express');
const request = require('request');



var stockdata = {};
var price;
var reshio;
var percent;

//let stdData = {};
var DJI = {};
var NIKEI = {};
var stockdatas = {};
arr = [];

// expressアプリを生成する
const app = express();

// webフォルダの中身を公開する
app.use(express.static('./03_render_json/web'));


const {
    JSDOM
} = require('jsdom')

var options_dji = {
    url: 'https://finance.yahoo.co.jp/quote/%5EDJI',
    method: 'GET',
    json: true
}

var options_nk = {
    url: 'https://finance.yahoo.co.jp/quote/998407.O',
    method: 'GET',
    json: true
}



const asyncWrapper = fn => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    }
};




// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {


    //request()にオプションを指定してコールバック関数の「body」を出力することで
    //UrlのHTMLを出力しているわけです。
    //コールバック関数の「body」に取得したJSONデータが格納されています。
     request(options_dji, (error, response, body) => {
        if (error) {
            console.error(error)
        }

        const dom = new JSDOM(body)
        var foo01 = dom.window.document.getElementsByTagName('span');

        /*
        for (var i = 0; i <= 30; i++) {
            console.log(i);
            console.log(foo01[i].textContent);
            
        }
        */

        price = foo01[19].textContent;
        reshio = foo01[23].textContent;
        percent = foo01[29].textContent;
        polarity = foo01[30].textContent;

        DJI = { Name: '^DJI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };
        // console.log(stockdatas);



        arr[0] = ['^DJI', price, reshio, percent];
        //console.log(arr[0][0])
    });



    request(options_nk, (error, response, body) => {
        if (error) {
            console.error(error)
        }

        const dom = new JSDOM(body);
        var foo01 = dom.window.document.getElementsByClassName('_3wVTceYe');
        var span = dom.window.document.getElementsByTagName('span');


        price = foo01[0].textContent;
        reshio = span[31].textContent + foo01[1].textContent;
        percent = span[30].textContent;
        polarity = span[31].textContent;


        NIKEI = { Name: 'NIKEI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };

        //console.log(stockdatas);

        arr[1] = ['NIKEI', price, reshio, percent];
        //console.log(arr[1][0]);


        /*
       for (var i = 0; i <= 50; i++) {
           console.log(i);
           console.log(span[i].textContent);
          
       }
       */


    });




    //連想配列とは
    //それでは連想配列を利用してみましょう。
    //連想配列は通常の配列のような数字の「インデックス（Index）」ではなく「キー（key）」を利用して変数を宣言し、
    //キーは数字でなくても構いません。

    //また連想配列は「key（キー）」と「value（値）」で宣言するため「key - valueオブジェクト」や「Dictionary」とも呼ばれます。

    //連想配列のルール
    //連想配列の宣言はいくつかのルールがあります。連想配列の宣言は、
    //配列の「[]」ブラケットでなく、オブジェクトの「{ }」ブラケットで表記します。
    //JavaScriptの連想配列と配列のアクセス方法を混同しないようにしましょう。

    //つぎに、キー（key）と値（value）は「:」（コロン）で区切った「key: value」のペアで記述します。
    //そしてペアが増えるごとに「,」（カンマ）で区切って複数指定します。キーは「””」「”」で囲んでも構いません。
    //まとめると以下のようになります。
    //let dictionary = { key1: value1, key2: value2, ...}
    //let dictionary = { key1: value1, key2: value2, ...}
    //連想配列を宣言する
    //まずはアイテム名「どうのつるぎ」について考えてみます。連想配列の作成は「キー（key）」「値（value）」を「:」で区切るため、
    //キーを「name」と定義し、値を「どうのつるぎ」とすると以下の連想配列で表せます。
    //let item = { name: 'どうのつるぎ' }

    //連想配列の値を取得する
    //JavaScriptのプロパティのアクセス方法は「オブジェクト.プロパティ名」で指定します。
    //連想配列も同様に「連想配列.キー」で指定します。「.」はJavaScriptのオブジェクトにアクセスする重要な記述です。

    //例えば、itemから「どうのつるぎ」を取得するにはキーを「name」と定義したため「item.name」でアクセスします。
    //ただし例外的に変数でキーを指定する場合、item[変数]と「[]」ブラケットでアクセスしなければいけません。

    //let item = { name: 'どうのつるぎ' }
    //console.log(item.name) //どうのつるぎ


    //キーを変数にした場合
    //const name_key = 'name'
    //let item_name = item[name_key]
    //console.log(item_name) //どうのつるぎ

    //連想配列にキーと値を追加する
    //連想配列に新たなキーと値を追加するには「連想配列.キー = 値」となります。連想配列に既にキーが存在する場合は値を更新します。

    //例えば値段（price）が150の場合は、以下のように設定します。

    //let item = { name: 'どうのつるぎ' }
    //item.price = 150
    //console.log(item) //{name: "どうのつるぎ", price: 150}


    //let item = { name: 'どうのつるぎ' }
    //item.price = 150
    //console.log(item) //{name: "どうのつるぎ", price: 150}



    // クライアントに送るJSONデータ
    const todoList = [
        { title: 'JavaScriptを勉強する', done: true },
        { title: 'Node.jsを勉強する', done: false },
        { title: 'Web APIを作る', done: false }
    ];


    stockdatas = [DJI, NIKEI];

    //console.log(stockdatas);
    console.log(stockdatas[0]);
    console.log(stockdatas[1]);

    // JSONを送信する
    //res.json(todoList);
    res.json(stockdatas);
});






// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));





/*
window.addEventListener('DOMContentLoaded', function(){

    fetch('test.html') // (1) リクエスト送信
    .then(response => response.text()) // (2) レスポンスデータを取得
    .then(data => { // (3)レスポンスデータを処理

        const parser = new DOMParser();
        const html = parser.parseFromString(data, "text/html");

        const p_elements = html.querySelectorAll('p');
        const file_area = document.getElementById("file_area");

        for(let p of p_elements) {
            file_area.appendChild(p);
        }

    });
});
*/
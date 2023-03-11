// expressモジュールを読み込む
const express = require('express');
const request = require('request');
const requestpromise = require('request-promise');



var stockdata = {};
var code;
var company;
var name = [];
var price = [];
var reshio = [];
var percent = [];
var polarity=[];

//let stdData = {};
var DJI = {};//JSON形式の配列
var NIKEI = {};
var SONY = {};

var stockdatas = {};
arr = [];
var resArray = [];//new Array();
var users = [];

// expressアプリを生成する
const app = express();

// webフォルダの中身を公開する
app.use(express.static('./03_render_json/web/'));


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

var options_sony = {
    url: 'https://finance.yahoo.co.jp/quote/6758.T',
    method: 'GET',
    json: true
}






//Node.jsのExpressフレームワークを使って、HTTP GETメソッドのリクエストを受け取るルートハンドラーを定義するためのコードです。

//この例では、/api/v1/listというパスにGETリクエストが送信されたときに、第2引数で定義されているコールバック関数が呼び出されます。このコールバック関数には、リクエストオブジェクト(req)とレスポンスオブジェクト(res)が渡されます。

//このコールバック関数内では、リクエストを処理してレスポンスを返します。具体的には、データベースから情報を取得してJSON形式でレスポンスを返す、または、あるいはHTMLテンプレートをレンダリングしてレスポンスを返す、などの処理が行われます。

//このように、app.get()メソッドは、Expressアプリケーションのルーターに、HTTP GETメソッドのリクエストを受け取るためのルートハンドラーを定義するために使用されます。また、同様の方法で、app.post()、app.put()、app.delete()などのHTTPメソッドに対応したルートハンドラーを定義することができます。

// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    const data = JSON.parse(req.query.data);
    // 配列をクリアする
    resArray = [];

    /*
    data.forEach((code, index) => {
        var url = `https://finance.yahoo.co.jp/quote/${code}.T`;
        request.get(url, (error, response, body) => {
            if (error) {
                console.error(`Error fetching ${url}: ${error}`);
                return;
            }
            console.log(`Response from ${url}: ${body}`);
        });
    });
    */




    //request()にオプションを指定してコールバック関数の「body」を出力することで
    //UrlのHTMLを出力しているわけです。
    //コールバック関数の「body」に取得したJSONデータが格納されています。
    request(options_dji, (error, response, body) => {
        if (error) {
            console.error(error)
        }

        const dom = new JSDOM(body)
        var span = dom.window.document.getElementsByTagName('span');


        price[0] = span[18].textContent;
        reshio[0] = span[23].textContent;
        percent[0] = span[28].textContent;
        polarity[0] = percent;//sapn[29].textContent;
        //polarity[0] = polarity.substr(0, 1);

        DJI = { Name: '^DJI', Price: price[0], Reshio: reshio[0], Percent: percent[0], Polarity: polarity[0] };
        // console.log(stockdatas);
        //resArray.push({ Code: '^DJI', Name: '^DJI', Price: price[0], Reshio: reshio[0], Percent: percent[0], Polarity: polarity[0] });


        arr[0] = ['^DJI', price, reshio, percent];
        //console.log(arr[0][0])


        /*
        for (var i = 18; i <= 50; i++) {
            console.log(i);
            console.log(span[i].textContent);
            
        }*/




    });
    resArray.push({ Code: '^DJI', Name: '^DJI', Price: price[0], Reshio: reshio[0], Percent: percent[0], Polarity: polarity[0] });



    request(options_nk, (error, response, body) => {
        if (error) {
            console.error(error)
        }

        const dom = new JSDOM(body);
        var foo01 = dom.window.document.getElementsByClassName('_3wVTceYe');
        var span = dom.window.document.getElementsByTagName('span');


        price = foo01[0].textContent;
        reshio = span[30].textContent + foo01[1].textContent;
        percent = span[29].textContent;
        polarity = percent;
        polarity = polarity.substr(0, 1);//span[31].textContent;


        NIKEI = { Name: 'NIKEI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };
        //resArray.push({ Code: '998407.O', Name: 'NIKEI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });
        //console.log(stockdatas);

        arr[1] = ['NIKEI', price, reshio, percent];
        //console.log(arr[1][0]);


        /*
       for (var i = 0; i <= 50; i++) {
           console.log(i);
           console.log(span[i].textContent);
           //console.log(p[i].textContent);
       }
       */


    });



    for (let i = 0; i < data.length; i++) {
        element = data[i][0];
        url = `https://finance.yahoo.co.jp/quote/${element}.T`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);
                // データを処理するコードをここに記述
                const dom = new JSDOM(body);
                var foo01 = dom.window.document.getElementsByClassName('_3rXWJKZF');

                //var span = dom.window.document.getElementsByTagName('span');
                var h1 = dom.window.document.getElementsByTagName('h1');

                name[i] = h1[1].textContent;
                price[i] = foo01[0].textContent;
                reshio[i] = foo01[1].textContent;// + foo01[1].textContent;
                percent[i] = foo01[2].textContent
                polarity[i] = percent[i];//span[35].textContent;
                //polarity[i] = polarity[i].substr(0, 1);
            }

        });
        resArray.push({ Name: name[i], Price: price[i], Reshio: reshio[i], Percent: percent[i], Polarity: '+' });
    }








    stockdatas = [DJI, NIKEI, SONY];

    //console.log(stockdatas);
    //console.log(stockdatas[0]);
    //console.log(stockdatas[1]);
    //console.log(stockdatas[2]);


    // オブジェクトデータをJSON化
    //var json = JSON.stringify(resArray);
    // JSON.stringifyを使用して、JSON配列を表示する
    //console.log(JSON.stringify(resArray));
    console.log(resArray);
    // JSONを送信する
    res.json(resArray);
    //res.json(stockdatas);
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
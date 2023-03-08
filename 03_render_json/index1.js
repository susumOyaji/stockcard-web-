// expressモジュールを読み込む
const express = require('express');
const request = require('request');



var stockdata = {};
var code;
var company;
var price;
var reshio;
var percent;
var polarity;

//let stdData = {};
var DJI = {};//JSON形式の配列
var NIKEI = {};
var SONY = {};

var stockdatas = {};
arr = [];
var resArray = [];//new Array();


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


        price = span[18].textContent;
        reshio = span[23].textContent;
        percent = span[28].textContent;
        polarity = percent;//sapn[29].textContent;
        polarity = polarity.substr(0, 1);

        DJI = { Name: '^DJI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };
        // console.log(stockdatas);
        resArray.push({ Code: '^DJI', Name: '^DJI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });


        arr[0] = ['^DJI', price, reshio, percent];
        //console.log(arr[0][0])


        /*
        for (var i = 18; i <= 50; i++) {
            console.log(i);
            console.log(span[i].textContent);
            
        }*/

        /*
        const data = [
            {id: 1, name: 'item1'},
            {id: 2, name: 'item2'},
            {id: 3, name: 'item3'}
          ];
          res.json(data);
          */

    });



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
        resArray.push({ Code: '998407.O', Name: 'NIKEI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });
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



    for (let i = 0; i < data.length; i += 1) {
        const element = data[i][0];
        var url = `https://finance.yahoo.co.jp/quote/${element}.T`;
        request(url, (error, response, body) => {
            if (error) {
                console.error(error)
            }

            const dom = new JSDOM(body);
            var foo01 = dom.window.document.getElementsByClassName('_3rXWJKZF');
            var span = dom.window.document.getElementsByTagName('span');
            var h1 = dom.window.document.getElementsByTagName('h1');

            Name = h1[1].textContent;
            price = foo01[0].textContent;
            reshio = foo01[1].textContent;// + foo01[1].textContent;
            percent = foo01[2].textContent;
            polarity = percent;//span[35].textContent;
            polarity = polarity.substr(0, 1);

            SONY = { Name: Name, Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };
            resArray.push({ Code:element,Name: Name, Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });
            //console.log(stockdatas);

            arr[2] = ['SONY', price, reshio, percent];
            //console.log(arr[1][0]);


            /*
           for (var i = 0; i <= 50; i++) {
               console.log(i);
               console.log(span[i].textContent);
              
           }
           */


        });
    }

    /*
    const data1 = [];
    //for (let i = 0; i < data.length; i += 1) {
        const element = data[1][0];
        var url = `https://finance.yahoo.co.jp/quote/${element}.T`;
        request(url, (error, response, body) => {
            if (error) {
                console.error(`Error fetching ${url}: ${error}`);
                return;
            }
            //console.log(`Response from ${url}: ${body}`);
            const dom = new JSDOM(body);
            var foo02 = dom.window.document.getElementsByClassName('_3rXWJKZF');
            var span = dom.window.document.getElementsByTagName('span');
            
            var h1 = dom.window.document.getElementsByTagName('h1');
            company = h1[1].textContent;
            price = foo02[0].textContent;
            reshio = foo02[1].textContent;// + foo01[1].textContent;
            percent = foo02[2].textContent;
            polarity = percent;//span[35].textContent;
            polarity = polarity.substr(0, 1)
            
            //console.log(stockdatas);
        });
        resArray.push({ Code: element, Name: company, Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });
            
        //data1.push({ Code: element });

        // 処理内容
    //}
        */



    stockdatas = [DJI, NIKEI, SONY];

    //console.log(stockdatas);
    //console.log(stockdatas[0]);
    //console.log(stockdatas[1]);
    //console.log(stockdatas[2]);



    // JSON.stringifyを使用して、JSON配列を表示する
    console.log(JSON.stringify(resArray, null, 2));
    console.log(resArray);
    // JSONを送信する
    //res.json(resArray);
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
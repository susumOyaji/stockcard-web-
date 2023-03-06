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
var SONY = {};

var stockdatas = {};
arr = [];

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

function options_any(code) {

    return options_any={
    url: `https://finance.yahoo.co.jp/quote/${code}.T`,
    method: 'GET',
    json: true
    }
}






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
        var span = dom.window.document.getElementsByTagName('span');

        
        price = span[18].textContent;
        reshio = span[23].textContent;
        percent = span[28].textContent;
        polarity = percent;//sapn[29].textContent;
        polarity=polarity.substr( 0,1);

        DJI = { Name: '^DJI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };
        // console.log(stockdatas);



        arr[0] = ['^DJI', price, reshio, percent];
        //console.log(arr[0][0])
        
        
        /*
        for (var i = 18; i <= 50; i++) {
            console.log(i);
            console.log(span[i].textContent);
            
        }*/
        
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
        polarity = polarity.substr( 0,1);//span[31].textContent;


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

    request(options_sony, (error, response, body) => {
        if (error) {
            console.error(error)
        }

        const dom = new JSDOM(body);
        var foo01 = dom.window.document.getElementsByClassName('_3rXWJKZF');
        var span = dom.window.document.getElementsByTagName('span');
        var h1 = dom.window.document.getElementsByTagName('h1');

        Name= h1[1].textContent;
        price = foo01[0].textContent;
        reshio = foo01[1].textContent;// + foo01[1].textContent;
        percent = foo01[2].textContent;
        polarity = percent;//span[35].textContent;
        polarity=polarity.substr( 0,1);

        SONY = { Name: Name, Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };

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


   


   


    stockdatas = [DJI, NIKEI,SONY];

    //console.log(stockdatas);
    console.log(stockdatas[0]);
    console.log(stockdatas[1]);
    console.log(stockdatas[2]);
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
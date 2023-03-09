// expressモジュールを読み込む
const express = require('express');
const request = require('request');



let resArray = [];//new Array();

var newElement;
var code;
var company;
var Name;
var price;
var reshio;
var percent;
var polarity;
var element;
var url;
// expressアプリを生成する
const app = express();

// webフォルダの中身を公開する
app.use(express.static('03_render_json/web'));

const {
    JSDOM
} = require('jsdom')


// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    const data = JSON.parse(req.query.data);
    var stock = [];
    // クライアントに送るJSONデータ
    const todoList = [
        { title: 'JavaScriptを勉強する', done: true },
        { title: 'Node.jsを勉強する', done: false },
        { title: 'Web APIを作る', done: false }
    ];

    
    stock = [{ Name: '^DJI', Price: '10', Reshio: '20', Percent: '30', Polarity: '+' },];

    stock.push({ Name: 'NIKEI', Price: '100', Reshio: '200', Percent: '300', Polarity: '+' });






    const urls = [
        'https://finance.yahoo.co.jp/quote/6758.T',
        'https://finance.yahoo.co.jp/quote/6976.T',

    ];

    for (let i = 0; i < urls.length; i++) {
        request(urls[i], (error, response, body) => {
            if (error) {
                console.error(error);
            } else {
                // データを処理するコードをここに記述
                const dom = new JSDOM(body);
                var foo01 = dom.window.document.getElementsByClassName('_3rXWJKZF');
                //var span = dom.window.document.getElementsByTagName('span');
                var h1 = dom.window.document.getElementsByTagName('h1');

                Name = h1[1].textContent;
                price = foo01[0].textContent;
                reshio = foo01[1].textContent;// + foo01[1].textContent;
                percent = foo01[2].textContent
                stock.push({ Price: price });
                console.log(JSON.stringify(price));
            }

        });
    }




    /*

    for (let i = 0; i < data.length; i += 1) {
        element = data[i][0];
        url = `https://finance.yahoo.co.jp/quote/${element}.T`;
        console.log(url);
        request(url, (error, response, body) => {
            if (error) {
                console.error(error)
            } else {

                const dom = new JSDOM(body);
                var ClassTab = dom.window.document.getElementsByClassName('_3rXWJKZF');
                //var span = dom.window.document.getElementsByTagName('span');
                var h1 = dom.window.document.getElementsByTagName('h1');

                Name = h1[1].textContent;
                price = ClassTab[0].textContent;
                reshio = ClassTab[1].textContent;// + foo01[1].textContent;
                percent = ClassTab[2].textContent;
                polarity = percent;//span[35].textContent;
                polarity = polarity.substr(0, 1);

                // 新しい要素を定義
                newElement = { Code: element, Name: Name, Price: price, Reshio: reshio, Percent: percent, Polarity: polarity };
            }
        });



        stock.push(newElement);

        //stock.push({ Name: 'NIKEI', Price: '100', Reshio: '200', Percent: '300', Polarity: '+' });


    }

    */




    console.log(stock.length); 
    console.log(stock);
    // JSONを送信する
    //res.json(todoList);
    res.json(stock);









});





// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
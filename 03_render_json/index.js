// expressモジュールを読み込む
const express = require('express');
const request = require('request');
const requestpromise = require('request-promise');



var resArray = [];//new Array();
var stock = [];

var newElement;
var code;
var company;
var name = [];
var price = [];
var reshio = [];
var percent = [];
var polarity=[];
var element;
var url;

// expressアプリを生成する
const app = express();

// webフォルダの中身を公開する
app.use(express.static('03_render_json/web/'));

const {
    JSDOM
} = require('jsdom')



// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    const data = JSON.parse(req.query.data);
    resArray = [];


    // クライアントに送るJSONデータ
    const todoList = [
        { title: 'JavaScriptを勉強する', done: true },
        { title: 'Node.jsを勉強する', done: false },
        { title: 'Web APIを作る', done: false }
    ];


    stock = [{ Name: '^DJI', Price: '10', Reshio: '20', Percent: '30', Polarity: '+' },];

    stock.push({ Name: 'NIKEI', Price: '100', Reshio: '200', Percent: '300', Polarity: '+' });






    for (let i = 0; i < data.length; i += 1) {
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
                polarity[i] = polarity[i].substr(0, 1);
            }

        });
        stock.push({ Name: name[i], Price: price[i], Reshio: reshio[i], Percent: percent[i], Polarity: '+' });
    }

   



    //console.log(stock.length);
    console.log(stock);
    // JSONを送信する
    //res.json(todoList);
    res.json(stock);









});





// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
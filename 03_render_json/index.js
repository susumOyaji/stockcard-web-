// expressモジュールを読み込む
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
//const request = require('request-promise');
//const requestpromise = require('request-promise');



var resArray = [];//new Array();
var stock = [];

var newElement;
var code;
var company;
var name;
var price;
var reshio;
var percent;
var polarity;
var element;
var url;

// expressアプリを生成する
const app = express();

// webフォルダの中身を公開する
app.use(express.static('03_render_json/web/'));

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

// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    const data = JSON.parse(req.query.data);
    stock = [];


    // クライアントに送るJSONデータ
    const todoList = [
        { title: 'JavaScriptを勉強する', done: true },
        { title: 'Node.jsを勉強する', done: false },
        { title: 'Web APIを作る', done: false }
    ];


    //stock = [{ Code: '^DJI', Name: '^DJI', Price: '10', Reshio: '20', Percent: '30', Polarity: '+' },];

    stock.push({ Code: 'NIKKEI', Name: 'NIKEI', Price: '100', Reshio: '200', Percent: '300', Polarity: '+' });







    //const request = require('request');

    //const request = require('request');

    function getResponseBody(url) {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }

    // 例としてGoogleのホームページのHTMLを取得する
    getResponseBody('https://finance.yahoo.co.jp/quote/%5EDJI')
        .then((body) => {
            //console.log(body);
            const dom = new JSDOM(body);
            //var foo01 = dom.window.document.getElementsByClassName('_3wVTceYe');
            var span = dom.window.document.querySelectorAll('.span');
            percent = span[29].textContent;
            console.log(percent);



        })
        .catch((error) => {
            console.error(error);
        });


    //const request = require('request');
    //const cheerio = require('cheerio');


    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;

    const url = 'https://finance.yahoo.co.jp/quote/%5EDJI';

    JSDOM.fromURL(url).then(dom => {
        const titles = [...dom.window.document.querySelectorAll('span')]
            .map(element => element.textContent.trim());
        console.log(titles);
    }).catch(error => {
        console.error(error);
    });











    stock.push({ Code: '^DJI', Name: '^DJI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });

    request(options_nk, (error, response, body) => {
        if (error) {
            console.error(error)
        }

        const dom = new JSDOM(body);
        var foo01 = dom.window.document.getElementsByClassName('_3wVTceYe');
        var span = dom.window.document.getElementsByTagName('span');


        price = "N1";//foo01[0].textContent;
        reshio = span[30].textContent + foo01[1].textContent;
        percent = span[29].textContent;
        polarity = percent;
        //polarity = polarity.substr(0, 1);//span[31].textContent;
        /*
       for (var i = 0; i <= 50; i++) {
           console.log(i);
           console.log(span[i].textContent);
           //console.log(p[i].textContent);
       }
       */
    });
    stock.push({ Code: '998407.O', Name: 'NIKEI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });
    //stock.push({ Code: '998407.O', Name: 'NIKEI', Price: price, Reshio: reshio, Percent: percent, Polarity: polarity });




    //for (let i = 0; i < data.length; i++) {
    i = 0;
    element = data[i][0];
    url = `https://finance.yahoo.co.jp/quote/${element}.T`;
    request(url, (error, response, body) => {
        if (error) {
            console.error(error)
        }


        // if (!error && response.statusCode == 200) {
        //console.log(body);
        // データを処理するコードをここに記述
        const dom = new JSDOM(body);
        let foo01 = dom.window.document.getElementsByClassName('_3rXWJKZF');

        //var span = dom.window.document.getElementsByTagName('span');
        var h1 = dom.window.document.getElementsByTagName('h1');

        //name = h1[1].textContent;
        //price = foo01[0].textContent;
        //reshio = foo01[1].textContent;// + foo01[1].textContent;
        //percent = foo01[2].textContent
        //polarity = percent[i];//span[35].textContent;
        //polarity[i] = polarity[i].substr(0, 1);
        //}

    });
    //stock.push({ Name: name, Price: price, Reshio: reshio, Percent: percent, Polarity: '+' });
    //console.log(stock);
    //}

    i = 1;
    element = data[i][0];
    url = `https://finance.yahoo.co.jp/quote/${element}.T`;
    request(url, (error, response, body) => {
        if (error) {
            console.error(error)
        }
        //if (!error && response.statusCode == 200) {
        //console.log(body);
        // データを処理するコードをここに記述
        const dom1 = new JSDOM(body);
        var foo02 = dom1.window.document.getElementsByClassName('_3rXWJKZF');

        //var span = dom.window.document.getElementsByTagName('span');
        var h2 = dom1.window.document.getElementsByTagName('h1');

        //name = h2[1].textContent;
        //price = foo02[0].textContent;
        //reshio = foo02[1].textContent;// + foo01[1].textContent;
        //percent = foo02[2].textContent
        //polarity = percent[i];//span[35].textContent;
        //polarity[i] = polarity[i].substr(0, 1);
        //}

    });
    //stock.push({ Name: name, Price: price, Reshio: reshio, Percent: percent, Polarity: '+' });
    //console.log(stock);
    //}





    //console.log(stock.length);
    console.log(stock);
    // JSONを送信する
    //res.json(todoList);
    res.json(stock);









});





// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
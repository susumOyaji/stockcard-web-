// expressモジュールを読み込む
const express = require('express');

// expressアプリを生成する
const app = express();

// webフォルダの中身を公開する
app.use(express.static('03_render_json/web'));

// http://localhost:3000/api/v1/list にアクセスしてきたときに
// TODOリストを返す
app.get('/api/v1/list', (req, res) => {
    // クライアントに送るJSONデータ
    const todoList = [
        { title: 'JavaScriptを勉強する', done: true },
        { title: 'Node.jsを勉強する', done: false },
        { title: 'Web APIを作る', done: false }
    ];

    const stock =[
        { Name: 'NIKEI', Price: '10', Reshio: '20', Percent: '30', Polarity: '+' }];

    console.log(stock);    
    // JSONを送信する
    //res.json(todoList);
    res.json(stock);
});

// ポート3000でサーバを立てる
app.listen(3000, () => console.log('Listening on port 3000'));
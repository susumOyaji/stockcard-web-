// expressフレームワーク
const express = require('express');
const app = express();

// ルート設定
app.get('/', (req, res) => res.send('Hello World'));

// イベント待機
app.listen(3000, () => console.log('Listening on port 3000'));
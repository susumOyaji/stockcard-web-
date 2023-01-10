'use strict';


const puppeteer = require('puppeteer');
const request = require('request');

const DATA_URL =
  'https://finance.yahoo.co.jp/quote/%5EDJI';
 
const scrape = async () => {
  const response1 = await request(DATA_URL);
  var json =response1.toJSON;
  const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250,
  defaultViewport: null
  });
 
  // Webサイトを開く
  const page = await browser.newPage();
  const url = DATA_URL;
  await page.goto(url,{ waitUntil: 'domcontentloaded' });
 
  // タイトルを取得
  const title = await page.title();
  
  //出力
  console.log(title);
  console.log(json);
  browser.close();
}
scrape();


/*
const DATA_URL =
  'https://www.transfermarkt.com/lionel-messi/alletore/spieler/28003/plus/1';

 
const fetch = require('node-fetch');
const request = require('request');
const requestPromise = require('request-promise');

const loadMessiGoals = async () => {
  const response = await fetch(DATA_URL);
  const response1 = await request(DATA_URL);
  const response2 = await requestPromise(uri: DATA_URL,gzip: true);
  return response.text();
}

module.exports = {loadMessiGoals};

const dom = new JSDOM(goalsHTML);





  

  // responseをどうにかする処理

 */












/*
const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://www.amazon.co.jp/s?i=instant-video&__mk_ja_JP=カタカナ&ref=nb_sb_noss';

(async () => {
    // httpリクエストを投げる
    const response = await requestPromise(uri: url,gzip: true);



//});
    
    let $ = cheerio.load(response);

    // 取得したいデータのタグを指定する
    let title = $('.a-section .a-size-medium.a-color-base.a-text-normal').text();
    console.log(title);

    return title;
  //};
})();
*/




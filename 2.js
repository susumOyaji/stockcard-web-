//import fetch from 'node-fetch';
const fetch = require('node-fetch') // <1>
const jsdom = require('jsdom');
//import jsdom from 'jsdom';
const { JSDOM } = jsdom;


(async () => {
  try {
    //html取得
    const response = await fetch('https://finance.yahoo.co.jp/quote/%5EDJI');
    const html = await response.text();

    //パース
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const eOutput = document.querySelector('#test-output');
    const result = document.querySelector("#test-output");
    result.innerText = " is Not registered";
    console.log(dom.window.document.querySelector('#titlebar').textContent);
    
    //const dom = new JSDOM(`<!DOCTYPE html><div id="message">Hello world</div>`);
    //eOutput = dom; //dom.window.document.getElementById('message').innerHTML; // Hello world

    //const dom = new DOMParser();
    //const html = parser.parseFromString(data, "text/html");

    //const p_elements = document.querySelectorAll('span');
    const span = Array.from(document.querySelectorAll('span'))


    console.log(span.textContent);
    const file_area = document.getElementById("file_area");

  } catch (error) {
    console.log(error);
  }
})();
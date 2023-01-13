'use strict';

//const puppeteer = require('puppeteer');




let url = 'https://finance.yahoo.co.jp/';
const getJSON = async ()=> {
  //JSON取得
  let jsonObj;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
};
getJSON();


//uncomment below line if running in node
//const fetch = require("node-fetch");

const getAPIData = async (userId) => {

  const url = `http://localhost:3000/users/${userId}`;
  
  const response = await fetch(url, { method: "get"})
  const json = response.json();
  if (response.status == 200) {
    return Promise.resolve(json);
  } else {
    return Promise.reject(json.error);
  }
  
  

    
 
};
getAPIData('1234');

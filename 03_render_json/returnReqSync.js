var request = require('sync-request');
var returnCode;
var getUrl = 'https://google.com/';

console.log("Start  Return Request Async");
returnCode = httpGet(getUrl);
console.log("Status Code (main)     : "+returnCode);
console.log("End    Return Request Async");

function httpGet(url){
  var options = {
    url: url,
    method: 'GET',
    };
  request(options, function (error, response, body) {
    if (!error) {
      console.log("Status Code (function) : "+response.statusCode);
      return response.statusCode;
    }
    else
    {
      console.log("Error!!");
    }
  });
}
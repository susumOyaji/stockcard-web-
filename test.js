
 const myHeaders = new Headers();
 myHeaders.append("Content-Type", "image/jpeg");


 const myOptions = {
	method: "GET",
	headers: myHeaders,
	mode: "cors",
	cache: "default",
  };




//https://finance.yahoo.co.jp/quote/%5EDJI
window.addEventListener('DOMContentLoaded', function(){

	fetch('test.html',myOptions) // (1) リクエスト送信
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
window.addEventListener('DOMContentLoaded', function(){

	fetch('test.html') // (1) リクエスト送信
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
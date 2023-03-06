const urls = [url1, url2, url3];

urls.forEach(url => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // 取得したデータを処理するコードをここに書く
    })
    .catch(error => {
      // エラーが発生した場合の処理をここに書く
    });
});



async function fetchUrls(urls) {
    try {
      for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        // 取得したデータを処理するコードをここに書く
      }
    } catch (error) {
      // エラーが発生した場合の処理をここに書く
    }
  }
  
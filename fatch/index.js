/**
 * [event] ページ読み込み完了時に実行
 */
//https://ntp-b1.nict.go.jp/cgi-bin/json
//https://www.nict.go.jp/en/
// https://www.nict.go.jp/
window.onload = ()=>{
    const URL = "https://www.nict.go.jp/json";  // リクエスト先
  
    //--------------------------------------
    // 現在時間を取得する
    //--------------------------------------
    fetch(URL)
      .then((res)=>{
        if( ! res.ok ) {
          throw new Error(`Fetch: ${res.status} ${res.statusText}`);
        }
        return( res.json() );
      })
      .then((json)=>{
        const sec = Number(json.st);
        document.querySelector("#jst").innerHTML = timeFormat(sec);
  
        // 表示を切り替える
        document.querySelector("#nowloading").style.display = "none";
        document.querySelector("#result").style.display = "block";
      })
      .catch((error)=>{
        alert("エラーが発生しました");
        console.error(`[FetchAPI] ${error}, ${URL}`);
      })
  }
  
  /**
   * UNIX TIMEを「YYYY-MM-DD hh:mm:ss」形式の文字列へ変換
   *
   * @param {number} sec - UNIX TIME
   * @return {string}
   */
  function timeFormat(sec){
    const time = new Date(sec * 1000);  // JSではミリ秒に直す必要がある
  
    return(
        time.getFullYear() + "-"
      + ("00" + (time.getMonth()+1)).slice(-2) + "-"
      + ("00" + time.getDate()).slice(-2)
      + " "
      + ("00" + time.getHours()).slice(-2) + ":"
      + ("00" + time.getMinutes()).slice(-2) + ":"
      + ("00" + time.getSeconds()).slice(-2)
    );
  }
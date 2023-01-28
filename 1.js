

(async () => {
	try {
	const response = await fetch('https://finance.yahoo.co.jp/quote/%5EDJI');
   //res.set({ 'Access-Control-Allow-Origin': '*' }); // ここでヘッダーにアクセス許可の情報を追加
   
   // 文字列を取得
      const html = await response.text();
   //</tr>で分割し配列を作成
   const list1 = html.indexOf('<span class="_3BGK5SVf">')   
      console.log(list1);
      console.log(list1[12667]);

   //対象テーブル周辺の文字列(ページ内で一意のもの)から位置を取得
      const first = html.indexOf('<span')
     
    const last =  html.indexOf('/span>')
   //対象テーブルの周辺に絞る
      const target = html.slice(first, last)
      console.log(target);
   //</tr>で分割し配列を作成
    const list = target.split('</tr>')
   //＊必要な要素のみの配列にする為に最後の要素を確認
   //console.log(list[list.length-1])
   const targetList = list.slice(1, list.length - 2)
   //1行分を<td>で分割して配列にしたときの要素数
   const tdCount = targetList[0].split('<td>').length
   const result = targetList.map(item => {
    //</th>があれば
    let obj ={}
    if(item.indexOf('<th>') != -1){
         obj = {
            th: item.split('<th>')[1].split('\n</th>')[0]
         }
    }
   //<td>のループを調整する
     for (let i = 1; i < tdCount; i++) {
      //objのkey
       let key = `td${i}`
       let str = item.split('<td>')[i]
      //console.log(str)
      //状況に応じ、strを確認して調整
        if(str.indexOf('\n</td>') != -1){
         obj = {...obj, [key]:str.split('\n</td>')[0]}
        }else{
          obj = {...obj, [key]:''}
        }
     }
     return obj
    })
    console.log(result)
   //Json形式で保存する（タブ文字で標準的な整形）
    const textJson = JSON.stringify(result, null, '\t');
	  await fs.writeFile('./output/result.txt', textJson, 'utf8');
	} catch(error) {
	 console.log(error);
	}
})();
// [
//     { th: '東京エレクトロン', td1: '8.12%', td2: '8.12%' },
//     { th: 'ファーストリテイリング', td1: '8.00%', td2: '16.12%' },
//    省略
// ]
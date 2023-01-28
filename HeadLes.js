const puppeteer = require('puppeteer')
const path = require('path')

const testItem = async page => {
  console.log('############ 要素を1つ取得 ############')

  // ElementHandleクラスのインスタンスを取得
  const item = await page.$('#result div.item')
  console.log(await (await item.getProperty('innerHTML')).jsonValue())
  console.log('--------------------------------------')
  console.log(await (await item.getProperty('textContent')).jsonValue())
}

const testItems = async page => {
  console.log('############ 要素を1つ取得 ############')

  // Array<ElementHandle> を取得
  const items = await page.$$('#result div.item')
  console.log(items.length)

  for (const item of items) {
    // data属性取得
    console.log('--------------------------------------')
    console.log(await item.$eval('a', element => element.getAttribute('data-test')))

    // href取得
    const aTag = await item.$('a')
    const href = await aTag.getProperty('href')
    const url = await href.jsonValue()
    console.log(url)
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,  // 動作確認するためheadlessモードにしない
    slowMo: 100  // 動作確認しやすいようにpuppeteerの操作を遅延させる
})
  // Pageクラスのインスタンスを取得
  const page = await browser.newPage()
  await page.goto(`file:${path.join(__dirname, '/test_html/sample.html')}`)
  await testItem(page)
  await testItems(page)
  await browser.close()
})()
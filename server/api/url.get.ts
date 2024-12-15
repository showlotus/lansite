import { IncomingMessage, ServerResponse } from 'http'
import puppeteerManager from '../puppeteerManager'
import { resolve } from 'path'

async function getBase64Image(url: string) {
  return new Promise(async (resolve, reject) => {
    await $fetch(url, {
      responseType: 'arrayBuffer',
      onResponse({ request, response }) {
        const data = response._data
        const mimeType = response.headers.get('content-type')
        const base64 = Buffer.from(data).toString('base64')
        resolve(`data:${mimeType};base64,${base64}`)
      },
      onResponseError() {
        reject()
      },
    })
  })
}

export default fromNodeMiddleware(async (req: IncomingMessage, res: ServerResponse) => {
  const [url] = [...new URLSearchParams(req.url).values()]
  console.log(url)
  const browser = await puppeteerManager.getBrowser()
  const page = await browser.newPage()
  page.on('response', async response => {
    const url = response.url()
    const contentType = response.headers()['content-type']

    // 检查资源是否为图片类型
    if (contentType && contentType.startsWith('image')) {
      // console.log(url)
    }
  })

  await page.goto(url, { waitUntil: 'networkidle0' })
  const html = await page.content()
  await page.close()
  res.end(html)
})

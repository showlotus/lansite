import puppeteer, { Browser } from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getExecutablePath = () => {
  const platform = os.platform()

  let executablePath = ''
  const publicDir = process.dev ? '../../public' : '../public'
  if (platform === 'darwin') {
    // macOS
    executablePath = path.join(
      __dirname,
      publicDir,
      'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    )
  } else if (platform === 'win32') {
    // Windows
    executablePath = path.join(__dirname, publicDir, 'chrome-win/chrome.exe')
  }

  return executablePath
}

class PuppeteerManager {
  browser: Browser | null
  constructor() {
    this.browser = null
  }

  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        executablePath: getExecutablePath(),
      })
    }
    return this.browser
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}

export default new PuppeteerManager()

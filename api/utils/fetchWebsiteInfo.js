import * as cheerio from "cheerio"
import { DEFAULT_WEB_ICON } from "./constants.js"

export async function fetchWebsiteInfo(url) {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    let title = $("head title").text().trim()

    if (!title) {
      console.log("no title")
      title = getDefaultTitle(url)
    }

    let favicon = $('head link[rel="icon"]').attr("href")

    favicon = favicon ? new URL(favicon, url).href : DEFAULT_WEB_ICON
    return { title, favicon }
  } catch (error) {
    console.error("Error fetching website info:", error.message)
    return { title: getDefaultTitle(url), favicon: DEFAULT_WEB_ICON }
  }
}

function getDefaultTitle(url) {
  const urlObject = new URL(url)
  return `${urlObject.hostname} - Untitled`
}


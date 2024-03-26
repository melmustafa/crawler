const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  const urlObj = new URL(url);
  let normalizeURL = urlObj.origin;
  if (urlObj.pathname.slice(-1) === "/")
    normalizeURL += urlObj.pathname.slice(0, -1);
  else normalizeURL += urlObj.pathname;
  return normalizeURL;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const urls = [];
  for (const element of dom.window.document.querySelectorAll("a")) {
    let url = element.href;
    if (url.slice(0, 7) !== "http://" && url.slice(0, 8) !== "https://")
      url = baseURL + url;
    urls.push(url);
  }
  return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
  try {
    if (!currentURL.includes(baseURL)) {
      return pages;
    }
    const currentUrlNormalized = normalizeURL(currentURL);
    if (currentUrlNormalized in pages) {
      pages[currentUrlNormalized]++;
      return pages;
    }
    pages[currentUrlNormalized] = 1;
    const pageContent = await fetch(currentUrlNormalized);
    if (pageContent.status >= 400) {
      console.error("Bad HTTP request");
      return pages;
    }
    if (!pageContent.headers.get("content-type").includes("text/html")) {
      console.error("Invalid HTTP response type");
      return pages;
    }
    const html = await pageContent.text();
    console.log(html);
    const urls = getURLsFromHTML(html, baseURL);
    for (const url of urls) {
      pages = await crawlPage(baseURL, url, pages);
    }
    return pages;
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};

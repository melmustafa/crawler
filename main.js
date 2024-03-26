const { crawlPage } = require("./src/crawl");
const { printReport } = require("./src/report");

async function main() {
  if (process.argv.length > 3) {
    console.error("ERROR: too many argument, only one is required");
  }
  if (process.argv.length < 3) {
    console.error(
      "ERROR: no arguments were passed. Excatly one argument is required"
    );
  }
  const baseURL = process.argv[2];
  console.log(`The crawler is starting to crawl up ${baseURL}...`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();

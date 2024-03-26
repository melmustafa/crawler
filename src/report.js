function pageSort(pages) {
  const list = [];
  for (const key in pages) {
    list.push([key, pages[key]]);
  }
  return list.sort((firstPage, secondPage) => secondPage[1] - firstPage[1]);
}

function printReport(pages) {
  console.log("Report is starting to get out ...");
  const pagesList = pageSort(pages);
  for (const entry of pagesList) {
    console.log(`Found ${entry[1]} internal links to ${entry[0]}`);
  }
}
module.exports = {
  printReport,
};

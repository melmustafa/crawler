const { test, expect } = require("@jest/globals");

const { normalizeURL, getURLsFromHTML } = require("../src/crawl");

test("Get rid of the protocol and ending /", () => {
  expect(normalizeURL("https://hello.world/path/")).toBe("hello.world/path");
});

test("Get rid of the protocol and ending / with no path", () => {
  expect(normalizeURL("https://hello.world/")).toBe("hello.world");
});

test("Match regardless of tailing / and protocol", () => {
  expect(normalizeURL("https://hello.world/path/")).toBe(
    normalizeURL("http://hello.world/path")
  );
});

test("Convert relative paths to absolute", () => {
  expect(
    getURLsFromHTML(
      '<a href="/">Something</a><a href="/mail">Email</a><a href="https://www.facebook.com/">Facebook</a>',
      "localhost:3000"
    )
  ).toEqual([
    "localhost:3000/",
    "localhost:3000/mail",
    "https://www.facebook.com/",
  ]);
});

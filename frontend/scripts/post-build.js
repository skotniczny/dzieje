import render from "../src/contentRenderer.js"
import data from "../../scrapper/data.json" with { type: "json" }
import { readFileSync, writeFileSync } from "fs"

const template = readFileSync("./dist/index.html", "utf8")
const content = render(data)
const html = template
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>\r?\n?/gi, "")
  .replace("<!--APP-->", content)

writeFileSync("./dist/index.html", html)

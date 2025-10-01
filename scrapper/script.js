import * as cheerio from "cheerio"
import { writeFile } from "fs/promises"

const dziejeUrl = "https://dzieje.us.edu.pl/dziejerfn.htm"
const htmlFileName = "dzieje_religii_filozofii_nauki.htm"
const jsonFileName = "data.json"

try {
  const response = await fetch(dziejeUrl)
  const html = await response.text()
  const json = makeJson(html)
  await Promise.all([
    writeFile(htmlFileName, html),
    writeFile(jsonFileName, json),
  ])
  console.log("Zakończono przetwarzanie plików")
} catch (err) {
  console.error(err.message, err.stack)
}

function makeJson(text) {
  const $ = cheerio.load(text)
  const paragraphs = $("p")

  const output = []
  for (const element of paragraphs) {
    const $el = $(element)
    const elClassName = $el.attr("class")
    if (["style3", "style4", "style5"].includes(elClassName)) continue

    const $date = $el.find("strong:first")

    if ($el.text().trim().length > 0) {
      const trimmedDate = $date.length ? $date.text().trim() : ""
      output.push({
        class: elClassName || "",
        type: trimmedDate ? getType($date, elClassName) : "",
        date: trimmedDate.replace(/[\[\]{}]/g, ""),
        desc: $el.html(),
      })
    }
  }
  return JSON.stringify(output, null, 2)
}

function getType($dateEl, elClassName) {
  if (["style6", "style7"].includes(elClassName)) return ""

  if ($dateEl.has("em").length) {
    return "religion-history"
  }

  if ($dateEl.has("u").length) {
    return "math-logic"
  }

  const elText = $dateEl.text()

  if (elText.startsWith("[[")) {
    return "technology-history"
  }

  if (elText.startsWith("[")) {
    return "natural-sciences"
  }

  if (elText.startsWith("{")) {
    return "social-sciences"
  }

  return "philosophy-history"
}

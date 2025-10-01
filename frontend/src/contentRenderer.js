let currentDate = ""

function render(data) {
  let html = ""
  for (const entry of data) {
    const entryDate = entry.date.trim()
    html += renderEntry(entry, entryDate)
    if (currentDate !== entryDate) currentDate = entryDate
  }
  return html
}

function renderEntry(entry, entryDate) {
  const entryClass = `entry ${entry.type ? "entry--" + entry.type : ""}`
  const p = `<p class="entry-data ${entry.class}">${entry.desc}</p>`
  let html = `<div class="${entryClass}">`
  if (["style6", "style7"].includes(entry.class)) {
    html += p
  } else {
    if (currentDate !== entryDate) {
      html += `<h2 class="entry-title">${entry.date}</h2>`
    }
    html += p
  }
  html += "</div>\n"
  return html
}

export default render

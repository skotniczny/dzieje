import data from "../../scrapper/data.json" assert { type: "json" }
import render from "./contentRenderer"
import "./style.css"

document.querySelector("#app").innerHTML = render(data)

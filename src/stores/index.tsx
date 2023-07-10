import { configure } from "mobx"
import { Echart } from "./echart";
import { Ui } from "./ui";

configure({
  enforceActions: "never",
})

export {
  Echart,
  Ui
}
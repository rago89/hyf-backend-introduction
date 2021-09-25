import { homePage } from "./components/pages/home-page.component.js";

async function startApplication() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  const res = await homePage();
  root.append(res);
}
startApplication();

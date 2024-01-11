import { submitForm, addMoreCast, addMoreDirector } from "./submitForm.js";
const addMoreCastBtn = document.querySelector("#add-cast");
const addMoreDirectorBtn = document.querySelector(".directors button");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm("http://127.0.0.1:80/addmovie");
});

addMoreCastBtn.addEventListener("click", addMoreCast);
addMoreDirectorBtn.addEventListener("click", addMoreDirector);

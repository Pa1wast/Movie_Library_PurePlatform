import { submitForm, addMoreCast, addMoreDirector } from "./submitForm.js";

const form = document.querySelector(".form");
const descriptionInput = document.querySelector("#description");
const titleInput = document.querySelector("#title");
const yearInput = document.querySelector("#year");
const genreInput = document.querySelector("#genre");
const cast = document.querySelector(".cast");
const directorContainer = document.querySelector(".directors");
const posterInput = document.querySelector("#poster");
const addMoreCastBtn = document.querySelector("#add-cast");
const addMoreDirectorBtn = document.querySelector(".directors button");
let movieId;
let directorId;
let actorId;

window.onload = async function () {
  const urlSearch = new URLSearchParams(window.location.search);
  movieId = urlSearch.get("id");
  directorId = urlSearch.get("directorId");
  actorId = urlSearch.get("actorId");
  console.log(movieId, directorId, actorId);
  const res = await fetch(`http://localhost:80/getmovies/${movieId}`);
  const data = await res.json();
  const detailedMovie = data[0];
  document.querySelector(
    ".edit-title"
  ).textContent = `Edit ${detailedMovie.title}`;
  descriptionInput.value = detailedMovie.description;
  titleInput.value = detailedMovie.title;
  yearInput.value = detailedMovie.releaseYear;
  genreInput.value = detailedMovie.genre;
  posterInput.value = detailedMovie.poster;
  detailedMovie.actors.forEach((actor, i) => {
    if (i === 0) {
      const castMember = document.querySelector(".cast-member");
      castMember.querySelector(".name").value = actor.name;
      castMember.querySelector(".country").value = actor.country;
      castMember.querySelector(".age").value = actor.age;
    } else {
      const html = `
     <div class="cast-member" data-actorId=${""}>
          <label >Cast member name</label>
          <input type="text" class="name" value=${actor.name}/>
          <label >Cast member age</label>
          <input type="number" class="age" value='${actor.age}'/>
          <label ">Country of origin</label>
          <input type="text" class="country"  value=${actor.country} />
        </div>
    `;
      cast.insertAdjacentHTML("afterbegin", html);
    }

    detailedMovie.directors.forEach((director, i) => {
      if (i === 0) {
        const mainDirector = directorContainer.querySelector(".director");
        mainDirector.querySelector("input").value = director.name;
      } else {
        const html = `
         <div class="director"  data-directorId=${""}>
          <label label >Movie Director</label>
          <input type="text" value=${director.name} />
        </div>
    `;
        directorContainer.insertAdjacentHTML("afterbegin", html);
      }
    });
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm(
    `http://127.0.0.1:80/updatemovie?movieId=${movieId}&directorId=${directorId}&actorId=${actorId}`
  );
});
addMoreCastBtn.addEventListener("click", addMoreCast);
addMoreDirectorBtn.addEventListener("click", addMoreDirector);

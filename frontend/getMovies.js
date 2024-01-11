const search = document.querySelector("#search");
const getAllMovies = async function () {
  const res = await fetch("http://localhost:80/getmovies");
  const uniqueMovies = await res.json();
  uniqueMovies.reverse();
  const container = document.getElementById("moviesContainer");

  uniqueMovies.forEach((movie) => {
    createCard(container, movie);
  });
};

window.onload = getAllMovies();

function createCard(container, movie) {
  const card = document.createElement("div");
  card.classList.add("card");

  const posterImg = document.createElement("img");
  posterImg.src = movie.poster;
  posterImg.alt = `${movie.title} Poster`;
  card.appendChild(posterImg);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const title = document.createElement("h2");
  title.textContent = movie.title;

  const description = document.createElement("p");
  description.textContent = movie.description;

  const details = document.createElement("div");
  details.classList.add("details");

  const releaseYear = document.createElement("p");
  releaseYear.innerHTML = `<strong>Release Year:</strong> ${movie.releaseYear}`;

  const genre = document.createElement("p");
  genre.innerHTML = `<strong>Genre:</strong> ${movie.genre}`;

  const actors = document.createElement("p");
  actors.innerHTML = `<strong>Actors:</strong> ${movie.actors
    .map(
      (actor) =>
        `<span class="actorInfo" data-actorId='${actor.id}'>${actor.name} (${actor.age}, ${actor.country})</span>`
    )
    .join(", ")}`;

  const directors = document.createElement("p");
  directors.innerHTML = `<strong>Directors:</strong>  ${movie.directors
    .map(
      (director) =>
        `<span class="director-name" data-directorId='${director.id}'>${director.name}</span>`
    )
    .join(", ")}`;

  details.appendChild(releaseYear);
  details.appendChild(genre);
  details.appendChild(actors);
  details.appendChild(directors);

  cardContent.appendChild(title);
  cardContent.appendChild(description);
  cardContent.appendChild(details);

  card.appendChild(cardContent);
  container.appendChild(card);
  const cardButtons = document.createElement("div");
  cardButtons.classList.add("card-buttons");
  card.setAttribute("data-id", movie.id);

  const actorsId = movie.actors.map((actor) => actor.id).join(",");
  const directorsId = movie.directors.map((director) => director.id).join(",");
  console.log(actorsId, directorsId);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  const editAnchor = document.createElement("a");
  editAnchor.setAttribute(
    "href",
    `./editMovie.html?id=${movie.id}&directorId=${directorsId}&actorId=${actorsId}`
  );
  editAnchor.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => handleDelete(movie.id));

  const learnMoreButton = document.createElement("button");
  learnMoreButton.textContent = "Learn More";
  const LearnAnchor = document.createElement("a");
  LearnAnchor.setAttribute("href", `./movieDetails.html?id=${movie.id}`);
  LearnAnchor.appendChild(learnMoreButton);

  cardButtons.appendChild(editAnchor);
  cardButtons.appendChild(deleteButton);
  cardButtons.appendChild(LearnAnchor);

  card.appendChild(cardContent);
  card.appendChild(cardButtons);

  container.appendChild(card);
}

async function handleDelete(id) {
  document.querySelector(`[data-id="${id}"]`).remove();
  res = await fetch("http://127.0.0.1:80/deletemovie", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });
}

const searchForMovie = deBounce(async (value) => {
  const res = await fetch(
    `http://127.0.0.1:80/getmovies/search?movieName=${value}`
  );
  const result = await res.json();
  const container = document.querySelector("#moviesContainer");
  [...container.children].forEach((movie) => {
    movie.remove();
  });
  result.forEach((movie) => {
    createCard(container, movie);
  });
}, 500);

search.addEventListener("input", async (e) => {
  searchForMovie(e.target.value);
});

function deBounce(cb, delay) {
  let timeout;

  return (value) => {
    clearTimeout(timeout);
    if (value === "") {
      getAllMovies();
      document.querySelector("#moviesContainer").innerHTML = "";
    } else
      timeout = setTimeout(() => {
        cb(value);
      }, delay);
  };
}

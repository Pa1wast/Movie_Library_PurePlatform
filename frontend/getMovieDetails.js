let movieId;
window.onload = async () => {
  movieId = new URLSearchParams(window.location.search).get("id");
  const res = await fetch(`http://localhost:80/getmovies/${movieId}`);
  const data = await res.json();
  const detailedMovie = data[0];
  const detailedContainer = document.getElementById("detailedMovieContainer");

  const detailedCard = document.createElement("div");
  detailedCard.classList.add("detailed-card");

  if (detailedMovie.poster) {
    const posterImg = document.createElement("img");
    posterImg.src = detailedMovie.poster;
    posterImg.alt = `${detailedMovie.title} Poster`;
    detailedCard.appendChild(posterImg);
  }

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const backButton = document.createElement("button");
  backButton.classList.add("back-button");
  backButton.textContent = "Back to Movies";
  backButton.addEventListener("click", navigateBack);

  const title = document.createElement("h2");
  title.textContent = detailedMovie.title;

  const description = document.createElement("p");
  description.textContent = detailedMovie.description;

  const details = document.createElement("div");
  details.classList.add("details");

  const releaseYear = document.createElement("p");
  releaseYear.innerHTML = `<strong>Release Year:</strong> ${detailedMovie.releaseYear}`;

  const genre = document.createElement("p");
  genre.innerHTML = `<strong>Genre:</strong> ${detailedMovie.genre}`;

  const actors = document.createElement("p");
  actors.innerHTML = `<strong>Actors:</strong> ${detailedMovie.actors
    .map((actor) => `${actor.name} (${actor.age}, ${actor.country})`)
    .join(", ")}`;

  const directors = document.createElement("p");
  directors.innerHTML = `<strong>Directors:</strong> ${detailedMovie.directors
    .map((director) => director.name)
    .join(", ")}`;

  details.appendChild(releaseYear);
  details.appendChild(genre);
  details.appendChild(actors);
  details.appendChild(directors);

  cardContent.appendChild(title);
  cardContent.appendChild(description);
  cardContent.appendChild(details);

  const likeCommentContainer = document.createElement("div");
  likeCommentContainer.classList.add("like-comment-container");

  const likeButton = document.createElement("button");
  likeButton.textContent = "Like";
  likeButton.addEventListener("click", handleLike);

  const likeCount = document.createElement("span");
  likeCount.classList.add("like-count");
  likeCount.textContent = `Likes: ${detailedMovie.numberOfLikes}`;

  const commentButton = document.createElement("button");
  commentButton.textContent = "Comment";
  commentButton.classList.add("comment-button");
  commentButton.addEventListener("click", toggleCommentForm);

  const commentForm = document.createElement("div");
  commentForm.classList.add("comment-form");
  commentForm.style.display = "none";

  const nameInput = document.createElement("input");
  nameInput.classList.add("user");
  nameInput.placeholder = "Your Name";

  const textInput = document.createElement("textarea");
  textInput.classList.add("comment-text");

  textInput.placeholder = "Your Comment";

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Comment";
  submitButton.addEventListener("click", handleCommentSubmission);

  commentForm.appendChild(nameInput);
  commentForm.appendChild(textInput);
  commentForm.appendChild(submitButton);

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments-container");
  detailedMovie.comments.forEach((comment) => {
    comment.timestamp = new Date(comment.timestamp).toLocaleString("en-GB");
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.text} (${comment.timestamp})`;
    commentsContainer.insertAdjacentElement("afterbegin", commentElement);
  });

  likeCommentContainer.appendChild(likeButton);
  likeCommentContainer.appendChild(likeCount);
  likeCommentContainer.appendChild(commentButton);

  cardContent.appendChild(backButton);
  detailedCard.appendChild(cardContent);
  detailedCard.appendChild(likeCommentContainer);
  detailedCard.appendChild(commentForm);
  detailedCard.appendChild(commentsContainer);

  detailedContainer.appendChild(detailedCard);
};

async function handleLike() {
  const likeCount = document.querySelector(".like-count");
  const numberOfLikes = +likeCount.textContent.split(" ").at(1);
  likeCount.textContent = `Likes: ${numberOfLikes + 1}`;
  await fetch(`http://127.0.0.1:80/addlike/${movieId}`, {
    method: "post",
  });
}

function navigateBack() {
  window.location.href = "http://127.0.0.1:5500/frontend/movies.html";
}

function toggleCommentForm() {
  const commentForm = document.querySelector(".comment-form");
  commentForm.style.display =
    commentForm.style.display === "none" ? "flex" : "none";
}

async function handleCommentSubmission() {
  const nameInput = document.querySelector(".user");
  const textInput = document.querySelector(".comment-text");
  const name = nameInput.value;
  const text = textInput.value;

  if (name && text) {
    const comment = {
      name,
      text,
      timestamp: new Date().toLocaleString(),
    };
    const commentsContainer = document.querySelector(".comments-container");
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.text} (${comment.timestamp})`;
    commentsContainer.insertAdjacentElement("afterbegin", commentElement);

    nameInput.value = "";
    textInput.value = "";
    toggleCommentForm();
    await fetch(`http://127.0.0.1:80/addcomment/${movieId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
  } else {
    alert("Please fill in both name and comment fields.");
  }
}

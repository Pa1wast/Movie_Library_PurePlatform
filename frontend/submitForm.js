const descriptionInput = document.querySelector("#description");
const titleInput = document.querySelector("#title");
const yearInput = document.querySelector("#year");
const genreInput = document.querySelector("#genre");
const cast = document.querySelector(".cast");
const posterInput = document.querySelector("#poster");
const directorContainer = document.querySelector(".directors");

export async function submitForm(url) {
  const directors = [...document.querySelectorAll(".directors .director")].map(
    (director) => director.querySelector("input").value
  );
  const castMembers = [...cast.querySelectorAll(".cast-member")].map(
    (castMember) => {
      return {
        name: castMember.querySelector(".name").value,
        age: castMember.querySelector(".age").value,
        country: castMember.querySelector(".country").value,
      };
    }
  );

  const releaseYear = yearInput.value;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const genre = genreInput.value;
  const poster = posterInput.value;

  const newMovie = {
    title,
    releaseYear,
    description,
    directors,
    castMembers,
    genre,
    poster,
  };
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMovie),
  });
  yearInput.value = "";
  posterInput.value = "";
  titleInput.value = "";
  descriptionInput.value = "";
  genreInput.value = "";
  [...document.querySelectorAll(".directors .director")].forEach(
    (director) => (director.querySelector("input").value = "")
  );
  [...cast.querySelectorAll(".cast-member")].forEach((castMember) => {
    castMember.querySelector(".name").value = "";
    castMember.querySelector(".age").value = "";
    castMember.querySelector(".country").value = "";
  });
}

export function addMoreCast() {
  const html = `
     <div class="cast-member">
          <label >Cast member name</label>
          <input type="text" class="name"/>
          <label >Cast member age</label>
          <input type="number" class="age" />
          <label ">Country of origin</label>
          <input type="text" class="country"  />
        </div>
    `;
  cast.insertAdjacentHTML("afterbegin", html);
}

export const addMoreDirector = () => {
  const html = `
         <div class="director">
          <label label >Movie Director</label>
          <input type="text"  />
        </div>
    `;
  directorContainer.insertAdjacentHTML("afterbegin", html);
};

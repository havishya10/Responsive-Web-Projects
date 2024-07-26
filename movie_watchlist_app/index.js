const mainEl = document.getElementById("main");
let userInput = document.getElementById("user-input");
const formEl = document.getElementById("movie-input");
let watchBtnState = false;
const movieContainerEl = document.getElementById("movie");
const localMovieArray = localStorage.getItem("MovieWatchList");
let movieArray = [];

if (localMovieArray !== null) {
  movieArray.push(localMovieArray);
}
async function getMovieData(userInput) {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${userInput}&apikey=86a6fb12`
  );
  const data = await response.json();
  if (data.Response === "True") {
    for (let i of data.Search) {
      renderMovieData(i.imdbID);
    }
  } else {
    mainEl.innerHTML = `
          <div class="load-msg">
        <p>Unable to find what you’re looking for. Please try another search.</p>
      </div>
    `;
  }
}
async function renderMovieData(id) {
  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=86a6fb12`);
  const data = await res.json();
  mainEl.innerHTML += `
       <div class="movie" id="movie">
            <div class="movie-container" id="movie-container">
                <div class="movie-img">
                    <img src="${data.Poster} alt="movie-img">
                </div>
                <div class="movie-content">
                    <div class="movie-details" style="justify-content: space-between;">
                        <h2>${data.Title}</h2>
                        <p>
                            <i class="fa-solid fa-star"></i> ${data.imdbRating}
                        </p>
                    </div>
                    <div class="movie-details">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                                          <button class="watchlist-btn" >
                        <i class="fa-solid fa-plus"></i> Watchlist </button>
                    </div>
  
                </div>
            </div>

            <div class="movie-desc">
                <p>${data.Plot}</p>
            </div>

        </div>
`;
  handlebtn();
}
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  mainEl.textContent = "";
  getMovieData(userInput.value);
});

function handlebtn() {
  const watchlistBtn = document.getElementsByClassName("watchlist-btn");
  for (let i of watchlistBtn) {
    i.addEventListener("click", () => {
      watchBtnState = !watchBtnState;
      if (watchBtnState) {
        i.innerHTML = `
        <i class="fa-solid fa-minus"></i> Remove
        `;
        let parent = i.parentNode.parentNode.parentNode.parentElement.innerHTML;
        movieArray.push(parent);
        localStorage.setItem("MovieWatchList", movieArray);
      } else {
        i.innerHTML = `
        <i class="fa-solid fa-plus"></i> Watchlist
        `;
        let parent = i.parentNode.parentNode.parentNode.parentNode.innerHTML;
        console.log(parent);
        movieArray = movieArray.forEach((movie) =>
          console.log(movie === parent)
        );
        localStorage.setItem("MovieWatchList", movieArray);
      }
    });
  }
}

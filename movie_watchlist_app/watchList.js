const watchListSectionEl = document.getElementById("watchList");
const homeSectionEL = document.getElementById("home-header");
const watchListDisplayEl = document.getElementById("go-to-watchlist");
watchListDisplayEl.addEventListener("click", () => {
  homeSectionEL.style.display = "none";
  watchListSectionEl.style.display = "block";
  displayWatchList();
});

function renderWatchList(movieArray) {
  for (let i of movieArray) {
    mainEl.innerHTML += `
        <div class="movie">
        ${i}
        </div>
        `;
  }
  handlebtn();
}
function displayWatchList() {
  console.log(movieArray);
  if (!movieArray.includes("") || movieArray.length > 0) {
    mainEl.textContent = "";
    renderWatchList(movieArray);
  } else {
    mainEl.innerHTML = `
              <div class="load-msg">
        <p>Your watchlist is looking a little empty...</p>
        <a class="watchlist-btn" href="index.html" >
                        <i class="fa-solid fa-plus"></i> Let’s add some movies!</a>
      </div>
        `;
  }
}

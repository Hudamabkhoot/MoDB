const watchEl = document.getElementById('watch-el')
const watchlistFeed = document.getElementById('watchlist-feed')
let moviesInWatchlist = JSON.parse(localStorage.getItem("watchlist"));

document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    removeFromWatchlistArr(e.target.dataset.remove);
  }
});

document.addEventListener("DOMContentLoaded", renderWatchlist)

console.log(moviesInWatchlist)
    
function renderWatchlist(){
    let result = ''
    if (moviesInWatchlist != null && moviesInWatchlist.length === 0) {
        watchEl.innerHTML = `
                <h3>Your watchlist is looking a little empty...</h3>
                <div class="add-el">
                <a href="index.html"><button class="add-btn" ></button></a>
                <p class="watchlist-add">Let's add some movies!</p>
                </div>
                `
        } 
    else if (moviesInWatchlist != null && moviesInWatchlist.length > 0) {
         watchEl.classList.add('hidden') 
        for (let item of moviesInWatchlist){
             result += `
                <div class="movies-container">
                    <div class="movie-el">
                        <img src="${item.poster}" class="movie-img">
                        <div class="movie-info">
                            <div class="movie-info-col-one">
                                <p class="movie-title">${item.title}</p>
                                <div class="star-el">
                                    <img src="images/star.png" class="rating-img">
                                    <p class="movie-rating">${item.rating}</p>
                                </div>
                            </div>
                        <div class="movie-info-col-two">
                            <p class="movie-duration">${item.runtime}</p>
                            <p class="movie-genre">${item.genre}</p>
                            <div class="add-el">
                                <button class="remove-btn icon" data-remove="${item.id}"></button>
                                <p>Remove</p>
                            </div>
                        </div>
                        <p class="movie-description">${item.plot}</p>
                        </div>
                     </div>
                </div>
                `
                
        }
   watchlistFeed.innerHTML = result
}
}

renderWatchlist()

function removeFromWatchlistArr(movieId){ 
        const targetMovietObj = moviesInWatchlist.findIndex((targetMovie) => {
            return targetMovie.id === movieId
                
        });
    
          if (targetMovietObj > -1) {
            moviesInWatchlist.splice(targetMovietObj, 1);
            localStorage.setItem("watchlist",JSON.stringify(moviesInWatchlist));
            JSON.parse(localStorage.getItem("watchlist"));
            renderWatchlist();
          }
          
          reload(moviesInWatchlist)
}


function reload(item){
    if (item.length === 0) {
        location.reload()
        } 
}



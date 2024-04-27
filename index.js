
const searchBtn = document.getElementById("search-btn")
const feed = document.getElementById('feed')
const searchForm = document.getElementById('search-form')
const watchlistFeed = document.getElementById('watchlist-feed')
const exploreEl = document.getElementById('explore-el')
const apiKey = 'ee7d5ac2'

let movies = []
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

document.addEventListener('click',  (e) => { 
        if (e.target.dataset.add){
            createWatchlistArr(e.target.dataset.add)
            //renderWatchlist(watchlist)
            //console.log(watchlist)
        }
    })

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
    const searchValue = document.getElementById("search-input").value.trim()
    if (searchValue) {
        feed.innerHTML = '';
        movies = [];

        
	fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`)
		.then(res => res.json())
        .then(data => {
            
            if (data.Search === undefined) {
                exploreEl.innerHTML =
                `<div class="not-found-el">
                <p class="not-found"> Unable to find what you’re looking for. Please try another search.</p>
                </div>
                `
            }
            else {
            let moviesList = data.Search
            
            for (let moviePicked of moviesList){
                fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${moviePicked.imdbID}`)
						.then(res => res.json())
                        .then(movie => {
                            //console.log(movie)
                            renderMovie(movie)
                            createMoviesArr(movie)
                        })
             }
             }
        })  
         
    }
    searchForm.reset();
});
     
function createMoviesArr(movie){ 

    const moviesInfo = {
        title: movie.Title,
        rating: movie.imdbRating,
        poster: movie.Poster,
        runtime: movie.Runtime,
        genre: movie.Genre,
        plot: movie.Plot,
        id: movie.imdbID
        };

    movies.push(moviesInfo)
}


function renderMovie(movie){
    exploreEl.classList.add('hidden') 
    feed.innerHTML += `
                <div class="movies-container">
                    <div class="movie-el">
                        <img src="${movie.Poster}" class="movie-img">
                        <div class="movie-info">
                            <div class="movie-info-col-one">
                                <p class="movie-title">${movie.Title}</p>
                                <div class="star-el">
                                    <img src="images/star.png" class="rating-img">
                                    <p class="movie-rating">${movie.imdbRating}</p>
                                </div>
                            </div>
                            <div class="movie-info-col-two">
                                <div class="info">
                                <p class="movie-duration">${movie.Runtime}</p>
                                <p class="movie-genre">${movie.Genre}</p>
                                </div>
                                <div class="add-el">
                                    <button class="add-btn icon" data-add="${movie.imdbID}"></button>
                                    <p>watchlist</p>
                                </div>
                            </div>
                            <p class="movie-description">${movie.Plot}</p>
                        </div>
                     </div>
                </div>
                `
}


function createWatchlistArr(movieId){ 
        const targetMovietObj = movies.filter(function(targetMovie) {
            return targetMovie.id === movieId
        })[0]
        watchlist.push(targetMovietObj)
        localStorage.setItem("watchlist",JSON.stringify(watchlist));
    }

  
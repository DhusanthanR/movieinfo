document.addEventListener('DOMContentLoaded', function onReady(){
    
  loadMovies();

  document.getElementById('search-form').addEventListener('submit', function onSearchSubmit(e){
    // Step 1: Get the form value

    /**
     * Step 2: Invoke the API - http://www.omdbapi.com/?apikey=<api-key> and retrieve the post list
     *         After the response returned - update the details into the div ( with "movies" id ) 
     * */ 
      e.preventDefault();
      const search = document.getElementById('search-text').value;
      let fetchData = async () => {
        let res = await fetch(`http://www.omdbapi.com/?apikey=e54db17c&s=${search}`);
         return await res.json();
      }
      fetchData().then(data => loadMovies(data.Search));
  });

});


function loadMovies(movies){

  
  var output = '';

  movies.forEach(function(movie){
      output += `
      <div class="container">
        <div>
          <img class="object-fit-cover" src="${movie.Poster}">
          <h2 class="movie-title" >${movie.Title}</h2>
          <a class="view-details" onclick="movieSelected('${movie.imdbID}')" target="_blank" >Movie Details</a>
        </div>
      </div>
    `;
  })
  
  document.getElementById('movies').innerHTML = output;
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

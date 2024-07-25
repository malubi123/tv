document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const moviesContainer = document.getElementById('moviesContainer');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        if (query.length > 2) {
            searchMovies(query);
        }
    });

    function searchMovies(query) {
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}+full+movie&format=json`;

        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    function displayMovies(movies) {
        moviesContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <h2>${movie.title}</h2>
                <p><a href="${movie.url}" target="_blank">Watch Now</a></p>
            `;
            moviesContainer.appendChild(movieElement);
        });
    }
});

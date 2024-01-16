window.addEventListener('load', ()=> {
    movies = JSON.parse(localStorage.getItem('movies')) || [];  
    const newMovieForm = document.querySelector('#new-movie-form')

    // add a new movie to the form
    newMovieForm.addEventListener('submit', e=> {
        e.preventDefault();

        const movie = {
            title: e.target.elements.title.value,
            summary: e.target.elements.summary.value,
            rating: e.target.elements.rating.value,
            createdAt: new Date().getTime()
        }

        movies.push(movie);

        localStorage.setItem('movies', JSON.stringify(movies));

        // reset the form
        e.target.reset();

        DisplayMovies()
    })
    DisplayMovies()
})

// display the list of movies
function DisplayMovies () {
    const movieList = document.querySelector('#movie-list');
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const actions = document.createElement('div');
        const content = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        
        content.classList.add('movie-content');
        actions.classList.add('actions'); 
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `
        <input type="text" value="${movie.title}" readonly>
        <input type="text" value="${movie.summary}" readonly>
        <input type="number" value="${movie.rating}" readonly>
        `;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        movieItem.appendChild(content);
        movieItem.appendChild(actions);

        movieList.appendChild(movieItem);

        input.addEventListener('change', (e) => {
            localStorage.setItem('movies', JSON.stringify(movies));

            DisplayMovies()
        })

        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                movie.content = e.target.value;
                localStorage.setItem('movies', JSON.stringify(movies));
                DisplayMovies()
            })
        })

        deleteButton.addEventListener('click', (e) => {
            movies = movies.filter(t => t != movie);
            localStorage.setItem('movies', JSON.stringify(movies));
            DisplayMovies()
        })

    })
}
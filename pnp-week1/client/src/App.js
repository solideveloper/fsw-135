import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./components/Movie.js";
import MovieForm from "./components/MovieForm.js";

export default function App() {
  const [movies, setMovies] = useState([])

  function getMovies() {
    axios
      .get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response.data.errMsg));
  }

  function addMovie(newMovie) {
    axios
      .post("/movies", newMovie)
      .then(res => {
        setMovies(prevMovies => [...prevMovies, res.data]);
      })
      .catch(err => console.log(err.response.data.errMsg));
  }

  function deleteMovie(movieId) {
    axios
      .delete(`/movies/${movieId}`)
      .then(res => {
        setMovies(prevMovies =>
          prevMovies.filter(movie => movie._id !== movieId)
        );
      })
      .catch(err => console.log(err));
  }

  function editMovie(updates, movieId) {
    axios
      .put(`/movies/${movieId}`, updates)
      .then(res => {
        setMovies(prevMovies =>
          prevMovies.map(movie => (movie._id !== movieId ? movie : res.data))
        );
      })
      .catch(err => console.log(err));
  }

  function handleFilter(e) {
    if(e.target.value === 'reset') {
      getMovies()
    } else {
      axios.get(`/movies/search/genre?genre=${e.target.value}`)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <div className="movie-container">
        <MovieForm submit={addMovie} btnText="Add Movie" />

       

        <h4>Filter by Genre</h4>
        <select onChange={handleFilter} className="filter-form">
          <option value="Reset">All Movies</option>
          <option value="Action">Action</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Drama">Drama</option>
          <option value="Suspense">Suspense</option>
          <option value="Comedy">Comedy</option>
        </select>

        {movies.map(movie => (
          <Movie
            {...movie}
            key={movie.title}
            deleteMovie={deleteMovie}
            editMovie={editMovie}
          />
        ))}
      </div>

    </div>
  );
}
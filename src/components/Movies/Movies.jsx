import React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

const Movies = ({ movies, favorites }) => {
    return (
        <ul className="movies">
            {movies.map((movie) => (
                <li className="movies__item" key={movie.imdbID}>
                    <MovieItem 
                        title={movie.Title} 
                        type={movie.Type}
                        year={movie.Year} 
                        poster={movie.Poster} 
                        add={() => favorites(movie)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default Movies;

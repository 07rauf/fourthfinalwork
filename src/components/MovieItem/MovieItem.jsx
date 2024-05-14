import React from 'react';
import './MovieItem.css';

const MovieItem = ({ type, title, year, poster, add }) => {
    return (
        <article className="movie-item">
            <img className="movie-item__poster" src={poster} alt={title} />
            <div className="movie-item__info">
                <h3 className="movie-item__title">{title} ({year}) </h3>
                <p>Type:{type}</p><br></br>
                <button type="button" className="movie-item__add-button" onClick={add}>
                    Siyahıya Əlavə et
                </button>
            </div>
        </article>
    );
};

export default MovieItem;

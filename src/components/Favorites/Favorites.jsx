import React, { useState } from 'react';
import './Favorites.css';

const Favorites = ({ movies, removeFromlist, saveList, setName, savedLists }) => {
    const [inputName, setinputName] = useState('');

    const putName = (e) => {
        setinputName(e.target.value);
        setName(e.target.value);
    };

    return (
        <div className="favorites">
            <input
                type="text"
                className="favorites__name"
                placeholder="Siyahı adını daxil edin"
                value={inputName}
                onChange={putName}
            />
            <ol className="favorites__list">
                {movies.map((movie) => (
                    <li key={movie.imdbID}>
                        {movie.Title} ({movie.Year})
                        <button className="deletebutton" type="button" onClick={() => removeFromlist(movie.imdbID)}>
                            <span>CONFIRM DELETE</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ol>
            <button
                className="favorites__save"
                onClick={() => saveList(inputName)}
                disabled={!inputName.trim() || movies.length === 0}
            >
                Siyahını Yadda Saxla
            </button>
            {savedLists.length > 0 && (
                <div className="favorites__saved-lists">
                    <ol className='olclass'>
                        {savedLists.map((list, index) => (
                            <li key={index}>
                                <a href={list.link} target="_blank">{list.name}</a>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default Favorites;

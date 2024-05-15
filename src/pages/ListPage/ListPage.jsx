import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListPage.css';

const ListPage = () => {
    const { id } = useParams();
    const [state, setState] = useState({ title: '', movies: [] });

    useEffect(() => {
        const fetchList = async () => {
            const response = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`);
            const data = await response.json();
            const aboutMovie = await Promise.all(data.movies.map(movie => 
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=aa01eba0`)
                .then(response => response.json())
            ));
            setState({ title: data.title, movies:  aboutMovie});
        };

        fetchList();
    }, [id]);

    return (
        <div className="list-page">
            <h1 className="list-page__title">{state.title}</h1>
            <ul>
                {state.movies.map((item) => (
                    <li key={item.imdbID}>
                        <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank" rel="noopener noreferrer">
                            {item.Title} ({item.Year})
                        </a>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListPage;


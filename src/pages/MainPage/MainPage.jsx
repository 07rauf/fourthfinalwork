import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';
import './MainPage.css';

const MainPage = () => {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [title, setTitle] = useState('');
    const [savedLists, setSavedLists] = useState([]);

    const getId = async (ids) => {
        const movieId = ids.map(id => fetch(`https://www.omdbapi.com/?i=${id}&apikey=aa01eba0`).then(response => response.json()));
        const result = await Promise.all(movieId);
        setMovies(result.filter(movie => movie.Response === 'True'));
    };

    useEffect(() => {
        getId(['tt1092011', 'tt22208468', 'tt1193516']);
    }, []);

    const handleSearch = async (searchPart) => {
        let sectionID = `https://www.omdbapi.com/?i=${searchPart}&apikey=aa01eba0`;
        let sectionTitle = `https://www.omdbapi.com/?s=${searchPart}&apikey=aa01eba0`;   
        let response = await fetch(sectionID);
        let data = await response.json();
        if (data.Response === 'True') {
            setMovies([data]);
        } else {
            response = await fetch(sectionTitle);
            data = await response.json();
            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        }
    };

    const listaddToFavorites = (movie) => {
        if (!favorites.find(favorite => favorite.imdbID === movie.imdbID)) {
            setFavorites([...favorites, movie]);
        }
    };
    const listremoveToFavorites = (imdbID) => {
        setFavorites(favorites.filter(movie => movie.imdbID !== imdbID));
    };

    const saveList = async (listTitle) => {
        const response = await fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: listTitle,
                movies: favorites.map(movie => ({ imdbID: movie.imdbID }))
            })
        });
        const data = await response.json();
        setSavedLists([...savedLists, { name: listTitle, link: `http://localhost:5173/list/${data.id}` }]);
        setFavorites([]);
    };

    return (
        <div className="main-page">
            <Header />
            <main className="main-page__content">
                <section className="main-page__main-section">
                    <div className="main-page__search-box">
                        <SearchBox search={handleSearch} />
                    </div>
                    <div className="main-page__movies">
                        <Movies movies={movies} favorites={listaddToFavorites} />
                    </div>
                </section>
                <aside className="main-page__favorites">
                    <Favorites 
                        movies={favorites} 
                        removeFromlist={listremoveToFavorites} 
                        saveList={saveList} 
                        setName={setTitle} 
                        savedLists={savedLists} 
                    />
                </aside>
            </main>
        </div>
    );
};

export default MainPage;

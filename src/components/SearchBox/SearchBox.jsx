import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox = ({ search }) => {
    const [state, setState] = useState('');

    const searchLineChangeHandler = (e) => {
        setState(e.target.value);
    };

    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        search(state);
    };

    return (
        <div className="search-box">  
            <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
                <label className="search-box__form-label">
                    Filmi başlığa və ya ID-yə görə axtarın:
                    <input
                        value={state}
                        type="text"
                        className="search-box__form-input"
                        placeholder="Kutsal damacana yaxud tt1092011 "
                        onChange={searchLineChangeHandler}
                    />
                </label>
                <button
                    type="submit"
                    className="search-box__form-submit"
                    disabled={!state}
                >
                    Axtar
                </button>
            </form>
        </div>
    );
};

export default SearchBox;

import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import './Search.css'
import Cards from "./Cards"

function Search() {

    const [searchTerm, setSearchTerm] = useState('');
    const [movieData, setMovieData] = useState({});
    const [showCards, setShowCards] = useState(false)

    function getSearchTerm(event) {
        console.log(event.target.value)
        event.preventDefault()
        setShowCards(true)
        if (searchTerm === '') {
            setShowCards(false)
        }
        console.log(searchTerm)
    }


    useEffect(() => {
        fetch("http://www.omdbapi.com/?t=" + searchTerm + "&apikey=f9f23e7e").then(
            res => res.json()).then(
                data => setMovieData(data)
            )
            .catch(err => console.log(err))
    }, [searchTerm])



    return (
        <div>
            <form className="search">
                <SearchBar
                    value={searchTerm}
                    onChange={e => setSearchTerm(e)}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800
                    }}
                />

                <div className="searchButton">
                    <Button type="submit" onClick={getSearchTerm} color="primary" >Movie Search</Button>
                </div>
            </form>
            {showCards && (
                <Cards data={movieData}></Cards>
            )}

        </div>
    )
}

export default Search

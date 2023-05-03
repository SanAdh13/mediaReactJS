import React, {useState} from 'react';

import Search from './search';
const SearchMovie = () => {
    const [title,setTitle] = useState("");
    const [fetchData,setFetchData] = useState(false);
    const [searchSubmitted,setSearchSubmitted] = useState(false);
    const type = "movie";

    const handleSearch = () => {
        setFetchData(true);
        setSearchSubmitted(true);
      };
    // const opt = (event) => {
    //     setFetchData(!fetchData);
    //     setTitle(event.target.value);
    // }
    return(
        <>
            {!searchSubmitted && (
                <>
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Search for movie' />
                    <button onClick={handleSearch}>Search</button></>
            )}
                {fetchData && <Search mediaTitle={title} mediatype={type} />}
        </>     
            
        

    )

}

export default SearchMovie;
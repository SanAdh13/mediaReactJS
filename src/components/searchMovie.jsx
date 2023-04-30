import React, {useState} from 'react';

import Search from './search';
const SearchMovie = () => {
    const [title,setTitle] = useState("");
    const [fetchData,setFetchData] = useState(false);
    const type = "movie";


    // const opt = (event) => {
    //     setFetchData(!fetchData);
    //     setTitle(event.target.value);
    // }
    return(
        <div className="Movie">
            {!fetchData && (
                <><input type="text" value={title} onChange={e => { setTitle(e.target.value); } } placeholder='Search for movie' />
                <button onClick={() => setFetchData(true)}>Search</button></>
            )}        
            {/* { fetchData && <Search mediaTitle={title} mediatype={type} />} */}
        
        </div> 

            


    )

}

export default SearchMovie;
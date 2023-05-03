import React, {useState} from 'react';

import Search from './search';

const SearchTV = () =>{
    const [tvTitle,setTVTitle] = useState("");
    const [fetchData,setFetchData] = useState(false);
    const [searchSubmitted,setSearchSubmitted] = useState(false);
    const type = "series"

    const handleSearch = () => {
        setFetchData(true);
        setSearchSubmitted(true);
      };
    return(
        <div className='searchByTV'>
            {!searchSubmitted &&(
                <>
                    <input type="text" value={tvTitle} onChange={e => setTVTitle(e.target.value)} placeholder='Search for a TV show'/>
                    <button onClick={handleSearch}>Search</button>
                </>                     
            )}
            {fetchData && <Search mediaTitle={tvTitle} mediatype={type}/>}
        </div>
    )


}
export default SearchTV;

import React, {useState} from 'react';

import Search from './search';

const SearchTV = () =>{
    const [tvTitle,setTVTitle] = useState("");
    const [fetchData,setFetchData] = useState(false);
    const type = "series"

    return(
        <div className='searchByTV'>
            {!fetchData &&(
                <>
                    <input type="text" value={tvTitle} onChange={e => setTVTitle(e.target.value)} placeholder='Search for a TV show'/>
                    <button onClick={() => setFetchData(true)}>Search</button>
                </>                     
            )}
            {fetchData && <Search mediaTitle={tvTitle} mediatype={type}/>}

           
        </div>
    )


}
export default SearchTV;

/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import {AP} from "./apikey";


const Search = (props) => {
    const {mediaTitle,mediatype} = props;
    const [mediaData, setMediaData] = useState([]);
    
    fetch(`http://www.omdbapi.com/?s=${mediaTitle}&type=${mediatype}&apikey=${AP}`)
      .then(response => response.json())
      .then(data =>{
        const result = data.Search || [];
        const numberofpages = parseInt(data.totalResults) || 0;
        const finalResults = result.concat();
        for (let page = 2; page <= Math.ceil(numberofpages/10); page++) {
          fetch(`http://www.omdbapi.com/?s=${mediaTitle}&type=${mediatype}&apikey=${AP}&page=${page}`)
            .then(response => response.json())
            .then(data=>{
              finalResults.push(...data.Search);
              setMediaData(finalResults);
            })
            .catch(error => console.error(error));       
        }
        setMediaData(finalResults);
      })
      .catch(error=>console.error(error))

    

      // fetch(`http://www.omdbapi.com/?s=${mediaTitle}&type=${mediatype}&apikey=${AP}`)
      //   .then(response => response.json())
      //   .then(data =>{
      //     const result = data.Search || [];
      //     const numberofpages = parseInt(data.totalResults) || 0;
      //     const finalResults = result.concat();
      //     //the first response will give us page 1 so no need to call page 1 again
      //     var page = 2;
      //     while (page<=Math.ceil(numberofpages/10)) {
      //       fetch(`http://www.omdbapi.com/?s=${mediaTitle}&type=${mediatype}&apikey=${AP}&page=${page}`)
      //         .then(response => response.json())
      //         .then(data=>{
      //           finalResults.push(...data.Search);
      //           setMediaData(finalResults);
      //         })
      //         .catch(error => console.error(error));
      //       page++;
      //     }
      //     setMediaData(finalResults)  
      //   })
      //   .catch(error => console.error(error));
    // }



    return (
      <div>  
        <table>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Type</th>
            <th>Poster</th>
          </tr>
          { mediaData && mediaData.map(m =>(
              <tr>
                <td>{m.Title}</td>
                <td>{m.Year}</td>
                <td>{m.Type}</td>
                {/* <td>
                <img src={m.Poster} alt={`no poster`} />
                </td> */}
              </tr>
          ))}
          
        </table>

      </div>
    );
  
}

export default Search;
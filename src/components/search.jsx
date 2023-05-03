/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect , useRef } from 'react';
import {AP} from "./apikey";

import { BeatLoader } from "react-spinners";
import "./search.css"

const Search = (props) => {
    const {mediaTitle,mediatype} = props;
    const [mediaData, setMediaData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [scrollPosition, setScrollPosition] = useState(0);
    const mediaItemsRef = useRef(null);

    useEffect(() => {
      if (mediaItemsRef.current) {
        mediaItemsRef.current.scrollLeft = scrollPosition;
      }
    }, [scrollPosition]);
  
    const scrollLeft = () => {
      setScrollPosition(scrollPosition - 200);
    };
  
    const scrollRight = () => {
      setScrollPosition(scrollPosition + 200);
    };
   


    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);


        const response = await fetch(`http://www.omdbapi.com/?s=${mediaTitle}&type=${mediatype}&apikey=${AP}`);
        const data = await response.json();
        const result = data.Search || [];
        const numberofpages = Math.ceil(parseInt(data.totalResults)/10) || 0;
        const finalResults = result.concat();
  
        //the first response will give us page 1 so no need to call page 1 again
        for (let page = 2; page <= numberofpages; page++) {
          const response = await fetch(`http://www.omdbapi.com/?s=${mediaTitle}&type=${mediatype}&apikey=${AP}&page=${page}`);
          const data = await response.json();
          finalResults.push(...data.Search);
        }

        finalResults.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        setMediaData(finalResults);
        setLoading(false);
      };
      fetchData();
    }, [mediaTitle,mediatype]);
    
    return (
      <div className='MediaResult'>  
        {loading ? 
            (<> 
              <BeatLoader color={"#36D7B7"} loading={loading} size={25} />
            </> )
        :
          (
            <> 
            <div> 
              Search results for {mediaTitle}
            </div>

            <div className="media-container">
                <svg onClick={scrollLeft} opacity="0.75" className="arrow left-arrow" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill=""/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.37993 11.2059C7.36486 11.2209 7.35031 11.2363 7.33627 11.252C7.12998 11.4352 7 11.7024 7 12C7 12.2976 7.12998 12.5648 7.33627 12.748C7.3503 12.7637 7.36486 12.7791 7.37993 12.7941L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13L16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11L10.4142 11L11.7071 9.70711Z" fill="#323232"/>
                </svg> 
                <div className='MediaItems' ref={mediaItemsRef}> 
                    {mediaData && mediaData.map(m =>(
                          <div className='columnTab media' id={m.imdbID}>
                          <div className="poster" style={{ width: '160px', height: '240px', backgroundColor: '#ccc' , textAlign: 'center' }}>
                            <img src={m.Poster} alt="Poster Not available" onError={(e) => e.target.style.display = ''} />
                          </div>

                          <div className='movieCaption'>
                              <div className="truncate" title={m.Title}>{m.Title}</div>
                              <div className='movieTexts'>
                                <div>{m.Year}</div>   
                              </div>
                            </div>
                          </div>
                    ))}
                </div>
                <svg onClick={scrollRight} opacity="0.75" className="arrow right-arrow" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill=""/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12.2929 14.2929C11.9024 14.6834 11.9024 15.3166 12.2929 15.7071C12.6834 16.0976 13.3166 16.0976 13.7071 15.7071L16.6201 12.7941C16.6351 12.7791 16.6497 12.7637 16.6637 12.748C16.87 12.5648 17 12.2976 17 12C17 11.7024 16.87 11.4352 16.6637 11.252C16.6497 11.2363 16.6351 11.2209 16.6201 11.2059L13.7071 8.29289C13.3166 7.90237 12.6834 7.90237 12.2929 8.29289C11.9024 8.68342 11.9024 9.31658 12.2929 9.70711L13.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H13.5858L12.2929 14.2929Z" fill="#323232"/>
                </svg>
            </div>         
            </>
          )    
      }
      </div>
    );
  
}

export default Search;
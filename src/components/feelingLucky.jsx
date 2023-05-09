import React , {useEffect,useState} from 'react';
import { AP } from './apikey';
import { BeatLoader } from "react-spinners";
import countryEmoji from 'country-emoji';

import "./feelingLucky.css"

const FeelingLucky = () => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getRandomMovie();
    }, []);

    const getRandomMovie = async () => {
        setLoading(true);
        let imdbId = '';

        while (!imdbId) {
          const randomId = Math.floor(Math.random() * 9916766) + 1;
          imdbId = `tt${randomId.toString().padStart(7, '0')}`;

          // const response = await fetch(`http://www.omdbapi.com/?apikey=${AP}&i=${imdbId}&plot=full`);
          const response = await fetch(`http://www.omdbapi.com/?apikey=${AP}&t=batman&type=movie&plot=full`);
          const data = await response.json();

          if (data.Response === 'True' && data.Type === 'movie') {
              setMovie(data);
          } else {
              imdbId = '';
          }
        }
        setLoading(false);
    };

  return (
    <>
      {movie ? (
        <div className="container">
          <div className='RandomMovieContainer'>
          <div className="poster" style={{ width: '160px', height: '240px', backgroundColor: '' , textAlign: 'center' }}>
            <img src={movie.Poster} alt="Poster Not available" onError={(e) => e.target.style.display = ''} />
          </div>
          <div>{movie.Title}</div>
          <div>Year : {movie.Year}</div>
          <div>Director: {movie.Director}</div>
          <div>Genre: {movie.Genre}</div>
          <div>Plot: {movie.Plot}</div>
          <div>{movie.Country +"   " +countryEmoji.flag(movie.Country)}</div>
         
        </div>
        </div>
      ) : (
        <> <BeatLoader color={"#36D7B7"} loading={loading} size={25} /></>
      )}
    </>
  )
}
export default FeelingLucky;
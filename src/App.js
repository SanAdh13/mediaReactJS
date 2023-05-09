
import './App.css';
import { useState } from 'react';

import SearchTV from "./components/searchTV"
import SearchMovie from "./components/searchMovie"
import FeelingLucky from './components/feelingLucky';

function App() {
  const [movieTitle, setMovieTitle] = useState(false);
  const [tvTitle, setTvTitle] = useState(false);
  const [randomMedia, setRandomMovie] = useState(false);

  const MovieOption = () => {setMovieTitle(true);setTvTitle(false);setRandomMovie(false);};

  const TVOption = () => {setMovieTitle(false);setTvTitle(true);setRandomMovie(false);};

  const RandomOption = () => {setMovieTitle(false);setTvTitle(false);setRandomMovie(true);};
  return (
    <div className="App">
          {!movieTitle && !tvTitle && !randomMedia && (
            <div className='Options'>
              <button onClick={MovieOption}>Search for Movies</button>
              <button onClick={TVOption}>Search for TV Show</button>
              <button onClick={RandomOption}>I'm feeling lucky</button>
            </div>
            )
          }
        <div className='MediaContainer'>
          {movieTitle && <SearchMovie />}
          {tvTitle && <SearchTV />}
        </div>
        <>
        {randomMedia && <FeelingLucky />}
        </>
    </div>
  );
}

export default App;

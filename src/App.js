
import './App.css';
import { useState } from 'react';

import SearchTV from "./components/searchTV"
import SearchMovie from "./components/searchMovie"
import FeelingLucky from './components/feelingLucky';

function App() {
  const [movieTitle, setMovieTitle] = useState(false);
  const [tvTitle, setTvTitle] = useState(false);
  const [randomMedia, setRandomMovie] = useState(false);

  const TVOption = () => {setMovieTitle(true);setTvTitle(false);setRandomMovie(false);};

  const MovieOption = () => {setMovieTitle(false);setTvTitle(true);setRandomMovie(false);};

  const RandomOption = () => {setMovieTitle(false);setTvTitle(false);setRandomMovie(true);};
  return (
    <div className="App">
        <div className='Options'>
        {!movieTitle && !tvTitle && !randomMedia && (
          <>
            <button onClick={TVOption}>Search for TV Show</button>
            <button onClick={MovieOption}>Search for Movies</button>
            <button onClick={RandomOption}>I'm feeling lucky</button>
          </>
          )
        }

        {tvTitle && <SearchMovie />}
        {randomMedia && <FeelingLucky />}
        {movieTitle && <SearchTV />}
          
          
        </div>
    </div>
  );
}

export default App;

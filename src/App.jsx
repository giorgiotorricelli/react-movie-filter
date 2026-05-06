import { useState } from 'react'
import { useEffect } from 'react';

const initialMovies = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' }
]


function App() {
  const [selectValue, setSelectValue] = useState('');
  const [movieList, setMovieList] = useState(initialMovies);
  const [movieDisplayed, setMovieDisplayed] = useState(movieList);

  useEffect(() => {
    console.log(`scelto genere ${selectValue}`)  // setup callback
    if (selectValue !== '') { 
      const filteredByGenre = movieList.filter(movie => { //con questa vado a filtrare per genere avendo il genere scelto in selectValue
        return movie.genre === selectValue;
      });

      setMovieDisplayed(filteredByGenre);
    } else {  //se il selectValue è vuoto voglio che venga visualizzata l'intera lista
      setMovieDisplayed(movieList);
    }







    return () => {  // cleanup callback
      console.log(`uscito dal genere ${selectValue}`)
    }
  }, [selectValue]);

  function selectChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    setSelectValue(value);
  }


  return <>
    <div className="main-wrapper d-flex align-items-center flex-column">
      <button className='btn btn-primary' onClick={() => {setSelectValue(''); console.log(selectValue);
      }}>Lista completa</button>
      <select value={selectValue} onChange={selectChangeHandler} name="genres" id="genres">
        <option value="Fantascienza">Fantascienza</option>
        <option value="Thriller">Thriller</option>
        <option value="Romantico">Romantico</option>
        <option value="Azione">Azione</option>
      </select>
      <ul>
        {movieDisplayed.map(movie => {
          const randomId = crypto.randomUUID();
          return <li key={randomId}>{`Titolo: ${movie.title} - Genere: ${movie.genre}`}</li>
        })}
      </ul>
    </div>

  </>;
}

export default App

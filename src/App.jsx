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
  const [search, setSearch] = useState('');

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

    if (search !== '') {
      const filteredByName = movieList.filter(movie => { //con questa vado a filtrare per nome avendo il valore di search
        return movie.title.toLowerCase().includes(search);
      });

      setMovieDisplayed(filteredByName);
    } 



    return () => {  // cleanup callback
      console.log(`uscito dal genere ${selectValue}`)
    }
  }, [selectValue, search]);

  useEffect(() => {
    console.log(`valore del campo di ricerca: ${search}`);
    
  }, [search])

  function selectChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    setSelectValue(value);
  };


  function inputChangeHandler(event){
    const target = event.target;
    const value = target.value;
    setSearch(value);
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
      <form >
        <input type="text" />
        <input type="text" />
        <button>Aggiungi</button>
      </form>
      <h3>Cerca per nome</h3>
      <input type="text" value={search} onChange={inputChangeHandler}/> {/* questo sarà il mio live search */}
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

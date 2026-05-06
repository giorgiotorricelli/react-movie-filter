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
  const [newMovieData, setNewMovieData] = useState({ title: '', genre: '' }); //collegata agli input per aggiungere film nuovi

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
  }, [selectValue, search, movieList]);

  function selectChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    setSelectValue(value);
  };


  function inputChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    setSearch(value);
  };

  function submitNewMovieHandler(event) {
    event.preventDefault();
    setMovieList(prevList => [...movieList, newMovieData]);
    setNewMovieData({ title: '', genre: '' });
  };

  function changeNewMovieDataHandler(event) { //avendo assegnato la callback a due input diversi ho bisogno dell'event 
    const { name, value } = event.target; //mi prendo il valore del name e il valore del value dell'input targhetizzato
    setNewMovieData(prev => ({
      ...prev,       // copia i valori esistenti 
      [name]: value  // aggiorna solo il campo che sta cambiando
    }));

  };


  return <>
    <div className="main-wrapper d-flex align-items-center flex-column">
      <button className='btn btn-primary' onClick={() => {
        setSelectValue(''); console.log(selectValue);
      }}>Lista completa</button>
      <select value={selectValue} onChange={selectChangeHandler} name="genres" id="genres">
        <option value="Fantascienza">Fantascienza</option>
        <option value="Thriller">Thriller</option>
        <option value="Romantico">Romantico</option>
        <option value="Azione">Azione</option>
      </select>
      <form onSubmit={submitNewMovieHandler}>
        <input type="text" placeholder='titolo' name='title' value={newMovieData.title} onChange={changeNewMovieDataHandler} />
        <input type="text" placeholder='genere' name='genre' value={newMovieData.genre} onChange={changeNewMovieDataHandler} />
        <button type='submit' className='btn btn-primary'>Aggiungi</button>
      </form>
      <h3>Cerca per nome</h3>
      <input type="text" value={search} onChange={inputChangeHandler} /> {/* questo sarà il mio live search */}
      <ul>
        {movieDisplayed.map(movie => {
          const randomId = crypto.randomUUID();
          return <li key={randomId}>{`Titolo: ${movie.title} - Genere: ${movie.genre}`}</li>
        })}
      </ul>
    </div>
    <p>{JSON.stringify(newMovieData)}</p>

  </>;
}

export default App

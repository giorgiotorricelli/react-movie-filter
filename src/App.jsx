import { useState } from 'react'
import { useEffect } from 'react';

const initialMovies = [
  { title: 'Inception', genre: 'Fantascienza' },
  { title: 'Il Padrino', genre: 'Thriller' },
  { title: 'Titanic', genre: 'Romantico' },
  { title: 'Batman', genre: 'Azione' },
  { title: 'Interstellar', genre: 'Fantascienza' },
  { title: 'Pulp Fiction', genre: 'Thriller' },
  { title: 'The Matrix', genre: 'Fantascienza' },
  { title: 'The Dark Knight', genre: 'Azione' },
  { title: 'Forrest Gump', genre: 'Romantico' },
  { title: 'Il Silenzio degli Innocenti', genre: 'Thriller' },
  { title: 'Avatar', genre: 'Fantascienza' },
  { title: 'Mission Impossible', genre: 'Azione' },
  { title: 'La La Land', genre: 'Romantico' },
  { title: 'Se7en', genre: 'Thriller' },
  { title: 'Dune', genre: 'Fantascienza' },
  { title: 'John Wick', genre: 'Azione' },
  { title: 'Pride and Prejudice', genre: 'Romantico' },
  { title: 'Mystic River', genre: 'Thriller' },
  { title: 'Blade Runner', genre: 'Fantascienza' },
  { title: 'Mad Max Fury Road', genre: 'Azione' },
  { title: 'The Notebook', genre: 'Romantico' },
  { title: 'Zodiac', genre: 'Thriller' },
  { title: 'The Fifth Element', genre: 'Fantascienza' },
  { title: 'Die Hard', genre: 'Azione' },
  { title: 'Breakfast at Tiffany\'s', genre: 'Romantico' },
  { title: 'Shutter Island', genre: 'Thriller' }
]


function App() {
  const [selectValue, setSelectValue] = useState('');
  const [movieList, setMovieList] = useState(initialMovies);
  const [movieDisplayed, setMovieDisplayed] = useState(movieList);
  const [search, setSearch] = useState('');
  const [dangerText, setDangerText] = useState('');
  const [newMovieData, setNewMovieData] = useState({ title: '', genre: 'Fantascienza' }); //collegata agli input per aggiungere film nuovi

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

    if (newMovieData.title.trim() === '') {
      setDangerText('NON PUOI INSERIRE UN TITOLO VUOTO');
    } else {
      setMovieList(prevList => [...movieList, newMovieData]);
      setNewMovieData({ title: '', genre: 'Fantascienza' });
    }

  };

  function changeNewMovieDataHandler(event) { //avendo assegnato la callback a due input diversi ho bisogno dell'event 
    const { name, value } = event.target; //mi prendo il valore del name e il valore del value dell'input targhetizzato
    setNewMovieData(prev => ({
      ...prev,       // copia i valori esistenti 
      [name]: value  // aggiorna solo il campo che sta cambiando
    }));
  };

  function toggleDangerText() {
    setDangerText('');
    setNewMovieData({ title: '', genre: newMovieData.genre });
  }


  return <>
    <div className="main-wrapper d-flex align-items-center flex-column justify-content-between">
      <div className="upper d-flex align-items-start align-items-center mt-2">
        <div className="search-by-name">
          <h4 className='text-white'>Cerca per nome</h4>
          <input className='search-input' type="text" value={search} onChange={inputChangeHandler} onClick={() => { setSelectValue('') }} /> {/* questo sarà il mio live search */}
        </div>
        <div className="search-by-genre">
          <h4>Cerca per genere</h4>
          <select value={selectValue} onChange={selectChangeHandler} name="genres" id="genres" className='select w-100'>
            <option value="Fantascienza">Fantascienza</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantico">Romantico</option>
            <option value="Azione">Azione</option>
          </select>
        </div>

      </div>
      <div className="list-wrapper d-flex flex-column align-items-center">
        <ul>
          {movieDisplayed.map(movie => {
            const randomId = crypto.randomUUID();
            return <li key={randomId}>{`Titolo: ${movie.title} - Genere: ${movie.genre}`}</li>
          })}
        </ul>
        <button className='btn complete-list-btn mt-3 ' onClick={() => { setSelectValue(''); }}>Lista completa</button>
      </div>


      <div className="at-bottom position-relative mb-2">
        <p className='text-danger position-absolute'>{dangerText}</p>
        <form onSubmit={submitNewMovieHandler} className='d-flex flex-column align-items-center'>
          <div className='d-flex'>
            <input className='new-movie-title w-50' type="text" placeholder='titolo' name='title' value={newMovieData.title} onClick={toggleDangerText} onChange={changeNewMovieDataHandler} required />
          <select className='select w-50' name='genre' value={newMovieData.genre} onChange={changeNewMovieDataHandler}>
            <option value="Fantascienza">Fantascienza</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantico">Romantico</option>
            <option value="Azione">Azione</option>
          </select>
          </div>
          
          <div>
            <button type='submit' className='btn btn-primary d-block aggiungi-btn'>Aggiungi</button>
          </div>
          
        </form>
        
      </div>

    </div>


  </>;
}

export default App

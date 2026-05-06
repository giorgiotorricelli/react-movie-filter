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
  const [selectValue, setSelectValue] = useState('Fantascienza');
  // const [movieGenre, setMovieGenre] = useState(selectValue)

  useEffect(() => {
    console.log(`scelto genere ${selectValue}`)  // setup callback
    return () => {  // cleanup callback
      console.log(`uscito dal genere ${selectValue}`)
    } 
  }, [selectValue]);

  function selectChangeHandler(event){
    const target = event.target;
    const value = target.value;
    setSelectValue(value);
  }


  return <>
    <div className="main-wrapper d-flex justify-content-center">
      <select value={selectValue} onChange={selectChangeHandler} name="genres" id="genres">
        <option value="Fantascienza">Fantascienza</option>
        <option value="Thriller">Thriller</option>
        <option value="Romantico">Romantico</option>
        <option value="Azione">Azione</option>
      </select>
      <p>{selectValue}</p>
    </div>
  </>;
}

export default App

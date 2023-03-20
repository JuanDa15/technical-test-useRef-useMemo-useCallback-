import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'

function App () {
  const { movies } = useMovies()
  // https://www.omdbapi.com?apiKey={api}&s={query}
  // key: 4287ad07
  return (
    <>
      <header>
        <h1>Movie's finder</h1>
        <form className='form'>
          <input type='text' placeholder='Avengers, Star wars...' />
          <button type='submit'>
            Search
          </button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App

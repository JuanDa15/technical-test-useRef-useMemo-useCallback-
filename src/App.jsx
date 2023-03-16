import { useEffect } from 'react'
import './App.css'
import withResults from './mocks/with-results.json'
import withNoResults from './mocks/no-results.json'

function App () {
  const hasMovies = withResults.totalResults > 0
  useEffect(() => {
    // https://www.omdbapi.com?apiKey={api}&s={query}
    // key: 4287ad07
  }, [])
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
        {
          hasMovies
            ? (
                withResults.Search.map(result =>
                  <article key={result.imdbID}>
                    <h2>{result.Title}</h2>
                    <figure>
                      <img src={result.Poster} alt={result.Title} width='300' />
                      <figcaption>{`${result.Type}, ${result.Year}`}</figcaption>
                    </figure>
                  </article>
                )
              )
            : (
              <p className='alert'>{withNoResults.Error}</p>
              )
        }
      </main>
    </>
  )
}

export default App

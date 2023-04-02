/* eslint-disable indent */
/* eslint-disable no-tabs */
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
	const [error, setError] = useState(null)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = search === ''
			return
		}
		if (search === '') {
			setError('No value provide')
			return
		}

		if (search.match(/^\d+$/)) {
			setError('Can search a movie with digits')
			return
		}

		if (search.length < 2) {
			setError('Should be at least 3 characters')
			return
		}

		setError(null)
	}, [search])
	return {
		search,
		updateSearch,
		error
	}
}
/**
 * useRef
 * Es un hook que permite crear una referencia mutable que persiste
 * durante todo el ciclo de vida del componente (su valor no
 * se reinicia), y tambien es muy util
 * para guardar cualquier valor que se pueda mutar como un id, un
 * elemento del dom, un contador. y cada vez que cambia no vuelve a
 * renderizar el componente que a diferencia del useState cada vez que
 * cambia renderiza el componente
 */
function App () {
  const [sort, setSort] = useState(false)
	const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
	const inputRef = useRef()

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 1000), [])

  const handleSort = () => {
    setSort(!sort)
  }
	const handleSubmit = (event) => {
		event.preventDefault()
		getMovies({ search })
	}

	const handleChange = (event) => {
		const value = event.target.value
		if (value.startsWith(' ')) return
    console.log(value)
		updateSearch(value)
    debouncedGetMovies(value)
	}

  return (
    <>
      <header>
        <h1>Movie's finder</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} ref={inputRef} type='text' name='query' placeholder='Avengers, Star wars...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>
            Search
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando ...</p> : <Movies movies={movies} />
        }
      </main>
    </>
  )
}

export default App

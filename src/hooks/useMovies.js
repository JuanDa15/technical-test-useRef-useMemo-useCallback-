import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'
/**
 * [useMemo]
 * Es para guardar un valor o recalcular un valor cada vez que
 * sus dependencia cambian
 */

/**
 * [useCallback]
 * Es lo mismo que el useMemo
 * pero pensado para funciones
 * por lo que sirve para simplificar la sintaxis, es
 * para guardar un valor o recalcular un valor cada vez que
 * sus dependencia cambian
 */
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [search])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}

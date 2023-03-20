import withResults from '../mocks/with-results.json'

export function useMovies () {
  const movies = withResults.Search
  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    type: movie.Type,
    poster: movie.Poster,
    year: movie.Year
  }))

  return { movies: mappedMovies }
}

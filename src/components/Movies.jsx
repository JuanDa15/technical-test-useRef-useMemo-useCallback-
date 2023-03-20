import withNoResults from '../mocks/no-results.json'
import './Movies.css'
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-tabs */
export function ListOfMovies ({ movies }) {
  return (
    <section>
      {
				movies.map(result =>
					<article key={result.id}>
						<h2>{result.title}</h2>
						<figure>
							<img src={result.poster} alt={result.title} width='300' />
							<figcaption>{`${result.type}, ${result.year}`}</figcaption>
						</figure>
					</article>
				)
			}
    </section>
  )
}

export function NoMoviesResult ({ error }) {
	return (
		<p className='alert'>{error}</p>
	)
}

export function Movies ({ movies }) {
	const hasMovies = movies.length > 0
	return (
		hasMovies
			? <ListOfMovies movies={movies} />
			: <NoMoviesResult error={withNoResults.Error} />
	)
}

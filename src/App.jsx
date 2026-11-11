import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import MovieList from './components/MovieList.jsx'
import { movies as sourceMovies } from './data/movies.js'
import { adaptMovie } from './utils/movieAdapter.js'
import { useDebounce } from './hooks/useDebounce.js'

const movies = sourceMovies.map(adaptMovie)

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (!toast) return undefined
    const timeoutId = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  function toggleFavorite(movieId) {
    const movie = movies.find((item) => item.id === movieId)
    const removing = favoriteIds.includes(movieId)
    setFavoriteIds((currentIds) => removing
      ? currentIds.filter((id) => id !== movieId)
      : [...currentIds, movieId])
    setToast(removing ? `${movie.title} se quitó de favoritos` : `${movie.title} se añadió a favoritos`)
  }

  const filteredMovies = useMemo(() => movies.filter((movie) => movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())), [debouncedSearchTerm])

  return (
    <div className="page-shell" id="inicio">
      <Header />
      <main>
        <Hero movie={movies[0]} />
        <MovieList movies={filteredMovies} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </main>
      <div className={`toast${toast ? ' toast--visible' : ''}`} role="status" aria-live="polite">{toast}</div>
      <Footer />
    </div>
  )
}

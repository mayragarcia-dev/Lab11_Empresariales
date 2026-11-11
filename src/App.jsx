import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Hero from './components/Hero/Hero.jsx'
import MovieList from './components/MovieList/MovieList.jsx'
import { movies as sourceMovies } from './data/movies.js'
import { adaptMovie } from './utils/movieAdapter.js'
import { useDebounce } from './hooks/useDebounce.js'
import PremieresSection from './components/PremieresSection/PremieresSection.jsx'

const movies = sourceMovies.map(adaptMovie)

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const favoriteCount = favoriteIds.length
  const activeSearchTerm = searchTerm === '' ? '' : debouncedSearchTerm

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

  const filteredMovies = useMemo(() => movies.filter((movie) => movie.title.toLowerCase().includes(activeSearchTerm.toLowerCase())), [activeSearchTerm])

  return (
    <div className="page-shell" id="inicio">
      <Header favoriteCount={favoriteCount} />
      <main>
        <Hero movie={movies[0]} hasFilter={searchTerm !== ''} onClearFilter={() => setSearchTerm('')} />
        <MovieList movies={filteredMovies} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <PremieresSection />
      </main>
      <div className={`toast${toast ? ' toast--visible' : ''}`} role="status" aria-live="polite">{toast}</div>
      <Footer />
    </div>
  )
}

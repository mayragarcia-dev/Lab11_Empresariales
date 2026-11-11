import { usePremieres } from '../../hooks/usePremieres.js'
import { useWindowSize } from '../../hooks/useWindowSize.js'
import PremiereSkeleton from '../PremiereSkeleton/PremiereSkeleton.jsx'
import PremieresCarousel from '../PremieresCarousel/PremieresCarousel.jsx'
import Button from '../Button/Button.jsx'
import './premieres-section.css'

export default function PremieresSection() {
  const { premieres, status, error, reload } = usePremieres()
  const { width } = useWindowSize()
  const columns = width < 720 ? 1 : width < 1000 ? 2 : 3

  return (
    <section className="movie-list-section premieres-section" id="proximamente" aria-labelledby="premieres-title">
      <div className="movie-list-section__intro">
        <div>
          <p className="u-eyebrow">PRÓXIMAMENTE</p>
          <h2 id="premieres-title">Historias por descubrir.</h2>
        </div>
        <p className="u-muted">Estrenos ficticios para la demostración del laboratorio.</p>
      </div>
      <div className="premieres-section__demo">
        <span>Simulación de carga:</span>
        <Button type="button" variant="outline" onClick={() => reload()}>Recargar estrenos</Button>
        <Button type="button" variant="outline" onClick={() => reload(true)}>Simular error</Button>
      </div>
      <div aria-busy={status === 'loading'}>
        {status === 'loading' && <PremiereSkeleton count={columns} />}
        {status === 'error' && (
          <div className="premieres-section__error">
            <p role="alert">{error}</p>
            <Button type="button" onClick={() => reload()}>Reintentar</Button>
          </div>
        )}
        {status === 'success' && <PremieresCarousel premieres={premieres} columns={columns} />}
      </div>
    </section>
  )
}

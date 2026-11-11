import useEmblaCarousel from 'embla-carousel-react'
import Button from '../Button/Button.jsx'

export default function PremieresCarousel({ premieres, columns }) {
  const [viewportRef, carousel] = useEmblaCarousel({ loop: true, align: 'start' })

  return (
    <div className="premieres-carousel" role="region" aria-roledescription="carrusel" aria-label="Próximos estrenos">
      <div className="premieres-carousel__controls">
        <Button type="button" onClick={() => carousel?.scrollPrev()} aria-label="Estreno anterior">← Anterior</Button>
        <Button type="button" onClick={() => carousel?.scrollNext()} aria-label="Estreno siguiente">Siguiente →</Button>
      </div>
      <div className="premieres-carousel__viewport" ref={viewportRef}>
        <div className="premieres-carousel__track" style={{ '--premiere-columns': columns }}>
          {premieres.map((movie, index) => (
            <article className="premieres-carousel__slide" key={movie.id} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${premieres.length}: ${movie.title}`}>
              <img src={movie.image} alt={`Póster de ${movie.title}`} loading="lazy" />
              <h3>{movie.title}</h3>
              <p>{movie.synopsis}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

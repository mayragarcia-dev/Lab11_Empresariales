export default function PremiereSkeleton({ count = 3 }) {
  return (
    <div role="status">
      <span className="u-sr-only">Cargando estrenos…</span>
      <div className="premiere-skeletons" style={{ '--premiere-columns': count }} aria-hidden="true">
        {Array.from({ length: count }, (_, index) => (
          <div className="premiere-skeleton" key={index}>
            <div className="premiere-skeleton__poster" />
            <div className="premiere-skeleton__line" />
            <div className="premiere-skeleton__line" />
          </div>
        ))}
      </div>
    </div>
  )
}

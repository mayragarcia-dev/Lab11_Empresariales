// Normalize source data into the movie model consumed by the UI.
export function adaptMovie(source) {
  return {
    id: String(source.id ?? source.imdbID ?? source.title),
    title: source.title ?? source.name ?? 'Película sin título',
    image: source.image ?? source.poster ?? source.posterUrl ?? '',
    synopsis: source.synopsis ?? source.overview ?? '',
    classification: source.classification ?? source.ratingLabel ?? 'NR',
    rating: Number(source.rating ?? source.score ?? 0),
    duration: source.duration ?? '',
    schedules: Array.isArray(source.schedules) ? source.schedules : [],
  }
}

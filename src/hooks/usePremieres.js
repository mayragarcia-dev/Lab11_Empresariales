import { useCallback, useEffect, useState } from 'react'
import { premieres as sourcePremieres } from '../data/premieres.js'
import { adaptMovie } from '../utils/movieAdapter.js'

export function usePremieres({ delay = 1200 } = {}) {
  const [request, setRequest] = useState({ attempt: 0, shouldFail: false })
  const [state, setState] = useState({ status: 'loading', premieres: [], error: null })

  const reload = useCallback((shouldFail = false) => {
    setState({ status: 'loading', premieres: [], error: null })
    setRequest((current) => ({ attempt: current.attempt + 1, shouldFail }))
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (request.shouldFail) {
        setState({ status: 'error', premieres: [], error: 'La petición simulada de estrenos falló. Pulsa Reintentar para volver a cargar los datos.' })
        return
      }
      setState({ status: 'success', premieres: sourcePremieres.map(adaptMovie), error: null })
    }, delay)

    return () => window.clearTimeout(timeoutId)
  }, [request, delay])

  return { ...state, reload }
}

import { act, cleanup, fireEvent, render, renderHook, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App.jsx'
import { usePremieres } from '../hooks/usePremieres.js'
import PremieresSection from '../components/PremieresSection/PremieresSection.jsx'

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('Premieres lifecycle', () => {
  it('loads adapted data, explains failures and recovers on retry', () => {
    const { result } = renderHook(() => usePremieres())
    expect(result.current.status).toBe('loading')
    act(() => vi.advanceTimersByTime(1200))
    expect(result.current.status).toBe('success')
    expect(result.current.premieres[0].title).toBe('Horizontes de Marte')
    act(() => result.current.reload(true))
    expect(result.current.status).toBe('loading')
    act(() => vi.advanceTimersByTime(1200))
    expect(result.current.status).toBe('error')
    expect(result.current.error).toContain('Reintentar')
    act(() => result.current.reload())
    act(() => vi.advanceTimersByTime(1200))
    expect(result.current.status).toBe('success')
  })

  it('cancels outdated requests and cleans up on unmount', () => {
    const { result, unmount } = renderHook(() => usePremieres())
    act(() => result.current.reload(true))
    act(() => vi.advanceTimersByTime(600))
    act(() => result.current.reload())
    act(() => vi.advanceTimersByTime(600))
    expect(result.current.status).toBe('loading')
    act(() => vi.advanceTimersByTime(600))
    expect(result.current.status).toBe('success')
    act(() => result.current.reload())
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('renders skeleton, carousel, error and retry controls', () => {
    render(<PremieresSection />)
    expect(screen.getByText('Cargando estrenos…')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1200))
    expect(screen.getByRole('region', { name: 'Próximos estrenos' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Simular error' }))
    expect(screen.queryByRole('region', { name: 'Próximos estrenos' })).not.toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1200))
    expect(screen.getByRole('alert')).toHaveTextContent('petición simulada')
    fireEvent.click(screen.getByRole('button', { name: 'Reintentar' }))
    act(() => vi.advanceTimersByTime(1200))
    expect(screen.getByRole('region', { name: 'Próximos estrenos' })).toBeInTheDocument()
  })
})

describe('Sibling communication', () => {
  it('updates the header count while filtering preserves favorites', () => {
    render(<App />)
    const header = within(screen.getByRole('banner'))
    fireEvent.click(screen.getByRole('button', { name: 'Añadir a favoritos: Duna: Parte Dos' }))
    expect(header.getByRole('status')).toHaveTextContent('Favoritas: 1')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Oppenheimer' } })
    act(() => vi.advanceTimersByTime(300))
    expect(header.getByRole('status')).toHaveTextContent('Favoritas: 1')
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar filtro' }))
    fireEvent.click(screen.getByRole('button', { name: 'Quitar de favoritos: Duna: Parte Dos' }))
    expect(header.getByRole('status')).toHaveTextContent('Favoritas: 0')
  })

  it('clears the input and results immediately and cancels pending search', () => {
    render(<App />)
    const listing = screen.getByRole('region', { name: 'Elige tu próxima historia.' })
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'Duna' } })
    act(() => vi.advanceTimersByTime(300))
    expect(within(listing).getAllByRole('article')).toHaveLength(1)
    fireEvent.change(input, { target: { value: 'no-matches' } })
    act(() => vi.advanceTimersByTime(100))
    fireEvent.click(screen.getByRole('button', { name: 'Limpiar filtro' }))
    expect(input).toHaveValue('')
    expect(within(listing).getAllByRole('article')).toHaveLength(8)
    act(() => vi.advanceTimersByTime(300))
    expect(within(listing).getAllByRole('article')).toHaveLength(8)
    fireEvent.change(input, { target: { value: 'no-matches' } })
    act(() => vi.advanceTimersByTime(300))
    expect(within(listing).getByText('No encontramos películas con ese título.')).toBeInTheDocument()
  })
})

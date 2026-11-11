import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false, media: query, addEventListener() {}, removeEventListener() {},
}))
class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', Observer)
vi.stubGlobal('IntersectionObserver', Observer)

import { useEffect } from 'react'

export function useArrowNavigation({ next, prev, enter, close }) {
  useEffect(() => {
    function handler(e) {
      switch (e.key) {
        case 'ArrowDown':
        case 'Tab':
          next()
          break
        case 'ArrowUp':
          prev()
          break
        case 'Enter':
          e.preventDefault()
          enter()
          break
        case 'Escape':
          close()
          break
        default:
          break
      }
    }
    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [next, prev, enter, close])
}

import { useEffect } from 'react'

export function useKeyboardShortcut(
  keyMap,
  { withMetaKey, event } = { withMetaKey: false, event: 'keypress' },
) {
  useEffect(() => {
    function handler(e) {
      if (withMetaKey && !e.metaKey) {
        return
      }

      const callback = keyMap[e.key]
      if (callback) {
        callback()
      }
    }
    document.addEventListener(event, handler)

    return () => {
      document.removeEventListener(event, handler)
    }
  })
}

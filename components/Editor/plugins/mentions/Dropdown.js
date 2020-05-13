import { forwardRef } from 'react'
import Portal from 'components/Portal'

export default forwardRef(({ options, selectedIndex }, ref) => (
  <Portal>
    <div
      ref={ref}
      className="div-block-895"
      style={{
        top: '-9999px',
        left: '-9999px',
        position: 'absolute',
        zIndex: 1,
        width: 'fit-content',
        marginTop: 8,
      }}
    >
      {options.map((char, i) => (
        <div
          key={char.name}
          className={`div-block-827-copy-copy ${
            i === selectedIndex ? 'ok' : ''
          }`}
        >
          <div className="text-block-199">{char.name}</div>
        </div>
      ))}
    </div>
  </Portal>
))

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
      <div className="open2-copy-copy">
        <div className="div-block-827 nou gac">
          <div className="text-block-199 allcaps">Ants</div>
        </div>
      </div>
      {options.map((cmd, i) => {
        const isSelected = i === selectedIndex

        return (
          <div
            key={cmd.name}
            data-ix="new-interaction-21"
            className={`avablock fla ${isSelected ? 'sck' : ''}`}
          >
            <div className="div-block-886">
              <div className="text-block-209">{cmd.name}</div>
            </div>
          </div>
        )
      })}
    </div>
  </Portal>
))

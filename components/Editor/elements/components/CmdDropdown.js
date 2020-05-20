import { forwardRef } from 'react'
import Portal from 'components/Portal'
import RhymesDropdown from '../cmds/RhymesDropdown'

export default forwardRef(({ cmds, selectedIndex, cmdMode }, ref) => {
  return (
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
          maxHeight: 291,
          overflow: 'auto',
        }}
      >
        {cmdMode === 'init' && (
          <>
            <div className="open2-copy-copy">
              <div className="div-block-827 nou gac">
                <div className="text-block-199 allcaps">Cmd</div>
              </div>
            </div>
            {cmds.map((cmd, i) => {
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
          </>
        )}
        {cmdMode === 'rhymes' && (
          <RhymesDropdown selectedIndex={selectedIndex} />
        )}

        {cmdMode === 'synonyms' && (
          <>
            <div className="open2-copy-copy">
              <div className="div-block-827 nou gac">
                <div className="text-block-199 allcaps">Synonyms</div>
              </div>
            </div>
            <div
              data-ix="new-interaction-21"
              className={`avablock fla ${selectedIndex === 0 ? 'sck' : ''}`}
            >
              <div className="div-block-886">
                <div className="text-block-209">Odd</div>
              </div>
            </div>
            <div
              data-ix="new-interaction-21"
              className={`avablock fla ${selectedIndex === 1 ? 'sck' : ''}`}
            >
              <div className="div-block-886">
                <div className="text-block-209">Weird</div>
              </div>
            </div>
          </>
        )}
      </div>
    </Portal>
  )
})

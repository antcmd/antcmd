import { useState } from 'react'
import { useSelected, useFocused } from 'slate-react'

export default ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()

  const active = false

  return (
    <span
      {...attributes}
      className="price"
      contentEditable={false}
      style={{
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
        width: 'fit-content',
        lineHeight: '28px',
        display: 'inline-block',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {element.character}
      {children}
      {/*
      <div
        className="div-block-895"
        style={{
          position: 'absolute',
          zIndex: 1,
          width: 'fit-content',
        }}
      >
        <div className={`div-block-827-copy-copy ${active ? 'ok' : ''}`}>
          <div className="text-block-199">1</div>
        </div>
        <div className={`div-block-827-copy-copy ${active ? 'ok' : ''}`}>
          <div className="text-block-199">1</div>
        </div>
        <div className={`div-block-827-copy-copy ${active ? 'ok' : ''}`}>
          <div className="text-block-199">1</div>
        </div>
        <div className={`div-block-827-copy-copy ${active ? 'ok' : ''}`}>
          <div className="text-block-199">1</div>
        </div>
      </div>
      */}
    </span>
  )
}

// export default ({ attributes, children, element }) => {
//   const selected = useSelected()
//   const focused = useFocused()

//   return (
//     <span
//       {...attributes}
//       className="price"
//       contentEditable={false}
//       style={{
//         boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
//         width: 'fit-content',
//         lineHeight: '28px',
//         display: 'inline-block',
//         cursor: 'pointer',
//       }}
//     >
//       {element.character}
//       {children}
//     </span>
//   )
// }

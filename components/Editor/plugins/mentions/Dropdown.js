import { forwardRef } from 'react'
import useSWR from 'swr'
import { rapidApiFetcher, YAHOO_API_URL } from 'lib/fetch'
import Portal from 'components/Portal'

export default forwardRef(({ selectedIndex }, ref) => {
  const { data: { ResultSet: { Result: matches } = {} } = {} } = useSWR(
    `${YAHOO_API_URL}/market/auto-complete?lang=en&region=US&query=nbe`,
    rapidApiFetcher,
  )
  // console.log(data)

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
        }}
      >
        {matches ? (
          matches.map((char, i) => (
            <div
              key={char.name}
              className={`div-block-827-copy-copy ${
                i === selectedIndex ? 'ok' : ''
              }`}
            >
              <div className="text-block-199">{char.symbol}</div>
            </div>
          ))
        ) : (
          <div className="div-block-827-copy-copy">
            <div className="text-block-199">Loading...</div>
          </div>
        )}
      </div>
    </Portal>
  )
})

// export default forwardRef(({ options, selectedIndex }, ref) => (
//   <Portal>
//     <div
//       ref={ref}
//       className="div-block-895"
//       style={{
//         top: '-9999px',
//         left: '-9999px',
//         position: 'absolute',
//         zIndex: 1,
//         width: 'fit-content',
//         marginTop: 8,
//       }}
//     >
//       {options.map((char, i) => (
//         <div
//           key={char.name}
//           className={`div-block-827-copy-copy ${
//             i === selectedIndex ? 'ok' : ''
//           }`}
//         >
//           <div className="text-block-199">{char.name}</div>
//         </div>
//       ))}
//     </div>
//   </Portal>
// ))

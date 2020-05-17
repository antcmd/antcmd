import { useState } from 'react'
import useSWR from 'swr'
import { insightFetcher, YAHOO_FINANCE_API_URL } from 'lib/fetch'
import Tree from '../components/Tree'
const result1 = {
  glossary: {
    title: 'example glossary',
    GlossDiv: {
      title: 'S',
      GlossList: {
        GlossEntry: {
          ID: 'SGML',
          SortAs: 'SGML',
          GlossTerm: 'Standard Generalized Markup Language',
          Acronym: 'SGML',
          Abbrev: 'ISO 8879:1986',
          GlossDef: {
            para:
              'A meta-markup language, used to create markup languages such as DocBook.',
            GlossSeeAlso: ['GML', 'XML'],
          },
          GlossSee: 'markup',
        },
      },
    },
  },
}

export default ({ attributes, children, selectedIndex }) => {
  const [selectedCompany, setSelectedCompany] = useState(undefined)

  const query = children.props.node.children[0].text
  const { data: { ResultSet: { Result: matches } = {} } = {} } = useSWR(
    `${YAHOO_FINANCE_API_URL}/market/auto-complete?lang=en&region=US&query=${query}`,
    insightFetcher,
  )

  const { data: { finance: { result } = {} } = {} } = useSWR(
    () =>
      selectedCompany
        ? `${YAHOO_FINANCE_API_URL}/stock/v2/get-insights?symbol=${selectedCompany}`
        : null,
    insightFetcher,
  )

  console.log('data')
  console.log(result)
  console.log(matches)

  return (
    <div
      {...attributes}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        color: 'rgba(51,51,51,0.8)',
        marginBottom: 24,
        fontSize: '16px',
      }}
    >
      <div
        {...attributes}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: 'rgba(51,51,51,0.8)',
          marginBottom: 24,
          fontSize: '16px',
          height: 38,
        }}
      >
        <div className="div-block-878-copy" style={{ marginRight: 10 }}>
          <div>Stock</div>
        </div>
        {!selectedCompany ? (
          children
        ) : (
          <div className="price">{selectedCompany}</div>
        )}
        {!query && (
          <span
            className="text-field-2 ncod w-input"
            style={{
              color: '#dddddd',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              // color: 'grey',
            }}
          >
            Company
          </span>
        )}
      </div>
      {query && !selectedCompany && (
        <div
          className="div-block-895"
          contentEditable={false}
          style={{
            position: 'absolute',
            zIndex: 1,
            width: 'fit-content',
            marginTop: 48,
            maxHeight: '350px',
            overflow: 'scroll',
          }}
        >
          {matches ? (
            matches.map((char, i) => (
              <div
                key={char.name}
                className={`avablock fla ${i === selectedIndex ? 'sck' : ''}`}
                onClick={() => setSelectedCompany(char.symbol)}
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
      )}

      {/* result1 && <Tree data={result1} main={selectedCompany} /> */}
      {selectedCompany &&
        (result ? (
          <Tree data={result} main={selectedCompany} />
        ) : (
          <div>Loading...</div>
        ))}
    </div>
  )
}

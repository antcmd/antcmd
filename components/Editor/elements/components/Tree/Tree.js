import { memo, useState } from 'react'
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import { Global, Frame, Title, Content, toggle } from './styles'
import * as Icons from './icons'

const Tree = memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [bind, { height: viewHeight }] = useMeasure()
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
    },
  })
  const Icon =
    Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  return (
    <Frame>
      <Icon
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
      </Content>
    </Frame>
  )
})

const App = ({ attributes, children, data, selectedCompany }) => {
  console.log(data)

  // companySnapshot: {sectorInfo: "Technology", company: {…}, sector: {…}}

  return (
    <div
      {...attributes}
      style={{
        background: 'black',
        padding: '24px 16px',
        border: '1px rgba(0,0,0,.14)',
        borderRadius: '8px',
        backgroundColor: '#2c2c2c',
        boxShadow: '1px 1px 5px 0 rgba(0,0,0,.21)',
      }}
    >
      {children}
      <Tree name={selectedCompany} defaultOpen>
        <Tree name="Company snapshot">
          <Tree name="Sector info" />
          <Tree name="Company" />
          <Tree name="Sector" />
          <Tree name="sub-subtree with children">
            <Tree name="child 1" style={{ color: '#37ceff' }} />
            <Tree name="child 2" style={{ color: '#37ceff' }} />
            <Tree name="child 3" style={{ color: '#37ceff' }} />
            <Tree name="custom content">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'black',
                    borderRadius: 5,
                  }}
                />
              </div>
            </Tree>
          </Tree>
          <Tree name="hello" />
        </Tree>
        <Tree name="Instrument info">
          <Tree name="Technical events" />
          <Tree name="Key technicals" />
          <Tree name="Valuation" />
          <Tree name="Recommendation" />
        </Tree>
        <Tree name="Reports">
          <Tree name="1" />
          <Tree name="2" />
          <Tree name="3" />
          <Tree name="4" />
          <Tree name="5" />
          <Tree name="6" />
          <Tree name="7" />
        </Tree>
      </Tree>
    </div>
  )
}

export default App

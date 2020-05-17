import { memo, useState } from 'react'
import { useSpring, a } from 'react-spring'
import { useMeasure, usePrevious } from './helpers'
import { Frame, Title, Content, toggle } from './styles'
import * as Icons from './icons'

const Tree = memo(
  ({
    children,
    name,
    style,
    defaultOpen = false,
    contentStyle = {},
    iconStyle = {},
  }) => {
    const [isOpen, setOpen] = useState(defaultOpen)
    const previous = usePrevious(isOpen)
    const [bind, { height: viewHeight }] = useMeasure()
    const { height, opacity } = useSpring({
      from: { height: 0, opacity: 0 },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        // transform: `translate3d(${isOpen ? 0 : 36}px,0,0)`,
      },
    })
    const Icon =
      Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]

    return (
      <Frame>
        <Icon
          style={{ ...toggle, opacity: children ? 1 : 0.3, ...iconStyle }}
          onClick={() => setOpen(!isOpen)}
        />
        <Title style={style}>{name}</Title>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? 'auto' : height,
            ...contentStyle,
          }}
        >
          <a.div {...bind}>{children}</a.div>
          {/*
        <a.div style={{ transform }} {...bind}>
          {children}
        </a.div>
        */}
        </Content>
      </Frame>
    )
  },
)

export const TreePlainText = memo(
  ({
    children,
    name,
    style,
    defaultOpen = false,
    iconStyle = {},
    contentStyle = {},
    text,
  }) => {
    const [isOpen, setOpen] = useState(defaultOpen)
    const Icon =
      Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]

    return (
      <Frame>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Icon
            style={{
              ...toggle,
              opacity: children ? 1 : 0.3,
              width: '12px',
              minWidth: '12px',
              display: 'inline-block',
              ...iconStyle,
            }}
            onClick={() => setOpen(!isOpen)}
            contentEditable={false}
          />
          <Title style={style} contentEditable={false}>
            {`${name}: `}
            <span
              style={{
                // verticalAlign: ' middle',
                // marginLeft: 3,
                opacity: 0.8,
              }}
            >
              {text}
            </span>
          </Title>
        </div>
        <Content
          style={{
            display: isOpen ? 'block' : 'none',
            opacity: 1,
            height: 'min-content',
            ...contentStyle,
          }}
        >
          <div>{children}</div>
          {/*
        <a.div style={{ transform }} {...bind}>
          {children}
        </a.div>
        */}
        </Content>
      </Frame>
    )
  },
)

export default Tree

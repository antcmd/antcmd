import { forwardRef } from 'react'
import Portal from 'components/Portal'
import { animated, useTransition } from 'react-spring'

export default forwardRef(({ options, selectedIndex }, ref) => {
  const transitions = useTransition(
    options[selectedIndex],
    (option) => option.key,
    {
      from: { position: 'absolute', opacity: 0, top: 64 },
      enter: { opacity: 1, top: 0 },
      leave: { opacity: 0, top: -64 },
    },
  )

  return (
    <Portal>
      <div
        ref={ref}
        style={{
          top: '-9999px',
          left: '-9999px',
          position: 'absolute',
          zIndex: 1,
          padding: '3px',
          marginLeft: -100,
          fontSize: 48,
        }}
      >
        {transitions.map(({ item, key, props }) => (
          <animated.div
            key={key}
            style={{
              ...props,
              userSelect: 'none',
            }}
          >
            {item.emoji}
          </animated.div>
        ))}
      </div>
    </Portal>
  )
})

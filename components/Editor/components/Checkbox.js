import { useState } from 'react'
import { useEditor, useReadOnly, ReactEditor } from 'slate-react'
import { Transforms } from 'slate'
import { useSpring } from 'react-spring'
import useSound from 'use-sound'

import {
  Wrapper,
  CheckboxInput,
  VisibleContents,
  VisibleBox,
  Filled,
  Text,
} from 'styles/UI/Checkbox'

const size = 18

export default ({ attributes, children, element }) => {
  const [playOn] = useSound('/sounds/checkbox/pop-up-on.mp3', { volume: 0.25 })
  const [playOff] = useSound('/sounds/checkbox/pop-up-off.mp3', {
    volume: 0.25,
  })
  const [playActive] = useSound('/sounds/checkbox/pop-down.mp3', {
    volume: 0.25,
  })

  const editor = useEditor()
  const readOnly = useReadOnly()
  const { checked } = element

  const [active, setActive] = useState(false)

  const springConfig = {
    tension: 400,
    friction: 22,
    clamp: !checked,
  }

  // eslint-disable-next-line no-nested-ternary
  const filledScale = checked ? (active ? 1.4 : 1) : 0
  const filledSpring = useSpring({
    transform: `scale(${filledScale})`,
    config: springConfig,
  })

  const outlineScale = active ? 0.8 : 1
  const outlineSpring = useSpring({
    transform: `scale(${outlineScale})`,
    config: springConfig,
  })

  const onChange = (event) => {
    const path = ReactEditor.findPath(editor, element)
    Transforms.setNodes(editor, { checked: event.target.checked }, { at: path })
  }

  return (
    <div
      {...attributes}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}
    >
      <span contentEditable={false}>
        <Wrapper>
          <CheckboxInput
            checked={checked}
            onMouseDown={() => {
              setActive(true)
              playActive()
            }}
            onMouseUp={() => {
              setActive(false)
              if (checked) {
                playOff()
              } else {
                playOn()
              }
            }}
            onChange={onChange}
          />
          <VisibleContents>
            <VisibleBox style={{ width: size, height: size, ...outlineSpring }}>
              <Filled style={filledSpring} />
            </VisibleBox>
          </VisibleContents>
        </Wrapper>
      </span>
      <Text contentEditable={!readOnly} suppressContentEditableWarning>
        {children !== '' ? children : 'check me'}
      </Text>
    </div>
  )
}

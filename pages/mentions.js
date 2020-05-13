import { useMemo, useCallback, useRef, useEffect, useState } from 'react'
import { Editor, Transforms, Range, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, ReactEditor, withReact } from 'slate-react'

import { withMentions, insertMention } from 'components/Editor/plugins/mentions'
import Dropdown from 'components/Editor/plugins/mentions/Dropdown'
import Bot from 'components/Editor/plugins/mentions/Bot'
import Element from 'components/Editor/Element'
import bots from 'components/Editor/plugins/mentions/bots'
import initialValue from 'components/Editor/plugins/mentions/data'

const MentionExample = () => {
  const ref = useRef()
  const emojiRef = useRef()
  const [value, setValue] = useState(initialValue)
  const [target, setTarget] = useState()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    [],
  )

  const chars = bots
    .filter((c, i) =>
      search === ''
        ? c.name.toLowerCase().startsWith(search.toLowerCase())
        : true,
    )
    .slice(0, 10)

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
          case 'Tab':
            event.preventDefault()
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)
            insertMention(editor, chars[index].name)
            setTarget(null)
            break
          case 'Escape':
            event.preventDefault()
            setTarget(null)
            break
          default:
            break
        }
      }
    },
    [index, search, target],
  )

  useEffect(() => {
    if (target && chars.length > 0) {
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()

      const el = ref.current
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`

      const emojiEl = emojiRef.current
      emojiEl.style.top = `${rect.top + window.pageYOffset + 24}px`
      emojiEl.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, target])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '60%',
          marginTop: 128,
        }}
      >
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => {
            setValue(value)
            const { selection } = editor

            if (selection && Range.isCollapsed(selection)) {
              const [start] = Range.edges(selection)
              const wordBefore = Editor.before(editor, start, { unit: 'word' })
              const before = wordBefore && Editor.before(editor, wordBefore)
              const beforeRange = before && Editor.range(editor, before, start)
              const beforeText =
                beforeRange && Editor.string(editor, beforeRange)
              const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/)
              const after = Editor.after(editor, start)
              const afterRange = Editor.range(editor, start, after)
              const afterText = Editor.string(editor, afterRange)
              const afterMatch = afterText.match(/^(\s|$)/)

              if (beforeMatch && afterMatch) {
                setTarget(beforeRange)
                setSearch(beforeMatch[1])
                setIndex(0)
                return
              }

              if (beforeText === '@' && beforeRange) {
                setTarget(beforeRange)
                // setSearch(beforeMatch[1])
                // setIndex(0)
                return
              }
            }

            setTarget(null)
          }}
        >
          <Editable
            renderElement={renderElement}
            onKeyDown={onKeyDown}
            placeholder="Enter some text..."
          />
          {target && chars.length > 0 && (
            <Bot
              ref={emojiRef}
              emoji={chars[index].emoji}
              options={chars}
              selectedIndex={index}
            />
          )}
          {target && chars.length > 0 && (
            <Dropdown ref={ref} options={chars} selectedIndex={index} />
          )}
        </Slate>
      </div>
    </div>
  )
}

export default MentionExample

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Slate, Editable, ReactEditor, withReact } from 'slate-react'
import { Editor, Transforms, Range, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import Tone from 'tone'

import { withShortcuts } from './plugins/withShortcuts'
import { withChecklists } from './plugins/withCheckbox'
// import { withLayout } from './plugins/withLayout'
import { withMentions } from './plugins/withMentions'

import { insertNode } from './helpers/insertNode'

import ants from './elements/ants'
import Element from './elements/Element'
import Dropdown from './elements/components/Dropdown'
import Placeholder from './Editor.placeholder'

// { value, setValue, onSave }
const SlateEditor = () => {
  const ref = useRef()
  const [value, setValue] = useState([
    {
      type: 'title',
      children: [{ text: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Description' }],
    },
  ])
  const [target, setTarget] = useState()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const editor = useMemo(
    () =>
      withShortcuts(
        withChecklists(
          withReact(
            withHistory(withMentions(withReact(withHistory(createEditor())))),
          ),
        ),
      ),
    [],
  )

  useEffect(() => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume()
    }
  }, [])

  const antsFiltered = ants
    .filter((c, i) =>
      search === ''
        ? true
        : c.name.toLowerCase().startsWith(search.toLowerCase()),
    )
    .slice(0, 10)

  useEffect(() => {
    if (target && antsFiltered.length > 0) {
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()

      const el = ref.current
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [antsFiltered.length, editor, index, search, target])

  const isEmpty =
    value.length === 1 &&
    value[0].children[0] &&
    value[0].children[0].text === ''

  const toggleTextType = (textType) => {
    // Determine whether any of the currently selected blocks are bold
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === textType,
    })

    // Set the currently selected blocks type to 'bold'
    Transforms.setNodes(
      editor,
      { type: match ? 'paragraph' : textType },
      { match: (n) => Editor.isBlock(editor, n) },
    )
  }

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'b' && event.metaKey) {
        // Prevent default insert
        event.preventDefault()
        toggleTextType('bold')
        return
      }

      if (event.key === 'i' && event.metaKey) {
        // Prevent default insert
        event.preventDefault()
        toggleTextType('italic')
        return
      }

      if (target) {
        let type = 'mention'

        switch (event.key) {
          case 'ArrowDown':
          case 'Tab':
            event.preventDefault()
            const prevIndex = index >= antsFiltered.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? antsFiltered.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)

            if (antsFiltered[index].id === 'PI') {
              type = 'piano'
            }

            if (antsFiltered[index].id === 'IN') {
              type = 'insight'
            }

            if (antsFiltered[index].id === 'WE') {
              type = 'weather'
            }

            if (antsFiltered[index].id === 'AT') {
              type = 'airtable'
            }

            if (antsFiltered[index].id === 'TR') {
              type = 'tree'
            }

            insertNode(editor, type, antsFiltered[index].name)
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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue)
        const { selection } = editor

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection)
          const wordBefore = Editor.before(editor, start, { unit: 'word' })
          const before = wordBefore && Editor.before(editor, wordBefore)
          const beforeRange = before && Editor.range(editor, before, start)
          const beforeText = beforeRange && Editor.string(editor, beforeRange)
          const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/)
          const after = Editor.after(editor, start)
          const afterRange = Editor.range(editor, start, after)
          const afterText = Editor.string(editor, afterRange)
          const afterMatch = afterText.match(/^(\s|$)/)

          if (beforeText === '/' && beforeRange) {
            setTarget(beforeRange)
            setSearch('')
            setIndex(0)
            return
          }

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange)
            setSearch(beforeMatch[1])
            setIndex(0)
            return
          }
        }

        setTarget(null)
      }}
    >
      {/*
        Editable content
      */}
      <Editable renderElement={renderElement} onKeyDown={onKeyDown} autoFocus />

      {/*
        You can't pass React element as the placeholder to the Slate (and we need complex
        placeholder with title and description). So we render Placeholder as component
        if content is empty
      */}
      {isEmpty && <Placeholder />}

      {/*
        https://docs.slatejs.org/walkthroughs/01-installing-slate
        You can think of the <Slate> component as providing a "controlled" context to every component underneath it.
        It can provide the editor state to other components like toolbars, menus, etc. using the useSlate hook.

        So we put a ant face here (to not be a part of an editor itself)
        <Ant />

        As well we might put inputs here (so after user has completed interaction
        with the ant and got the content, inputs (which were there to help) disappear)
        <Select />
      */}
      {target && antsFiltered.length > 0 && (
        <Dropdown ref={ref} options={antsFiltered} selectedIndex={index} />
      )}
    </Slate>
  )
}
// spellCheck

export default SlateEditor

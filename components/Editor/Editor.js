import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Slate, Editable, ReactEditor, withReact } from 'slate-react'
import { Editor, Transforms, Range, createEditor } from 'slate'
import { withHistory } from 'slate-history'

import { withShortcuts } from './plugins/withShortcuts'
import { withMentions } from './plugins/withMentions'
import { withLinks } from './plugins/withLinks'

import { insertNode } from './helpers/insertNode'

import ants from './elements/ants'
import cmds from './elements/cmds'

import Element from './elements/Element'

import Dropdown from './elements/components/Dropdown' // ants dropdown
import CmdDropdown from './elements/components/CmdDropdown'

// interface SlateEditor
//   value
//   setValue
//   onSave

const SlateEditor = () => {
  // editor state
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ])
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const editor = useMemo(
    () =>
      withShortcuts(
        withLinks(withReact(withHistory(withMentions(createEditor())))),
      ),
    [],
  )

  // state for ants dropdown. invoked by typing "/"
  const ref = useRef()
  const [target, setTarget] = useState()
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')

  const antsOptions = ants.filter((a) =>
    search === ''
      ? true
      : a.name.toLowerCase().startsWith(search.toLowerCase()),
  )

  useEffect(() => {
    if (target && antsOptions.length > 0) {
      const domRange = ReactEditor.toDOMRange(editor, target)
      const rect = domRange.getBoundingClientRect()

      const el = ref.current
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [antsOptions.length, editor, index, search, target])

  // state for cmd. dropdown. invoked by typing "."
  const cmdDropdownRef = useRef()
  const [cmdTarget, setCmdTarget] = useState()
  const [cmdIndex, setCmdIndex] = useState(0)
  const [cmdSearch, setCmdSearch] = useState('')
  const [cmdMode, setCmdMode] = useState('init')

  const cmdOptions = cmds.filter((c) =>
    cmdSearch === ''
      ? true
      : c.name.toLowerCase().startsWith(search.toLowerCase()),
  )

  useEffect(() => {
    if (cmdTarget && cmdOptions.length > 0) {
      const domRange = ReactEditor.toDOMRange(editor, cmdTarget)
      const rect = domRange.getBoundingClientRect()

      const el = cmdDropdownRef.current
      el.style.top = `${rect.top + window.pageYOffset + 24}px`
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [cmdOptions.length, editor, cmdIndex, cmdSearch, cmdTarget])

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

  // editor keydown listener
  const onKeyDown = useCallback(
    (event) => {
      // Toggle bold
      if (event.key === 'b' && event.metaKey) {
        event.preventDefault()
        toggleTextType('bold')
        return
      }

      // Toggle italic
      if (event.key === 'i' && event.metaKey) {
        event.preventDefault()
        toggleTextType('italic')
        return
      }

      // Set type to paragraph on new line
      // if (event.key === 'Enter') {
      //   Transforms.unsetNodes(editor)
      //   // Transforms.setNodes(editor, { type: 'paragraph' })
      // }

      // if ants dropdown is opened
      if (target) {
        const focusedAnt = antsOptions[index]
        let type = 'mention'

        switch (event.key) {
          case 'ArrowDown':
          case 'Tab':
            event.preventDefault()
            const prevIndex = index >= antsOptions.length - 1 ? 0 : index + 1
            setIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex = index <= 0 ? antsOptions.length - 1 : index - 1
            setIndex(nextIndex)
            break
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)

            if (focusedAnt.id === 'IN') {
              type = 'insight'
            }

            // TODO
            // on new line set type to paragraph

            insertNode(editor, type, focusedAnt.name)
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

      // if cmds dropdown is opened
      if (cmdTarget) {
        const focusedCmd = cmdOptions[cmdIndex]

        switch (event.key) {
          case 'ArrowDown':
          case 'Tab':
            event.preventDefault()
            const prevIndex =
              cmdIndex >= cmdOptions.length - 1 ? 0 : cmdIndex + 1
            setCmdIndex(prevIndex)
            break
          case 'ArrowUp':
            event.preventDefault()
            const nextIndex =
              cmdIndex <= 0 ? cmdOptions.length - 1 : cmdIndex - 1
            setCmdIndex(nextIndex)
            break
          case 'Enter':
            event.preventDefault()
            Transforms.select(editor, target)

            setCmdMode(focusedCmd.name.toLowerCase())

            setCmdSearch('')
            setCmdIndex(0)
            // insertNode(editor, 'mention', focusedCmd.name)
            // setTarget(null)
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
    [index, search, target, cmdIndex, cmdSearch, cmdTarget],
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

          if (beforeText && beforeText[beforeText.length - 2] === '.') {
            setCmdTarget(beforeRange)
            setCmdSearch('')
            if (afterMatch) {
              setSearch(afterMatch[1])
            }
            setCmdIndex(0)
            return
          }
        }
        setTarget(null)
      }}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        autoFocus
        placeholder=""
        style={{
          height: '100%',
          width: '100%',
          minHeight: '50vh',
        }}
      />

      {/*
        https://docs.slatejs.org/walkthroughs/01-installing-slate
        You can think of the <Slate> component as providing a "controlled" context to every component underneath it.
        It can provide the editor state to other components like toolbars, menus, etc. using the useSlate hook.

        So we put a ant face here (to not be a part of an editor itself)
        <Ant />

        As well we might put inputs here (so after user has completed interaction
        with the ant and got the content, inputs disappear)
        <Select />
      */}
      {target && antsOptions.length > 0 && (
        <Dropdown ref={ref} options={antsOptions} selectedIndex={index} />
      )}
      {cmdTarget && cmdOptions.length > 0 && (
        <CmdDropdown
          ref={cmdDropdownRef}
          cmds={cmdOptions}
          cmdMode={cmdMode}
          selectedIndex={cmdIndex}
        />
      )}
    </Slate>
  )
}
// spellCheck

export default SlateEditor

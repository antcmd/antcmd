import { useState, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Editor, Transforms } from 'slate'
import { withHistory } from 'slate-history'

import { withShortcuts } from './plugins/withShortcuts'
import { withChecklists } from './plugins/withCheckbox'
// import { withLayout } from './plugins/withLayout'

import Element from './components/Element'
import Placeholder from './components/Placeholder'

// { value, setValue, onSave }
const SlateEditor = () => {
  const editor = useMemo(
    () => withShortcuts(withChecklists(withReact(withHistory(createEditor())))),
    [],
  )
  const [value, setValue] = useState([
    {
      type: 'title',
      children: [{ text: 'hello' }],
    },
  ])
  const renderElement = useCallback((props) => <Element {...props} />, [])

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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      {/*
        Editable content
      */}
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === 'b' && event.metaKey) {
            // Prevent default insert
            event.preventDefault()
            toggleTextType('bold')
          }
          if (event.key === 'i' && event.metaKey) {
            // Prevent default insert
            event.preventDefault()
            toggleTextType('italic')
          }
        }}
        autoFocus
      />

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
    </Slate>
  )
}
// spellCheck

export default SlateEditor

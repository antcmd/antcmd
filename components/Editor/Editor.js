import React, { useState, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import { withShortcuts } from './plugins/withShortcuts'
import { withChecklists } from './plugins/withCheckbox'
import { withLayout } from './plugins/withLayout'

import Element from './Element'
import Placeholder from './Placeholder'

// { content: value, setContent: setValue }
const SlateEditor = () => {
  const [value, setValue] = useState([
    {
      type: 'title',
      children: [{ text: '' }],
    },
  ])
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const editor = useMemo(
    () => withShortcuts(withChecklists(withReact(withHistory(createEditor())))),
    [],
  )

  const isEmpty = value[0] && value[0].children[0].text === ''

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      {isEmpty && <Placeholder />}
      <Editable renderElement={renderElement} autoFocus />
    </Slate>
  )
}
// spellCheck

export default SlateEditor

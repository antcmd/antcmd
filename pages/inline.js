import React, { useState, useMemo } from 'react'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'

import {
  withLinks,
  insertLink,
  isLinkActive,
} from 'components/Editor/plugins/withLinks'

import { Button, Icon } from 'components/inline'

const initialValue = [
  {
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
      },
      {
        text: '!',
      },
    ],
  },
  {
    children: [
      {
        text:
          'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.',
      },
    ],
  },
]

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'link':
      return (
        <a {...attributes} style={{ color: 'red' }} href={element.url}>
          {children}
        </a>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const LinkExample = () => {
  const [value, setValue] = useState(initialValue)
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    [],
  )

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        renderElement={(props) => <Element {...props} />}
        placeholder="Enter some text..."
      />
    </Slate>
  )
}

export default LinkExample

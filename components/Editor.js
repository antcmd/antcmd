import React, { useState, useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor, Transforms, Range, Point, Node, createEditor } from 'slate'
import { withHistory } from 'slate-history'

const withLayout = (editor) => {
  const { normalizeNode } = editor

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const title = { type: 'title', children: [{ text: 'Untitled' }] }
        Transforms.insertNodes(editor, title, { at: path.concat(0) })
      }

      if (editor.children.length < 2) {
        const paragraph = { type: 'paragraph', children: [{ text: '' }] }
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
      }

      for (const [child, childPath] of Node.children(editor, path)) {
        const type = childPath[0] === 0 ? 'title' : 'paragraph'

        if (child.type !== type) {
          Transforms.setNodes(editor, { type }, { at: childPath })
        }
      }
    }

    return normalizeNode([node, path])
  }

  return editor
}

const SHORTCUTS = {
  '-': 'list-item',
  '>': 'block-quote',
  '#': 'title',
  '##': 'heading-two',
  '###': 'heading-three',
}

const initialValue = [
  {
    type: 'title',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
]

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(
          editor,
          { type },
          { match: (n) => Editor.isBlock(editor, n) },
        )

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: (n) => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}

const MarkdownShortcutsExample = () => {
  const [value, setValue] = useState(initialValue)
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const editor = useMemo(
    () => withShortcuts(withLayout(withReact(withHistory(createEditor())))),
    [],
  )

  const isEmpty = value[0].children[0].text === ''

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder={() => <div>placeholder</div>}
    >
      {isEmpty && (
        <div
          style={{
            position: 'fixed',
            zIndex: -1,
          }}
        >
          <div
            className="div-block-861"
            style={{ justifyContent: 'flex-start', paddingTop: 0 }}
          >
            <div>
              <div className="text-block-13-copy-copy edit2">
                Dear diary, share your feelings, secrets and doubts for today.
                <br />
              </div>
            </div>
          </div>
          <div className="div-blorgck-436-copy ren" style={{ marginLeft: 0 }}>
            <div>
              <div className="text-block-118 edia">
                This post will auto-publish in 6 minutes even if you leave. You
                can't delete or edit this post later.{' '}
              </div>
            </div>
          </div>
        </div>
      )}
      <Editable
        renderElement={renderElement}
        placeholder={() => <div>placeholder</div>}
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'title':
      return (
        <h1
          className="jsx-1887653563 text-block-13-copy-copy edit2"
          style={{ marginBottom: 48, color: 'rgba(0, 0, 0, 0.6)' }}
          {...attributes}
        >
          {children}
        </h1>
      )
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'paragraph':
      return (
        <p
          style={{
            color: 'rgba(51, 51, 51, 0.7)',
            marginBottom: 12,
          }}
          className="jsx-1887653563 text-block-118 edia"
          {...attributes}
        >
          {children}
        </p>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

export default MarkdownShortcutsExample

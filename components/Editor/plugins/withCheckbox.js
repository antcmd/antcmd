import { Editor, Transforms, Range, Point } from 'slate'

export const withChecklists = (editor) => {
  const { deleteBackward } = editor

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === 'checkbox',
      })

      if (match) {
        const [, path] = match
        const start = Editor.start(editor, path)

        if (Point.equals(selection.anchor, start)) {
          Transforms.setNodes(
            editor,
            { type: 'paragraph' },
            { match: (n) => n.type === 'checkbox' },
          )
          return
        }
      }
    }

    deleteBackward(...args)
  }

  return editor
}

import { Transforms } from 'slate'

export const insertNode = (editor, type, character) => {
  const node = { type, character, children: [{ text: '' }] }
  console.log('node')
  console.log(node)
  Transforms.insertNodes(editor, node)
  Transforms.move(editor)
}

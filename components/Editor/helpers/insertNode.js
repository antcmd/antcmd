import { Transforms } from 'slate'

export const insertNode = (editor, type, character) => {
  const mention = { type, character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

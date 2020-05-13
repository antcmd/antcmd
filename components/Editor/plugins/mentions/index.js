import { Transforms } from 'slate'

export const withMentions = (editor) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  return editor
}

export const insertMention = (editor, character) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] }
  Transforms.insertNodes(editor, mention)
  Transforms.move(editor)
}

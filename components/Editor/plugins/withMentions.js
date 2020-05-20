export const withMentions = (editor) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element) => {
    return element.type === 'mention' && element.type === 'insight'
      ? true
      : isInline(element)
  }

  editor.isVoid = (element) => {
    return element.type === 'mention' && element.type === 'insight'
      ? true
      : isVoid(element)
  }

  return editor
}

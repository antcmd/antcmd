export default [
  {
    children: [
      {
        text:
          'This example shows how you might implement a simple @-mentions feature that lets users autocomplete mentioning a user by their username. Which, in this case means Star Wars characters. The mentions are rendered as void inline elements inside the document.',
      },
    ],
  },
  {
    children: [
      { text: 'Try mentioning characters, like ' },
      {
        type: 'mention',
        character: 'R2-D2',
        children: [{ text: '' }],
      },
      { text: ' or ' },
      {
        type: 'mention',
        character: 'Mace Windu',
        children: [{ text: '' }],
      },
      { text: '!' },
    ],
  },
]

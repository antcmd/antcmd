const jake = {
  id: '1',
  name: 'Drag',
  url: 'http://adventuretime.wikia.com/wiki/Jake',
  avatarUrl:
    'https://react-beautiful-dnd.netlify.app/static/media/jake-min.cc34aede.png',
  colors: {
    soft: 'red',
    hard: 'blue',
  },
}

const BMO = {
  id: '2',
  name: 'Rename',
  url: 'http://adventuretime.wikia.com/wiki/BMO',
  avatarUrl:
    'https://react-beautiful-dnd.netlify.app/static/media/jake-min.cc34aede.png',
  colors: {
    soft: 'red',
    hard: 'blue',
  },
}

const finn = {
  id: '3',
  name: 'Click',
  url: 'http://adventuretime.wikia.com/wiki/Finn',
  avatarUrl:
    'https://react-beautiful-dnd.netlify.app/static/media/jake-min.cc34aede.png',
  colors: {
    soft: 'red',
    hard: 'blue',
  },
}

export const authors = [jake, BMO, finn]

export const quotes = [
  {
    id: '1',
    content: 'Development',
    author: BMO,
  },
  {
    id: '2',
    content: 'Design',
    author: jake,
  },
  {
    id: '3',
    content: "You got to focus on what's real, man",
    author: jake,
  },
  {
    id: '4',
    content: 'Marketing',
    author: finn,
  },
  {
    id: '5',
    content: 'Homies help homies. Always',
    author: finn,
  },
  {
    id: '8',
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: finn,
  },
  {
    id: '9',
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: finn,
  },
]

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1

export const getQuotes = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)]

    const custom = {
      ...random,
      id: `G${idCount++}`,
    }

    return custom
  })

export const getAuthors = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = authors[Math.floor(Math.random() * authors.length)]

    const custom = {
      ...random,
      id: `author-${idCount++}`,
    }

    return custom
  })

const getByAuthor = (author, items) =>
  items.filter((quote) => quote.author === author)

export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {},
)

export const generateQuoteMap = (quoteCount) =>
  authors.reduce(
    (previous, author) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / authors.length),
    }),
    {},
  )

import gql from 'graphql-tag'

export const SAVE_NOTE = gql`
  mutation saveNote($title: String!, $content: String!, $authorName: String!) {
    saveNote(title: $title, content: $content, authorName: $authorName) {
      id
      title
      content
      author {
        id
        name
      }
    }
  }
`

import React, { useState } from 'react'
import Router from 'next/router'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import Layout from 'components/Layout'
import { withApollo } from 'apollo/client'

const CreatePost = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $authorName: String!
  ) {
    createPost(title: $title, content: $content, authorName: $authorName) {
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

const getFirstTwoWords = (string) =>
  `${string.split(' ')[0]} ${string.split(' ')[1]}`

const Header = ({ content }) => (
  <>
    <div className="header">
      <div className="header__play" />
      <div className="header__text">
        {content.split(' ').length >= 3
          ? getFirstTwoWords(content)
          : 'New note'}
      </div>
    </div>
    <style jsx>
      {`
        .header {
        }
        .header__play {
        }
        .header__text {
        }
      `}
    </style>
  </>
)

const Textarea = ({ content, setContent }) => (
  <>
    <textarea
      autoFocus
      cols={50}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Content"
      rows={8}
      value={content}
    />
    <style jsx>
      {`
        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
      `}
    </style>
  </>
)

function Post() {
  const [content, setContent] = useState('')

  const [createPost, { loading, error, data }] = useMutation(CreatePost)

  console.log(loading)
  console.log(data)
  console.log(error)

  const onSubmit = async (e) => {
    e.preventDefault()

    await createPost({
      variables: {
        title: getFirstTwoWords(content),
        content,
        authorName: 'Bob',
      },
    })
    Router.push('/drafts')
  }

  return (
    <Layout>
      <div>
        <form onSubmit={onSubmit}>
          <Header content={content} />
          <Textarea content={content} setContent={setContent} />
          <input disabled={!content} type="submit" value="Create" />
        </form>
      </div>
      <style jsx>
        {`
          .page {
            background: white;
            padding: 3rem;
            width: 600px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          input[type='submit'] {
            background: #ececec;
            border: 0;
            padding: 1rem 2rem;
          }
        `}
      </style>
    </Layout>
  )
}

export default withApollo(Post)

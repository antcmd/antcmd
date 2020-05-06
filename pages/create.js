import React, { useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import TextareaAutosize from 'react-textarea-autosize'

import { withApollo } from 'lib/apollo'
import { useEscapeToClose, useKeyboardShortcut } from 'hooks'
import Editor from 'components/Editor'
import { FeedQuery } from './index'

const Timer = dynamic(() => import('components/Timer'), {
  ssr: false,
})

// eslint-disable-next-line
const Replay = dynamic(() => import('components/Replay'), {
  ssr: false,
})

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

const Textarea = ({ content, setContent }) => (
  <>
    <TextareaAutosize
      className="area"
      autoFocus
      onChange={(e) => setContent(e.target.value)}
      placeholder="Your story"
      value={content}
      cols={50}
    />
    <style jsx>
      {`
        .area {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          background: transparent;
          outline: none;
          border: none;
          font-size: 24px;
        }
      `}
    </style>
  </>
)

function Post() {
  const [content, setContent] = useState(initialValue)

  const [createPost, { loading, error, data }] = useMutation(CreatePost, {
    update(cache, { data: { createPost: newPost } }) {
      const { feed: prevFeed } = cache.readQuery({ query: FeedQuery })
      cache.writeQuery({
        query: FeedQuery,
        data: { feed: [newPost, ...prevFeed] },
      })
    },
  })

  const onSubmit = async () => {
    await createPost({
      variables: {
        title: getFirstTwoWords(content),
        content,
        authorName: 'Bob',
      },
    })
    Router.push('/')
  }

  useEscapeToClose(() => Router.push('/'))
  useKeyboardShortcut(
    { Enter: onSubmit },
    {
      withMetaKey: true,
      event: 'keydown',
    },
  )

  return (
    <>
      <div className="page">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          style={{ paddingTop: 128 }}
        >
          <Editor content={content} setContent={setContent} />
          {/*
          <Textarea content={content} setContent={setContent} />
          */}
          <a
            style={{
              position: 'fixed',
              top: 20,
              right: 60,
              height: 36,
            }}
            href="/old-home"
            className="text-block-196 kim-copy-copy blue"
          >
            Publish
          </a>
          <div className={`overlay-actions ${content !== '' ? 'show' : ''}`}>
            <Timer />
            {/*
            <Replay setContent={setContent} />
            */}
          </div>
        </form>
      </div>
      <style jsx>
        {`
          .page {
            width: 655px;
          }

          .submit-button {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 0.2px;
            color: #5d707d;
          }
          .submit-button:hover {
            color: #098896;
            cursor: pointer;
          }

          .icon {
            fill: #b2b2b2;
          }
          .icon:hover {
            fill: #754f75;
          }

          .overlay-actions {
            opacity: 0;
            transition: 0.5s;
          }
          .overlay-actions.show {
            opacity: 0.4;
          }
          .overlay-actions.show:hover {
            opacity: 1;
          }
        `}
      </style>
    </>
  )
}

export default withApollo(Post)

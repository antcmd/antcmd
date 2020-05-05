import React, { useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import TextareaAutosize from 'react-textarea-autosize'

import SendIcon from 'public/icons/send.svg'
// import Replay from 'components/Replay'
import { withApollo } from 'lib/apollo'
import { useEscapeToClose, useKeyboardShortcut } from 'hooks'
import Editor from 'components/Editor'
import { FeedQuery } from './index'

// eslint-disable-next-line
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
  const [content, setContent] = useState('')

  const [createPost, { loading, error, data }] = useMutation(CreatePost, {
    update(cache, { data: { createPost: newPost } }) {
      console.log('data')
      console.log(data)
      const { feed: prevFeed } = cache.readQuery({ query: FeedQuery })
      console.log('prevFeed')
      console.log(prevFeed)
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

  console.log(loading)

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
          {/*
          <div>
            <div className="div-block-861">
              <div>
                <div className="text-block-13-copy-copy edit2">
                  Dear diary, share your feelings, secrets and doubts for today.
                  <br />
                </div>
              </div>
            </div>
            <div className="div-blorgck-436-copy ren" style={{ marginLeft: 0 }}>
              <div>
                <div className="text-block-118 edia">
                  This post will auto-publish in 6 minutes even if you leave.
                  You can't delete or edit this post later.{' '}
                </div>
              </div>
            </div>
          </div>
          */}

          <Editor />
          {/*
          <Textarea content={content} setContent={setContent} />
          */}
          <div className={`overlay-actions ${content !== '' ? 'show' : ''}`}>
            <div
              className="submit-button"
              onClick={onSubmit}
              style={{ cursor: loading ? 'spinner' : 'pointer' }}
            >
              Send
              {/*
              <SendIcon fill="black" className="icon" />
              */}
            </div>
            <Timer />
            <Replay setContent={setContent} />
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

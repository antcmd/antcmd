import { useState } from 'react'
import { useRouter } from 'next/router'
import { withApollo } from 'lib/apollo'
import { useMutation } from '@apollo/react-hooks'
import { useEscapeToClose, useKeyboardShortcut } from 'hooks'

import Editor from 'components/Editor'

import { SAVE_NOTE } from 'api'

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

const App = () => {
  const { push } = useRouter()
  const [content, setContent] = useState(initialValue)

  const [saveNote] = useMutation(SAVE_NOTE, {
    // update(cache, { data: { saveNote: newPost } }) {
    //   const { feed: prevFeed } = cache.readQuery({ query: FeedQuery })
    //   cache.writeQuery({
    //     query: FeedQuery,
    //     data: { feed: [newPost, ...prevFeed] },
    //   })
    // },
  })

  const onSubmit = async () => {
    await saveNote({
      variables: {
        content,
        authorName: 'Bob',
      },
    })
    push('/')
  }

  useEscapeToClose(() => push('/'))
  useKeyboardShortcut(
    { Enter: onSubmit },
    {
      withMetaKey: true,
      event: 'keydown',
    },
  )

  return (
    <div>
      <div className="div-block-861-copy">
        <div className="form-block w-form">
          <form id="email-form" name="email-form" data-name="Email Form">
            <input
              type="text"
              className="text-field w-input"
              autoFocus
              maxLength={256}
              name="name"
              data-name="Name"
              placeholder="Title"
              id="name"
            />
            <input
              type="text"
              className="text-field-2 w-input"
              maxLength={256}
              name="email"
              data-name="Email"
              placeholder="Description"
              id="email"
            />
            <div className="text-block-118">
              I’ve always loved stories. In my younger years, I was a voracious
              reader and especially loved true crime and non fiction books. Now,
              as a married adult with a 50 hour white collar desk job work week
              and a long daily commute, I haven’t had the time to read as much
              as I like. Podcasts have been a saving grace for me to be able to
              get my story-fix in while still being able to do other things,
              like drive or pour over spread sheets.
            </div>
            {/*
            BOT
            <div
              className="app"
              data-ix="new-interaction-25"
              style={{ display: 'flex' }}
            >
              <div className="div-block-878 up _2 sha">
                <div>WE</div>
              </div>
              <div className="div-block-886">
                <div className="div-block-887">
                  <input
                    type="text"
                    className="text-field-2 ncod w-input"
                    maxLength={256}
                    name="email-2"
                    data-name="Email 2"
                    placeholder="What's your City"
                    id="email-2"
                  />
                  <img
                    src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb549145c02e69cf4e511a6_eye.svg"
                    width={15}
                    alt=""
                    className="image-286"
                  />
                </div>
              </div>
            </div>
            <div
              className="app1"
              data-ix="new-interaction-26"
              style={{ display: 'none' }}
            >
              <div className="div-block-878 up _2 sha">
                <div>WE</div>
              </div>
              <div className="div-block-886">
                <div className="div-block-887">
                  <img
                    src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb549145c02e69cf4e511a6_eye.svg"
                    width={15}
                    alt=""
                    className="image-286"
                  />
                </div>
              </div>
              <div className="text-block-211 morep">
                <strong className="bold-text-20">6:00 am 12°C.</strong> Partly
                cloudy with a chance of a shower in the morning, light rain
                developing in the afternoon. POP 70%. Rain: 1-3 mm...
              </div>
            </div>
            <div
              className="app2"
              data-ix="new-interaction-27"
              style={{ display: 'flex' }}
            >
              <div className="div-block-878 up mkn sha">
                <div>PF</div>
              </div>
              <div className="text-block-211 morep">
                Article converted to PDF.{' '}
                <a href="#" className="link">
                  Download
                </a>
                .
              </div>
            </div>
            BOTS
            */}
          </form>
        </div>
      </div>
      {/*
      <Editor content={content} setContent={setContent} />
      */}
    </div>
  )
}

export default withApollo(App)

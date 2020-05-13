import { useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from 'lib/apollo'
import { EditorContext } from 'context'

import Editor from 'components/Editor'

import { SAVE_NOTE } from 'api'

const App = () => {
  const { content, setContent } = useContext(EditorContext)

  const [saveNote] = useMutation(SAVE_NOTE, {
    // update(cache, { data: { saveNote: newPost } }) {
    //   const { feed: prevFeed } = cache.readQuery({ query: FeedQuery })
    //   cache.writeQuery({
    //     query: FeedQuery,
    //     data: { feed: [newPost, ...prevFeed] },
    //   })
    // },
  })

  const onSave = async () => {
    await saveNote({
      variables: {
        content,
        authorName: 'Bob',
      },
    })
    // eslint-disable-next-line no-console
    console.log('Saved')
  }

  return (
    <div>
      <div className="div-block-861-copy">
        <div className="form-block w-form">
          <Editor value={content} setValue={setContent} onSave={onSave} />
        </div>
      </div>
    </div>
  )
}

export default withApollo(App)

import Layout from 'components/Layout'
import Router, { useRouter } from 'next/router'
import { withApollo } from 'lib/apollo'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useEscapeToClose, useKeyboardShortcut } from 'hooks'

const PostQuery = gql`
  query PostQuery($postId: String!) {
    post(postId: $postId) {
      id
      content
      author {
        id
        name
      }
    }
  }
`

function Post() {
  const postId = useRouter().query.id
  const { loading, error, data } = useQuery(PostQuery, {
    variables: { postId },
  })

  useKeyboardShortcut({ n: () => Router.push('/create') })
  useEscapeToClose(() => Router.push('/'))

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }

  const authorName = data.post.author ? data.post.author.name : 'Unknown author'
  return (
    <>
      <div className="div-block-861">
        <div>
          <div className="text-block-13-copy-copy">
            Calmpaper Project
            <br />
          </div>
        </div>
      </div>
      <div className="div-blorgck-436-copy ren">
        <div>
          <div className="text-block-118">{data.post.content}</div>
          <div className="text-block-118">
            I’ve always loved stories. In my younger years, I was a voracious
            reader and especially loved true crime and non fiction books. Now,
            as a married adult with a 50 hour white collar desk job work week
            and a long daily commute, I haven’t had the time to read as much as
            I like. Podcasts have been a saving grace for me to be able to get
            my story-fix in while still being able to do other things, like
            drive or pour over spread sheets.
          </div>
        </div>
      </div>
      <p
        style={{
          display: 'flex',
          alignSelf: 'flex-end',
          opacity: 0.4,
          fontSize: 16,
          marginRight: 40,
        }}
      >
        {authorName}
      </p>
    </>
  )
}

export default withApollo(Post, { ssr: true })

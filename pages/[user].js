import Link from 'next/link'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import Post from 'components/Feed/Post'
import { withApollo } from 'lib/apollo'
import { useUser, useKeyboardShortcut } from 'hooks'

export const FeedQuery = gql`
  query FeedQuery {
    feed {
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

export default withApollo(() => {
  const { loading, error, data: { feed = [] } = {} } = useQuery(FeedQuery)
  const { push, query } = useRouter()
  const user = useUser()
  console.log(user)
  console.log('user')

  useKeyboardShortcut({ Enter: () => push('/create') })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }

  return (
    <div className="div-block-847-copy">
      <div className="div-block-843" style={{ height: 44 }}>
        <div className="text-block-194">
          <h1>Profile</h1>
          {user && <p>Your session: {JSON.stringify(user)}</p>}
          {query.user === 'bob' ? (
            <strong className="bold-text-17">Your posts</strong>
          ) : (
            <>
              <strong
                className="bold-text-17"
                style={{ textTransform: 'capitalize' }}
              >
                {query.user}
              </strong>
              {` 's posts`}
            </>
          )}
        </div>
      </div>
      <div className="div-block-852">
        {feed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
})

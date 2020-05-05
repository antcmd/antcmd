import Link from 'next/link'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import Post from 'components/Feed/Post'
import { withApollo } from 'lib/apollo'
import { useKeyboardShortcut } from 'hooks'

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
  const { push } = useRouter()

  useKeyboardShortcut({ Enter: () => push('/create') })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }
  const router = useRouter()
  console.log(router)
  return (
    <div className="div-block-847-copy">
      <div className="div-block-843" style={{ height: 44 }}>
        <div className="text-block-194">
          <strong className="bold-text-17">Bob</strong>'s posts
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

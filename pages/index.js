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

const Feed = () => {
  const { loading, error, data: { feed = [] } = {} } = useQuery(FeedQuery)
  const { push } = useRouter()

  useKeyboardShortcut({ Enter: () => push('/create') })

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }

  return (
    <div className="div-block-847-copy">
      <div className="div-block-843">
        <div className="text-block-194">
          Watch live<strong className="bold-text-17">writing</strong>
        </div>
        <Link href="/create">
          <a className="button-6 _24-copy blkd bl-copy-copy tyb whc w-inline-block">
            <div>Write</div>
            <img
              src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf5cd658f15e6ef710a953_arrow-right%20(1).svg"
              width={20}
              alt=""
              className="image-148 blue"
            />
          </a>
        </Link>
      </div>
      <div className="div-block-852">
        {feed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default withApollo(Feed)

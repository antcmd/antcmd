import Link from 'next/link'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'

import Layout from 'components/Layout'
import { withApollo } from 'apollo/client'
import { useKeyboardShortcut } from 'hooks'

const FeedQuery = gql`
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

const Post = ({ post }) => (
  <div className="post">
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <p>{post.content}</p>
    </Link>
    <style jsx>
      {`
        p {
          font-size: 36px;
          overflow: hidden;
          max-height: 43px;
        }
        p:hover {
          color: #681077;
          cursor: pointer;
        }
      `}
    </style>
  </div>
)

const Feed = ({ feed }) => (
  <main>
    {feed.map((post) => (
      <Post key={post.id} post={post} />
    ))}
    <style jsx>
      {`
        main {
          margin-top: 100px;
          width: 700px;
          display: flex;
          flex-direction: column;
        }
      `}
    </style>
  </main>
)

const Blog = () => {
  const { loading, error, data } = useQuery(FeedQuery)
  const { push } = useRouter()

  useKeyboardShortcut({ Enter: () => push('/create') })

  if (loading) {
    return <div />
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }

  return (
    <Layout>
      <Feed feed={data.feed} />
    </Layout>
  )
}

export default withApollo(Blog)

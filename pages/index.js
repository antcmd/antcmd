import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Layout from 'components/Layout'
import { withApollo } from 'apollo/client'

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
  <Link href="/p/[id]" as={`/p/${post.id}`}>
    <a>
      <h2>{post.title}</h2>
      <small>{`By ${post.author.name}`}</small>
      <p>{post.content}</p>
      <style jsx>
        {`
          a {
            text-decoration: none;
            color: inherit;
            padding: 2rem;
            display: block;
          }
        `}
      </style>
    </a>
  </Link>
)

const Feed = ({ feed }) => (
  <main>
    {feed.map((post) => (
      <div className="post">
        <Post key={post.id} post={post} />
      </div>
    ))}
    <style jsx>
      {`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}
    </style>
  </main>
)

const Blog = () => {
  const { loading, error, data } = useQuery(FeedQuery)

  if (loading) {
    return <div>Loading ...</div>
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

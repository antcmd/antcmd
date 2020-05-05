import Layout from 'components/Layout'
import Router, { useRouter } from 'next/router'
import { withApollo } from 'apollo/client'
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
    return <div />
  }
  if (error) {
    return <div>{`Error: ${error.message}`}</div>
  }

  const authorName = data.post.author ? data.post.author.name : 'Unknown author'
  return (
    <Layout>
      <div className="page">
        <p className="text">{data.post.content}</p>
        <p className="by">
          By <div className="author">{authorName}</div>
        </p>
      </div>
      <style jsx>
        {`
          .page {
            width: 700px;
          }
          .text {
            font-size: 24px;
          }
          .by {
            text-align: end;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            color: #636363;
          }
          .author {
            padding: 2px 3px;
            cursor: default;
          }
          .author:hover {
            color: #681077;
            background: hsl(167, 100%, 92%);
          }
        `}
      </style>
    </Layout>
  )
}

export default withApollo(Post)

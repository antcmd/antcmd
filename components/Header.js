import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const { route } = useRouter()

  return (
    <nav>
      <div className="left">
        {route !== '/' && route !== '/create' && (
          <Link href="/">
            <a className="logo">/</a>
          </Link>
        )}
      </div>
      <div className="right">
        {/* route !== '/signup' && <Link href="/signup">Signup</Link> */}
        {route !== '/create' && route !== '/p/[id]' && (
          <Link href="/bob">
            <a>My posts</a>
          </Link>
        )}
        {route !== '/create' && route !== '/p/[id]' && (
          <Link href="/create">
            <a>New post</a>
          </Link>
        )}
      </div>
      <style jsx>
        {`
          .logo {
            margin-top: -12px;
            margin-left: -12px;
            padding: 12px;
          }
          .logo:hover {
            background: hsl(167, 100%, 92%);
          }
          nav {
            display: flex;
            padding: 2rem;
            height: 94px;
            align-items: center;
          }

          a {
            font-size: 16px;
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a:hover {
            text-decoration: none;
            color: #681077;
          }

          .left a[data-active='true'] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }
        `}
      </style>
    </nav>
  )
}

export default Header

import Link from 'next/link'
import { useRouter } from 'next/router'

function isActive(pathname) {
  return (
    typeof document !== 'undefined' && document.location.pathname === pathname
  )
}

const Header = () => {
  const { route } = useRouter()
  const isLogged = false;

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive('/')}>
            /
          </a>
        </Link>
      </div>
      <div className="right">
        {route !== '/signup' &&
          <Link href="/signup">
            <a data-active={isActive('/signup')}>Signup</a>
          </Link>
        }
        {isLogged &&
          <Link href="/create">
            <a data-active={isActive('/create')}>New post</a>
          </Link>
        }
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        a:hover {
          text-decoration: none;
          color: #681077;
        }

        a:active {
          text-decoration: underline;
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

      `}</style>
    </nav>
  )
}

export default Header

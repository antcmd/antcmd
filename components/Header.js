import Link from 'next/link'

const Header = () => {
  const isLogged = true

  return (
    <nav>
      <div className="left">
        <Link href="/">/</Link>
      </div>
      <div className="right">
        {/* route !== '/signup' && <Link href="/signup">Signup</Link> */}
        {isLogged && <Link href="/create">New post</Link>}
      </div>
      <style jsx>
        {`
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
        `}
      </style>
    </nav>
  )
}

export default Header

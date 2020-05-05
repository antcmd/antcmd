import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const { route, query: { user } = {} } = useRouter()
  // {route !== '/create' && route !== '/p/[id]' && (
  //   <Link href="/bob">
  //     <a>My posts</a>
  //   </Link>
  // )}
  // {/* route !== '/signup' && <Link href="/signup">Signup</Link> */}

  return (
    <div className="div-block-780 ewgew-copy">
      <div className="div-block-871">
        <Link href="/">
          <a className="w-inline-block w--current">
            <div
              className="text-block-207"
              style={{ cursor: route === '/' ? 'default' : 'pointer' }}
            >
              twrite
            </div>
          </a>
        </Link>
        {route === '/p/[id]' && (
          <>
            <a href="#" className="text-block-196 kim-copy-copy blue">
              Play 56
            </a>
            <div className="div-block-872" />
            <a href="#" className="text-block-196 kim-copy-copy">
              Like 34
            </a>
          </>
        )}
      </div>
      <div className="div-block-871">
        {route !== '/create' && route !== '/p/[id]' && user !== 'bob' && (
          <Link href="/bob">
            <a className="text-block-196 kim-copy-copy">Bob</a>
          </Link>
        )}
      </div>
      {/* route !== '/create' && route !== '/p/[id]' && (
        <div className="div-block-871">
          <Link href="/create">
            <a className="text-block-196 kim-copy-copy">Write</a>
          </Link>
        </div>
      ) */}
    </div>
  )
}

export default Header

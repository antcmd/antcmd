// import Hamburger from './Hamburger'
// <Hamburger onClick={() => setShowMenu(!showMenu)} />
import { useContext } from 'react'
import { AppContext } from 'context'
import { useRouter } from 'next/router'
import { useUser } from 'hooks'
import Link from 'next/link'

export default () => {
  const { setShowSidebar } = useContext(AppContext)

  return (
    <div className="div-block-780 ewgew-copy hdaf">
      <a href="#" className="lohd w-inline-block">
        <img
          src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf5cd658f15e071b10a974_icons8-sail-60.png"
          width={32}
          alt=""
        />
      </a>
      <div className="avtars hvxd">
        <div className="div-block-872" />
      </div>
      <Link href="/pages" className="kerou w-inline-block">
        <a className="kerou w-inline-block">
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb7fb04ccd7e722bd596471_menu.svg"
            width={36}
            alt=""
            className="image-288"
          />
        </a>
      </Link>
      <div
        onClick={() => setShowSidebar(true)}
        className="kerou"
        data-ix="new-interaction-17"
      >
        <img
          src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5e565ccd7e731c14c646c_layout-6.svg"
          width={36}
          alt=""
          className="image-288"
        />
      </div>
    </div>
  )
}

const Header = ({ showPages }) => {
  const { route, query } = useRouter()
  const user = useUser()

  return (
    <div className="div-block-780 ewgew-copy">
      <div className="div-block-871" onClick={showPages}>
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
        {user
          ? route !== '/create' &&
            route !== '/p/[id]' &&
            query.user !== 'bob' && (
              <Link href="/bob">
                <a className="text-block-196 kim-copy-copy">Bob</a>
              </Link>
            )
          : route !== '/signup' &&
            route !== '/create' &&
            route !== '/p/[id]' && (
              <Link href="/signup">
                <a className="text-block-196 kim-copy-copy">Join</a>
              </Link>
            )}
        {user && (
          <Link href="/api/logout">
            <a className="text-block-196 kim-copy-copy">Logout</a>
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

// export default Header

import Link from 'next/link'

export default ({ page = {} }) => (
  <div className="div-block-784 kcalm">
    <Link href="/p/[id]" as={`/p/${page.id}`}>
      <div className="_141">
        <a className="bluh">
          Sleep deprivation
          <br />
        </a>
      </div>
    </Link>
  </div>
)

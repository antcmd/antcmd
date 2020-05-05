import Link from 'next/link'

export default ({ post }) => (
  <Link href="/p/[id]" as={`/p/${post.id}`}>
    <div className="div-block-838-copy">
      <div className="div-block-784-copy">
        <a href="/old-home" className="div-block-851 w-inline-block">
          <div
            className="text-block-202-copy-copy-copy"
            style={{
              minWidth: 608,
              maxWidth: 608,
              maxHeight: 50,
              overflow: 'hidden',
            }}
          >
            {post.content}
            <br />
          </div>
        </a>
      </div>
      <div className="asf3">
        22m
        <br />
      </div>
      <div className="div-block-875-copy">
        <a href="#" className="div-block-875 w-inline-block">
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf61f085c94f2054b4c8a5_play.svg"
            width={21}
            alt=""
            className="image-283"
          />
          <div className="text-block-196 kim-copy-copy _12">70</div>
        </a>
        <div className="div-block-872" />
        <a href="#" className="div-block-875 w-inline-block">
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf628b00e6c614c7f461a2_thumbs-up.svg"
            width={21}
            alt=""
            className="image-283"
          />
          <div className="text-block-196 kim-copy-copy _12">24</div>
        </a>
        <div className="div-block-872" />
        <div className="text-block-196 kim-copy-copy _12 no">24m</div>
      </div>
    </div>
  </Link>
)

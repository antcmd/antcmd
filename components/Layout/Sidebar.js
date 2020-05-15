import { useContext } from 'react'
import { AppContext } from 'context'
import Link from 'next/link'

export default () => {
  const { showSidebar: show, setShowSidebar } = useContext(AppContext)
  const close = () => setShowSidebar(false)

  return (
    <div
      className="rightbar"
      data-ix="new-interaction-18"
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className="div-block-889">
        <div className="kerou">
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5bc6eecd059d6c6003fc0_clock%20(1).svg"
            width={26}
            alt=""
            className="image-288"
          />
          <div className="text-block-212">Ants</div>
        </div>
        <Link href="/">
          <div className="kerou" onClick={close}>
            <img
              src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5d1f6bf5a492496092539_file-plus-2.svg"
              width={26}
              alt=""
              className="image-288"
            />

            <div className="text-block-212 eg">New Page</div>
          </div>
        </Link>
        <div className="kerou" data-ix="new-interaction-19" onClick={close}>
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5bc74170d89f6c0ac1141_more-horizontal%20(1).svg"
            width={36}
            alt=""
            className="image-288"
          />
          <div className="text-block-212">More</div>
        </div>
      </div>
      {/*
      <div className="open2-copy">
        <div className="div-block-827 nou">
          <div className="text-block-199 allcaps">Bots</div>
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf5cd658f15e076310a947_Icon_-_Arrow%402x.png"
            width={8}
            alt=""
            className="image-285"
          />
        </div>
        <div className="avablock" data-ix="new-interaction-21">
          <div className="div-block-878 up">
            <div>SB</div>
          </div>
          <div className="div-block-886">
            <div className="text-block-209">Stock Bot</div>
            <div className="div-block-887">
              <div className="text-block-211">Show prices of stocks.</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5489f51528b4903bfb824_edit-2.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock" data-ix="new-interaction-21">
          <div className="div-block-878 up _2">
            <div>WE</div>
          </div>
          <div className="div-block-886">
            <div className="text-block-209">Weather Bot</div>
            <div className="div-block-887">
              <div className="text-block-211">Show current weather.</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb549145c02e69cf4e511a6_eye.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock" data-ix="new-interaction-24">
          <div className="div-block-878 up mkn">
            <div>PF</div>
          </div>
          <div className="div-block-886">
            <div className="text-block-209">
              PDF&nbsp;Export Bot
              <br />
            </div>
            <div className="div-block-887">
              <div className="text-block-211">Find images.</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb549145c02e69cf4e511a6_eye.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock">
          <div className="div-block-878 up _3">
            <div>BH</div>
          </div>
          <div className="div-block-886">
            <div className="text-block-209">
              Web Search Bot
              <br />
            </div>
            <div className="div-block-887">
              <div className="text-block-211">Find images.</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb549145c02e69cf4e511a6_eye.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock">
          <div className="div-block-878 up _4">
            <div>BH</div>
          </div>
          <div className="div-block-886">
            <div className="text-block-209">
              News Search Bot
              <br />
            </div>
            <div className="div-block-887">
              <div className="text-block-211">Find images.</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb549145c02e69cf4e511a6_eye.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
      </div>
      */}
      <div
        className="open2"
        data-ix="new-interaction-20"
        style={{ display: 'none' }}
      >
        <div className="div-block-827 nou">
          <div className="text-block-199 allcaps">Viola's Sessions</div>
          <img
            src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eaf5cd658f15e076310a947_Icon_-_Arrow%402x.png"
            width={8}
            alt=""
            className="image-285"
          />
        </div>
        <div className="avablock">
          <div className="div-block-893" />
          <div className="div-block-886">
            <div className="text-block-209">Today</div>
            <div className="div-block-887">
              <div className="text-block-211">0:00</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5489f51528b4903bfb824_edit-2.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock">
          <div className="div-block-893" />
          <div className="div-block-886">
            <div className="text-block-209">Yesterday</div>
            <div className="div-block-887">
              <div className="text-block-211">0:00</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5489f51528b4903bfb824_edit-2.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock">
          <div className="div-block-893" />
          <div className="div-block-886">
            <div className="text-block-209">This Week</div>
            <div className="div-block-887">
              <div className="text-block-211">0:00</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5489f51528b4903bfb824_edit-2.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
        <div className="avablock">
          <div className="div-block-893" />
          <div className="div-block-886">
            <div className="text-block-209">This Month</div>
            <div className="div-block-887">
              <div className="text-block-211">0:00</div>
              <img
                src="https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5eb5489f51528b4903bfb824_edit-2.svg"
                width={15}
                alt=""
                className="image-286"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

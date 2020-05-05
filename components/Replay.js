import { useState, useEffect, useCallback } from 'react'
import { useEventListener } from 'hooks'
import moment from 'moment'

import PlayIcon from 'public/icons/play.svg'
import PlayFastIcon from 'public/icons/x1.svg'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default ({ setContent }) => {
  const [actions, setActions] = useState([])
  const [speed, setSpeed] = useState(1)
  const [isRecording, setRecording] = useState(true)
  const [isPlaying, setPlaying] = useState(false)

  const getTimeDelta = useCallback((time) => time / speed, [speed])

  const replay = async () => {
    // eslint-disable-next-line
    for await (let [index, action] of actions.entries()) {
      setContent(action.value)

      let timeDelta

      if (actions[index + 1]) {
        // Calculate time delta
        console.log('speed')
        console.log(speed)
        timeDelta = getTimeDelta(actions[index + 1].time.diff(action.time))
      } else {
        timeDelta = 0
        console.log('last')
        setPlaying(false)
        setSpeed(1)
        setRecording(true)
      }

      await timeout(timeDelta)
    }
  }

  useEffect(() => {
    console.log('change speed')
    console.log(speed)
  }, [speed])

  useEffect(() => {
    if (isPlaying) {
      replay(actions)
      setRecording(false)
    }
  }, [isPlaying])

  const recordTyping = (time) => {
    // console.log('record')
    // const action = {
    //   value: document.getElementsByClassName('area')[0].value,
    //   time,
    // }
    // setActions((prevActions) => [...prevActions, action])
  }

  const onKeyDown = useCallback((e) => isRecording && recordTyping(moment()), [
    isRecording,
  ])

  useEventListener('keydown', onKeyDown)

  const speeds = [...Array(speed + 1).keys()]

  return (
    <>
      <div
        className="replay"
        onClick={() => {
          if (isPlaying) {
            setSpeed((prevSpeed) => (prevSpeed === 3 ? 1 : prevSpeed + 1))
          } else {
            setPlaying(true)
          }
        }}
      >
        {isPlaying ? (
          <div>
            {speeds.map((x) => (
              <PlayFastIcon className="icon fast" fill="#000" />
            ))}
          </div>
        ) : (
          <PlayIcon className="icon play" fill="#000" />
        )}
      </div>
      <style jsx>
        {`
          .replay {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 2rem;
            left: 60px;
            width: 66px;
          }
          .replay:hover {
            cursor: pointer;
          }
          .play:hover {
            cursor: pointer;
            fill: #681077 !important;
          }
        `}
      </style>
    </>
  )
}

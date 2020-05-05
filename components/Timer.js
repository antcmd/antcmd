import { useState } from 'react'
import { useInterval } from 'hooks'
import moment from 'moment'

export default () => {
  const [end] = useState(moment().add(6, 'm'))
  const [timeLeft, setTimeLeft] = useState(moment(end.diff(moment())))
  const [displayTime, setDisplayTime] = useState(timeLeft.format('mm:ss'))

  useInterval(() => {
    setTimeLeft((prevTimeLeft) => prevTimeLeft.subtract(1, 's'))
    setDisplayTime(timeLeft.format('mm:ss'))
  }, 1000)

  return (
    <>
      <div className="timer">{displayTime}</div>
      <style jsx>
        {`
          .timer {
            position: fixed;
            left: calc(60px + 66px + 20px);
            width: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 58px;
            font-size: 15px;
            color: rgba(0, 0, 0, 0.68);
            font-size: 16px;
            line-height: 16px;
            top: 36px;
            text-align: start;
          }
          .timer:hover {
            cursor: default;
          }
        `}
      </style>
    </>
  )
}

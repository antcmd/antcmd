import { useState } from 'react'
import { useInterval } from 'hooks'
import moment from 'moment'

export default () => {
  const [end] = useState(moment().add(25, 'm'))
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
            top: 2rem;
            right: 2rem;
            width: 50px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 58px;
            color: #8bb3ce;
          }
          .timer:hover {
            color: #5d707d;
            cursor: default;
          }
        `}
      </style>
    </>
  )
}

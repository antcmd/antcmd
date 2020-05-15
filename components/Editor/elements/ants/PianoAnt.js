import React, { useState, useRef, useEffect } from 'react'
import Tone from 'tone'
// import A1 from 'public/sounds/piano/A0.mp3'
import { useSelected, useFocused } from 'slate-react'

const PianoKeyboard = () => (
  <div
    className="ReactPiano__Keyboard"
    style={{ width: '554px', height: '152.617px' }}
  >
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '0%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '5%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '9.09091%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '16.3636%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '18.1818%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '27.2727%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '31.8182%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '36.3636%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '42.7273%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '45.4545%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '53.1818%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '54.5455%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '63.6364%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '68.6364%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '72.7273%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--accidental"
      style={{ left: '80%', width: '5.90909%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '81.8182%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
    <div
      className="ReactPiano__Key ReactPiano__Key--natural"
      style={{ left: '90.9091%', width: '9.09091%' }}
    >
      <div className="ReactPiano__NoteLabelContainer" />
    </div>
  </div>
)

const notes = {
  A0: '/sounds/piano/A0.mp3',
  C1: '/sounds/piano/C1.mp3',
  'D#1': '/sounds/piano/Ds1.[mp3|ogg]',
  'F#1': '/sounds/piano/Fs1.[mp3|ogg]',
  A1: '/sounds/piano/A1.mp3',
  C2: '/sounds/piano/C2.mp3',
  'D#2': '/sounds/piano/Ds2.[mp3|ogg]',
  'F#2': '/sounds/piano/Fs2.[mp3|ogg]',
  A2: '/sounds/piano/A2.mp3',
  C3: '/sounds/piano/C3.mp3',
  'D#3': '/sounds/piano/Ds3.[mp3|ogg]',
  'F#3': '/sounds/piano/Fs3.[mp3|ogg]',
  A3: '/sounds/piano/A3.[mp3|ogg]',
  C4: '/sounds/piano/C4.[mp3|ogg]',
  'D#4': '/sounds/piano/Ds4.[mp3|ogg]',
  'F#4': '/sounds/piano/Fs4.[mp3|ogg]',
  A4: '/sounds/piano/A4.[mp3|ogg]',
  C5: '/sounds/piano/C5.[mp3|ogg]',
  'D#5': '/sounds/piano/Ds5.[mp3|ogg]',
  'F#5': '/sounds/piano/Fs5.[mp3|ogg]',
  A5: '/sounds/piano/A5.[mp3|ogg]',
  C6: '/sounds/piano/C6.[mp3|ogg]',
  'D#6': '/sounds/piano/Ds6.[mp3|ogg]',
  'F#6': '/sounds/piano/Fs6.[mp3|ogg]',
  A6: '/sounds/piano/A6.[mp3|ogg]',
  C7: '/sounds/piano/C7.[mp3|ogg]',
  'D#7': '/sounds/piano/Ds7.[mp3|ogg]',
  'F#7': '/sounds/piano/Fs7.[mp3|ogg]',
  A7: '/sounds/piano/A7.[mp3|ogg]',
  C8: '/sounds/piano/C8.[mp3|ogg]',
}

const Piano = ({ attributes, children }) => {
  const [isLoaded, setLoaded] = useState(false)
  const sampler = useRef(null)
  const selected = useSelected()
  const focused = useFocused()

  useEffect(() => {
    sampler.current = new Tone.Sampler(notes, {
      release: 1,
      // baseUrl: '/sounds/piano/',
      onload: () => {
        if (Tone.context.state !== 'running') {
          Tone.context.resume()
        }
        setLoaded(true)
      },
    }).toMaster()
  }, [])

  const handleClick = () => sampler.current.triggerAttack('A1')

  return (
    <div
      {...attributes}
      contentEditable={false}
      style={{
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      {children}

      <button disabled={!isLoaded} onClick={handleClick}>
        start
      </button>
      <PianoKeyboard />
      {/* isLoaded && <tone-piano polyphonic></tone-piano> */}
    </div>
  )
}

export default Piano

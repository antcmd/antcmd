import { useState, useCallback } from 'react'
import { useArrowNavigation } from 'hooks'

const commands = [
  {
    cmd: '/inbox',
    description: 'Read your Gmail inbox',
    image:
      'https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5ecbd4ea86ad522aede0f8a9_prospector.png',
  },
  {
    cmd: '/hunt',
    description: 'Search email addresses corresponding to a website',
    image:
      'https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5ecbd4eaa6fd590082cfc48f_enrichment.png',
  },
  {
    cmd: '/s',
    description: 'Find a synonym or paraphrase a sentence',
    image:
      'https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5ecbd4eae2efa91e54df6324_reveal.png',
  },
  // {
  //   cmd: '/pages',
  //   description: 'Show saved pages',
  //   image:
  //     'https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5ecbd4ea86ad522aede0f8a9_prospector.png',
  // },
  {
    cmd: '/dark',
    description: 'Turn light off',
    image:
      'https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5ecbd4eaa6fd590082cfc48f_enrichment.png',
  },
  {
    cmd: '/light',
    description: 'Turn light on',
    image:
      'https://uploads-ssl.webflow.com/5eaf5cd658f15e7f0410a7cd/5ecbd4eae2efa91e54df6324_reveal.png',
  },
]

export default ({ onPickCommand, onClose }) => {
  const [focusedIndex, setFocusedIndex] = useState(0)

  useArrowNavigation({
    next: useCallback(
      () =>
        setFocusedIndex((prevIndex) =>
          prevIndex >= commands.length - 1 ? 0 : prevIndex + 1,
        ),
      [commands],
    ),
    prev: useCallback(
      () =>
        setFocusedIndex((prevIndex) =>
          prevIndex <= 0 ? commands.length - 1 : prevIndex - 1,
        ),
      [commands],
    ),
    enter: () => onPickCommand(commands[focusedIndex]),
    close: onClose,
  })

  return (
    <div className="div-block-895">
      <div className="open2-copy-copy">
        <div className="div-block-827 nou gac">
          <div className="text-block-199 allcaps">Commands</div>
        </div>
        {commands.map((command, index) => (
          <div
            className={`avablock fla ${focusedIndex === index ? 'sck' : ''}`}
            data-ix="new-interaction-21"
            onClick={() => onPickCommand(command.cmd)}
          >
            {/*
            <img src={command.image} width={34} alt="" className="image-290" />
            */}
            <div className="div-block-886">
              <div className="text-block-209">{command.cmd}</div>
              <div className="div-block-887">
                <div className="text-block-211">{command.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // return (
  //   <div
  //     className="div-block-895"
  //     style={{
  //       width: 330,
  //       overflow: 'auto',
  //       maxHeight: '350px',
  //       top: '6%',
  //     }}
  //   >
  //     <div className="div-block-827 nou gac">
  //       <div className="text-block-199 allcaps">Commands</div>
  //     </div>
  //     <div className="open2-copy-copy">
  //       {commands.map((synonym, index) => (
  //         <div
  //           className={`avablock fla ${focusedIndex === index ? 'hover' : ''}`}
  //           data-ix="new-interaction-21"
  //           onClick={() => onPickCommand(synonym)}
  //           key={synonym}
  //         >
  //           <div className="div-block-886">
  //             <div className="text-block-209">{synonym}</div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // )
}

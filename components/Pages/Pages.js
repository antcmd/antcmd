import { useState } from 'react'
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from 'react-beautiful-dnd'

import Column from 'components/Pages/Column'
import MenuButton from './MenuButton'

import reorder, { reorderQuoteMap } from './help/reorder'
import { authorQuoteMap } from './help/data'

resetServerContext()

const initialValue = authorQuoteMap

export default () => {
  const [columns, setColumns] = useState(initialValue)
  const [ordered, setOrdered] = useState(Object.keys(initialValue))

  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow = [...ordered]
        shallow.splice(result.source.index, 1)
        setOrdered(shallow)
        return
      }

      const column = columns[result.source.droppableId]
      const withQuoteRemoved = [...column]
      withQuoteRemoved.splice(result.source.index, 1)
      setColumns({
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      })
      return
    }

    // dropped nowhere
    if (!result.destination) {
      return
    }

    const { source, destination } = result

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    // reordering column
    if (result.type === 'COLUMN') {
      setOrdered(reorder(ordered, source.index, destination.index))
      return
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    })

    setColumns(data.quoteMap)
  }

  return (
    <div className="div-block-861-copy">
      <div className="div-block-876-copy _40">
        <div className="text-block-13-copy-copy">
          All pages
          <br />
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="board"
          type="COLUMN"
          direction="horizontal"
          ignoreContainerClipping={false}
          isCombineEnabled={false}
        >
          {(provided) => (
            <div className="div-blorgck-436-copy ren">
              <div
                className="div-block-828"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {ordered.map((key, index) => (
                  <Column
                    key={key}
                    index={index}
                    title={key}
                    quotes={columns[key]}
                  />
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <MenuButton />
    </div>
  )
}

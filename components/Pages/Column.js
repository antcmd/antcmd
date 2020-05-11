import { Draggable, Droppable } from 'react-beautiful-dnd'
import Item from 'components/Pages/Item'

export default ({ title, quotes, index }) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div
          className="tab raf show"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="div-block-827" isDragging={snapshot.isDragging}>
            <div
              className="text-block-199"
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              {`${title} me`}
            </div>
          </div>

          <Item quote={quotes[0]} />
          <Item quote={quotes[0]} />
          <Item quote={quotes[0]} />
        </div>
      )}
    </Draggable>
  )
}

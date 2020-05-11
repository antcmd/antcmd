import Link from 'next/link'

// export default ({ quote, isDragging, isGroupedOver }) => (

//     <div
//       isDragging={isDragging}
//       isGroupedOver={isGroupedOver}
//       ref={provided.innerRef}
//       {...provided.draggableProps}
//       {...provided.dragHandleProps}
//       data-is-dragging={isDragging}
//       data-testid={quote.id}
//       data-index={index}
//       aria-label={`${quote.author.name} quote ${quote.content}`}
//     >
//       <Avatar src={quote.author.avatarUrl} alt={quote.author.name} />
//       {isClone ? <CloneBadge>Clone</CloneBadge> : null}
//       <Content>
//         <BlockQuote>{quote.content}</BlockQuote>
//         <Footer>
//           <Author colors={quote.author.colors}>{quote.author.name}</Author>
//           <QuoteId>id:{quote.id}</QuoteId>
//         </Footer>
//       </Content>
//     </Container>
// )

export default ({ page = {}, quote, isDragging, isGroupedOver }) => (
  <div className="div-block-784 kcalm">
    <Link href="/p/[id]" as={`/p/${page.id}`}>
      <div className="_141">
        <a className="bluh">
          {quote.content}
          <br />
        </a>
      </div>
    </Link>
  </div>
)

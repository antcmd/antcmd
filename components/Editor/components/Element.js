import { CheckListItemElement } from 'components/UI/Checkbox'
// import { CheckListItemElement } from './CheckListItem'
//
import {
  Title,
  SubTitle,
  SectionTitle,
  Paragraph,
  ListItem,
  Quote,
  Divider,
} from 'styles/UI'

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'title':
      return <Title {...attributes}>{children}</Title>
    case 'subtitle':
      return <SubTitle {...attributes}>{children}</SubTitle>
    case 'section':
      return <SectionTitle {...attributes}>{children}</SectionTitle>
    case 'paragraph':
      return <Paragraph {...attributes}>{children}</Paragraph>
    case 'list-item':
      return <ListItem {...attributes}>{children}</ListItem>
    case 'quote':
      return <Quote {...attributes}>{children}</Quote>
    case 'divider':
      return <Divider {...attributes}>{children}</Divider>
    // case 'bulleted-list':
    //   return <ul {...attributes}>{children}</ul>
    case 'check-list-item':
      return (
        <CheckListItemElement attributes={attributes} element={element}>
          {children}
        </CheckListItemElement>
      )
    default:
      return <Paragraph {...attributes}>{children}</Paragraph>
  }
}

export default Element

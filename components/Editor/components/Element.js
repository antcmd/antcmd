import {
  Title,
  SubTitle,
  SectionTitle,
  Paragraph,
  ListItem,
  Quote,
  Divider,
} from 'styles/UI'
import Checkbox from './Checkbox'

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
    case 'bold':
      return <b {...attributes}>{children}</b>
    case 'italic':
      return <i {...attributes}>{children}</i>
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
        <Checkbox attributes={attributes} element={element}>
          {children}
        </Checkbox>
      )
    default:
      return <Paragraph {...attributes}>{children}</Paragraph>
  }
}

export default Element

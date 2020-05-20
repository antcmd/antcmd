import {
  Title,
  SubTitle,
  SectionTitle,
  Paragraph,
  ListItem,
  Quote,
  Divider,
} from './typography'

import Insight from './ants/InsightAnt'

import Mention from './components/Mention'
import Checkbox from './components/Checkbox'
import Tree from './components/Tree'

const Element = (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    // Default elements
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

    // Ants
    case 'insight':
      return <Insight {...props} />

    // Components
    case 'mention':
      return <Mention {...props} />
    case 'checkbox':
      return <Checkbox {...props} />
    case 'tree':
      return <Tree {...props} />
    case 'link':
      return (
        <a {...attributes} style={{ color: 'red' }} href={element.url}>
          {children}
        </a>
      )
    default:
      return <Paragraph {...attributes}>{children}</Paragraph>
  }
}

export default Element

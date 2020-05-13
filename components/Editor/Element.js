import Mention from './elements/Mention'

export default (props) => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />
    default:
      return (
        <p
          {...attributes}
          style={{
            fontSize: 18,
            lineHeight: '30px',
          }}
        >
          {children}
        </p>
      )
  }
}

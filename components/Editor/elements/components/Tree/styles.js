import styled from 'styled-components'

const Frame = styled('div')`
  position: relative;
  padding: 4px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: #32393b;
  fill: #32393b;
`

const Title = styled('span')`
  vertical-align: middle;
  font-size: 18px;
`

const Content = styled('div')`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
`
// overflow: hidden;

const toggle = {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  minHeight: '20px',
  // marginRight: 10,
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 4,
}

const TextNode = styled('div')`
  opacity: 0.7;
  margin: 8px 0 4px;
  height: fit-content;
`

export { Frame, Content, toggle, Title, TextNode }

import styled from 'styled-components'
import { animated } from 'react-spring'
import { PRIMARY, BORDER_WIDTH } from 'styles/constants'

export const Wrapper = styled.div`
  position: relative;
`

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`

export const VisibleContents = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
`

export const VisibleBox = styled(animated.div)`
  position: relative;
  border: ${BORDER_WIDTH}px solid #555;
  border-radius: 4px;
  margin-right: 8px;

  ${CheckboxInput}:hover + ${VisibleContents} & {
    border-color: #111;
  }

  ${CheckboxInput}:focus.focus-visible + ${VisibleContents} & {
    outline: 2px auto ${PRIMARY};
    outline-offset: 2px;
  }
`

export const Filled = styled(animated.div)`
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: ${PRIMARY};
  border-radius: 2px;
`

export const Text = styled.span`
  color: rgb(51, 51, 51) !important;
  font-size: 18px;
  line-height: 30px;
`

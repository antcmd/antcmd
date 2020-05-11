import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Bot = styled.div`
  position: fixed;
  font-size: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -88px;
`

export const Content = styled.div`
  position: relative;
`
export const Bubbles = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const Bubble = styled.div`
  position: relative;
  background: #e2e2e2;
  border-radius: 24px;
  margin-right: 12px;
  padding: 8px 24px;
  font-weight: 500;
  font-family: 'Proxima Nova Alt';
  /* font-family: 'proxima-nova'; */
  color: #2f2f2f;
  :hover {
    background: rgba(226, 226, 226, 0.5);
    cursor: pointer;
  }
`

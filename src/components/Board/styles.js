import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: block;
  border: 5px solid black;
  background: #fff;

  ${(props) =>
    props.small &&
    `
    pointer-events: none;
    height: 300px;
    width: 300px;
  `}
`

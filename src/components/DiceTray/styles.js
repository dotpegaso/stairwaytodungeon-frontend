import styled, { keyframes } from 'styled-components'

const showUp = keyframes`
 from { opacity: 0;}
 to { opacity: 1;}
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: var(--black-23-opaque);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 60px);
  opacity: 0;
  animation: ${showUp} 0.3s ease-in-out forwards;
`

export const Dicetray = styled.div`
  height: fit-content;
  width: 100%;
  padding: var(--padding);
  background: var(--green-52);
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  align-items: center;
  text-transform: uppercase;
  gap: var(--gap);
`

export const Announcement = styled.p`
  font-size: 22px;

  ${(props) =>
    props.diceResult &&
    `
    font-size: 90px;
    text-align: center;
  `}
`

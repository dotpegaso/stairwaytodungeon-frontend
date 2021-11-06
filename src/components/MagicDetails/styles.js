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
  z-index: 90;
  background: var(--black-23-opaque);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 60px);
  opacity: 0;
  animation: ${showUp} 0.3s ease-in-out forwards;
`

export const MagicDetails = styled.div`
  height: 70vh;
  width: 100%;
  padding: var(--padding);
  background: var(--green-52);
  position: relative;
  display: grid;
  grid-template-rows: 30px 1fr 30px;
  align-items: flex-start;
  gap: var(--gap);
`

export const Text = styled.p`
  font-size: 17px;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  line-height: 1.3;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  ${(props) =>
    props.title &&
    `
    text-align: center;
    text-transform: uppercase;
    font-family: 'Saint Regus';
    font-size: 20px;
  `}
`

export const CloseButton = styled.button`
  width: fit-content;
  height: 100%;
  margin: 0 auto;
  border: none;
  border-radius: none;
  text-transform: uppercase;
  background: transparent;
  font-size: 14px;
  color: var(--secondary-text);
`

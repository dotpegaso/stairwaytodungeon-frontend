import styled from 'styled-components'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const Dicetray = styled.div`
  height: fit-content;
  width: 90%;
  border-radius: 6px;
  background: tomato;
  position: relative;
`

export const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-top: 10px;

  ${(props) =>
    props.isAllyDice &&
    `
    margin: 0 auto;
    margin-bottom: 20px;
    width: fit-content;
    padding: 5px 20px;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    padding-top: 15px;
    object-fit: contain;
    position: absolute;
    bottom: -65px;
    right: 0;
    left: 0;
    background: var(--secondary-background);
  `}
`

export const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
`

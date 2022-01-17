import styled, { keyframes, css } from 'styled-components'

const animationRoll = keyframes`
 from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

export const Dice = styled.button`
  height: 70px;
  width: 100px;
  background: transparent;
  border: none;
  color: var(--primary-color);
  text-align: center;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all ease;

  :hover {
    background: var(--white-97);
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;

      :hover {
        background: transparent;
      }

      ${props.selected &&
      css`
        animation: ${animationRoll} 0.4s linear forwards;
        animation-iteration-count: 16;
      `}
    `}

  @media screen and (max-width: 490px) {
    width: fit-content;
  }
`

export const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-top: 10px;
  transform-origin: center;

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

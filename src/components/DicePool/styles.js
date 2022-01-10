import styled from 'styled-components'

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

  :active {
    background: var(--white-97);
  }

  ${(props) =>
    props.disabled &&
    `
    opacity: .5;
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

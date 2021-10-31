import styled from 'styled-components'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height: 100%;
`

export const AllyDiceTrayOverlay = styled.div`
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

export const AllyDiceTray = styled.div`
  height: fit-content;
  width: 90%;
  border-radius: 6px;
  background: var(--primary-color);
  position: relative;
`

export const Gap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CharacterCard = styled.div`
  padding: 10px;
  color: var(--primary-color);
  width: 100%;
  height: fit-content;
  background-color: rgba(0, 0, 0, 0.13);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

export const ListItem = styled.li`
  font-size: 15px;
  list-style-type: square;
  margin: 3px 0;

  ${(props) => props.isPositive && 'color: var(--success-color);'}
  ${(props) => props.isNegative && 'color: var(--error-color);'}
`

export const Text = styled.p`
  color: var(--primary-color);

  ${(props) =>
    props.isMotivation &&
    `
    margin-bottom: 20px;
  `}

  ${(props) =>
    props.playerName &&
    `
    color: var(--primary-background);
    font-size: 16px;
    text-transform: capitalize;
  `}

  ${(props) =>
    props.diceResult &&
    `
    color: var(--primary-background);
    font-size: 50vw;
    text-align: center;
  `}

  ${(props) =>
    props.isName &&
    `
    font-weight: bold;
    text-align: center;
    text-transform: capitalize;
  `}

  ${(props) =>
    props.isAllyDice &&
    `
    color: var(--primary-background);
    text-align: center;
  `}

  ${(props) =>
    props.isUnavailable &&
    `
    opacity: .3;
  `}
`

export const DiceTray = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
`

export const Dice = styled.button`
  height: 70px;
  width: 100%;
  background: transparent;
  border: none;
  color: var(--primary-color);
  text-align: center;
  border-radius: 6px;
  display: flex;
  align-items: center;

  :active {
    background: #000;
  }

  ${(props) =>
    props.disabled &&
    `
    opacity: .5;
  `}
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

export const PlayerTag = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 10px 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`

export const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
`

export const Details = styled.details`
  margin-left: 20px;
  opacity: 0.7;
`

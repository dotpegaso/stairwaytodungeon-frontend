import styled from 'styled-components/macro'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`

export const AllyDiceTrayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
  width: fit-content;
  border-radius: 6px;
  background: var(--primary-color);
  position: relative;
  padding: 20px;
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
  gap: 15px;
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
    font-size: 18px;
  `}

${(props) =>
    props.diceResult &&
    `
    color: var(--primary-background);
    font-size: 50vw;
    text-align: center;
  `}
`

export const DiceTray = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
`

export const Dice = styled.button`
  height: 75px;
  width: 100%;
  background: transparent;
  border: 2px solid var(--primary-color);
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
`

export const PlayerTag = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

export const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
`

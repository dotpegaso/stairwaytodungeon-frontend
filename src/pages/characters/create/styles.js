import styled from 'styled-components'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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

  ${(props) =>
    props.isSelected &&
    `
    background-color: rgba(0, 0, 0, 1);
  `}
`

export const Input = styled.input`
  font-size: 16px;
  background: transparent;
  border: 2px solid var(--primary-color);
  padding: 15px 10px;
  color: var(--primary-color);
  width: 100%;
`

export const LoadScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background: var(--primary-background);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
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
`

export const ClassOptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
`

export const ClassOption = styled.div`
  font-size: 16px;
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  width: 100%;
  padding: 15px 0;
  text-align: center;
  border-radius: 6px;

  ${(props) =>
    props.isSelected &&
    `
    background-color: rgba(0, 0, 0, 1);
  `}
`

export const Button = styled.button`
  font-size: 16px;
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  width: 100%;
  padding: 15px 0;
`

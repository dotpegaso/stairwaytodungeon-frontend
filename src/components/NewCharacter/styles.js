import styled from 'styled-components'
import { components } from 'react-select'

export const Form = styled.form`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 40px;
`

export const Text = styled.p`
  font-size: 18px;
`

export const Input = styled.input`
  background: transparent;
  border: 2px solid var(--border-color);
  padding: 15px;
  width: 220px;
  font-size: 16px;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`

export const StyledControl = styled(components.Control)`
  border: 2px solid var(--border-color) !important;
  padding: 5px;
`

export const CharacterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  gap: 20px;
  padding: 10px 20px 20px;
  height: 100%;
  position: relative;

  @media screen and (min-width: 520px) {
    margin: 0 auto;
    width: fit-content;
  }
`

export const CharacterCard = styled.div`
  border: 2px solid var(--border-color);
  display: flex;
  flex: 0 0 auto;
  width: fit-content;
  height: 100%;
  padding: var(--padding);
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  gap: 15px;
  box-shadow: var(--box-shadow);
  transition: all 0.2s ease;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    box-shadow: none;
    transform: translate(5px, 5px);
    position: relative;

    ::after {
      content: 'ESCOLHIDO';
      width: fit-content;
      height: fit-content;
      padding: 4px 20px;
      background: var(--black-23);
      color: #FFF;
      position: absolute;
      top: -15px;
      font-size: 14px;
      border-radius: 20px;
      left: 50%;
      right: 0%;
      transform: translate(-50%, 0%);
    }
  `}
`

export const CharacterDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 230px;
`

export const CharacterAttribute = styled.div`
  ${(props) => props.positive && 'color: var(--positive-text)'};
  ${(props) => props.negative && 'color: var(--negative-text)'};
`

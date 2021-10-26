import styled from 'styled-components/macro'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`

export const CharacterCard = styled.div`
  margin: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  color: var(--primary-color);
  width: calc(100% - 40px);
`

export const Input = styled.input``

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
`

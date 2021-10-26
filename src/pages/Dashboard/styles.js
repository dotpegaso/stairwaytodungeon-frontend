import styled from 'styled-components/macro'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  justify-content: center;
  align-items: center;
`

export const CharacterCard = styled.div`
  width: calc(100% - 20%);
  margin: 0 10%;
  padding: 10px 0;
  border-radius: 6px;
  text-align: center;
  color: var(--primary-color);
  border: 3px solid var(--primary-color);
`

export const CharacterName = styled.p`
  font-size: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`

export const CharacterPreview = styled.p`
  font-size: 1rem;
`

export const EmptyCharacterList = styled.div`
  color: var(--primary-color);
  font-size: 18px;
  opacity: 0.6;
`

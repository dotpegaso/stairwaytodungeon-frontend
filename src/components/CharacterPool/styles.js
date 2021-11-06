import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  gap: var(--gap);
  padding-left: 20%;
  position: fixed;
  bottom: 100px;
`

export const CharacterCard = styled.div`
  margin-top: auto;
  background: var(--green-34);
  width: 240px;
  height: 280px;
  padding: var(--padding);
  flex: 0 0 auto;
`

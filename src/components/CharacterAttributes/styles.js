import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  gap: var(--gap);
  padding: var(--padding);
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 800px;
`

export const Attribute = styled.div`
  padding: var(--small-padding);
  text-transform: uppercase;
  word-break: break-word;
  hyphens: auto;
  background: var(--secondary-background);
  color: var(--primary-text);
  display: flex;
  align-items: center;

  ${(props) => props.isPositive && 'color: var(--positive-text);'}
  ${(props) => props.isNegative && 'color: var(--negative-text);'}
`

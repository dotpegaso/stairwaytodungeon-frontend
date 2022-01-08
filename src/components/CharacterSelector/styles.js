import styled from 'styled-components'

export const Container = styled.div`
  padding: var(--padding);
  background: var(--secondary-background);
  box-shadow: var(--box-shadow);
  width: 800px;
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: var(--gap);
`

export const Anchor = styled.a`
  color: var(--green-52);
  text-transform: uppercase;
  text-decoration: none;
`

import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  gap: var(--gap);
  padding: var(--padding);
  width: 100%;
  grid-template-areas:
    'a a b b'
    'a a c c'
    'd d e e'
    'f f f f';
`

export const Attribute = styled.div`
  padding: var(--small-padding);
  text-transform: uppercase;
  word-break: break-word;
  hyphens: auto;
  background: var(--green-34);
  color: var(--secondary-text);
  display: flex;
  align-items: center;

  ${(props) => props.isPositive && 'color: var(--positive-text);'}
  ${(props) => props.isNegative && 'color: var(--negative-text);'}

  :nth-child(1) {
    grid-area: a;
    font-size: 30px;
  }

  :nth-child(2) {
    grid-area: b;
    font-size: 16px;
  }

  :nth-child(3) {
    grid-area: c;
    font-size: 16px;
  }

  :nth-child(4) {
    grid-area: d;
    font-size: 14px;
  }

  :nth-child(5) {
    grid-area: e;
    font-size: 14px;
  }

  :nth-child(6) {
    grid-area: f;
    font-size: 14px;
  }
`

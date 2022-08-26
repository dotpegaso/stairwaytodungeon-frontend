import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 490px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export const Level = styled.div`
  background: var(--white-99);
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid;
  font-size: 12px;
`

export const Container = styled.div`
  background: var(--white-97);
  padding: 20px;
  bordar-radius: var(--border-radius);
  cursor: pointer;
  border: 1px solid var(--white-97);
  transition: 0.2s all ease;

  :hover {
    border-color: black;
  }

  ${(props) =>
    props.isReverse &&
    `
    color: white;
    background: #666;

    :hover {
      border-color: red;
    }

    ${Level} {
      color: black;
    }
  `}
`

export const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

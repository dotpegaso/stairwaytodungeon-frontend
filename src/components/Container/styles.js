import styled from 'styled-components'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  position: relative;

  ${({ withMenu }) =>
    withMenu &&
    `
    padding-bottom: 80px;
  `}
`

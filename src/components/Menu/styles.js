import styled from 'styled-components'

export const Menu = styled.menu`
  width: 100%;
  height: 70px;
  background-color: var(--green-34);
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
`
export const MenuOption = styled.a`
  color: var(--green-52);
  text-transform: uppercase;
  text-decoration: none;

  ${({ isActive }) =>
    isActive &&
    `
    color: var(--green-88);
  `}
`

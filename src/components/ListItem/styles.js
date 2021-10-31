import styled from 'styled-components'

export const ListItem = styled.li`
  font-size: 15px;
  list-style-type: square;
  margin: 3px 0;

  ${(props) => props.isPositive && 'color: var(--success-color);'}
  ${(props) => props.isNegative && 'color: var(--error-color);'}
`

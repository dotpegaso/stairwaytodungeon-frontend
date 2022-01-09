import styled from 'styled-components'

export const Button = styled.button`
  background: transparent;
  border: 2px solid var(--border-color);
  padding: 15px 30px;
  box-shadow: var(--box-shadow);
  font-size: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
  color: var(--primary-text);

  :active {
    transform: translate(5px, 5px);
    box-shadow: none;
  }

  :disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  p {
    color: var(--primary-text);
    background: var(--white-97);
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 16px;
    height: 35px;
    display: grid;
    place-items: center;
  }
`

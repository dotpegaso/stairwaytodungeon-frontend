import styled, { keyframes } from 'styled-components'

const slideUp = keyframes`
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Container = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
  align-content: center;
`

export const Text = styled.p`
  color: black;
  margin-top: 15px;
  max-width: 450px;
  text-align: center;
  line-height: 1.4;
  opacity: 0;
  animation: ${slideUp} 0.5s ease-in-out forwards;
  animation-delay: 0.3s;
`

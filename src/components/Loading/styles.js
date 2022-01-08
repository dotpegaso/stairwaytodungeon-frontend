import styled, { keyframes } from 'styled-components'

export const animationShake = keyframes`
  0%, 57% { transform: translateY(0); }
  67.5% { transform: translateY(-5px); }
  78% { transform: translateY(5px); }
  88.5% { transform: translateY(-5px); }
  95% { transform: translateY(5px); }
  100% { transform: translateY(0); }
`

export const LoadingContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
`

export const LoadingIcon = styled.img`
  animation: ${animationShake} 3s infinite;
`

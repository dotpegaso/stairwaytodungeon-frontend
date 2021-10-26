import styled, { css, keyframes } from 'styled-components/macro'

export const animationShake = keyframes`
  0%, 57% { transform: translateY(0); }
  67.5% { transform: translateY(-5px); }
  78% { transform: translateY(5px); }
  88.5% { transform: translateY(-5px); }
  95% { transform: translateY(5px); }
  100% { transform: translateY(0); }
`

const sharedStyles = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--primary-color);
`

export const Container = styled.div`
  ${sharedStyles}
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background: var(--primary-background);
`

export const InlineContainer = styled.div`
  ${sharedStyles}
`

export const Text = styled.p`
  color: var(--primary-color);
  font-size: 18px;
`

export const Image = styled.img`
  animation: ${animationShake} 3s infinite;
`

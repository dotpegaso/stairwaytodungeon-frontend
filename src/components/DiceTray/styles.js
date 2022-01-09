import styled, { keyframes, css } from 'styled-components'

export const gradientShift = keyframes`
  0% {
    background-position: 58% 50%;
  }
  25% {
    background-position: 100% 0%;
  }
  75% {
    background-position: 10% 50%;
  }
  100% {
    background-position: 58% 50%;
  }
`

export const rainbowEffect = css`
  background: linear-gradient(45deg, var(--rainbow));
  background-position: 58% 50%;
  background-size: 500%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: ${gradientShift} 3s ease infinite;
  -webkit-text-fill-color: transparent;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`

export const Dicetray = styled.div`
  height: fit-content;
  width: 400px;
  padding: var(--padding);
  background: #fff;
  border: 2px solid var(--black-23);
  box-shadow: var(--box-shadow);
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-around;
  align-items: center;
  text-transform: uppercase;
  gap: var(--gap);

  @media screen and (max-width: 490px) {
    width: 90%;
  }
`

export const Announcement = styled.div`
  font-size: 22px;

  ${(props) =>
    props.diceResult &&
    `
    font-size: 90px;
    text-align: center;
  `}

  ${(props) =>
    props.diceResult === 20 &&
    css`
      background-clip: text;
      -webkit-text-fill-color: transparent;
      ${rainbowEffect}
    `}

  ${(props) =>
    props.diceResult === 1 &&
    `
    color: var(--red-44);
  `}
`

export const Badge = styled.div`
  color: var(--primary-text);
  background-clip: none;
  -webkit-text-fill-color: var(--primary-text);
  font-size: 16px;
  background: var(--white-97);
  width: fit-content;
  margin: 0 auto;
  padding: 6px 10px;
  border-radius: 20px;
`

export const Flex = styled.div`
  display: flex;
  gap: 5px;
`

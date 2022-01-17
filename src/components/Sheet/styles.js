import styled from 'styled-components'

function getBlur(remainingHitPoints) {
  if (remainingHitPoints > 90) {
    return '0px'
  }
  if (remainingHitPoints < 30) {
    return '1px'
  }
  if (remainingHitPoints < 20) {
    return '2px'
  }
}

export const Container = styled.div`
  height: 100%;
  width: 60%;
  margin: auto;
  display: grid;
  gap: 20px;
  margin-top: 2%;
  padding-bottom: 10%;
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.opacity &&
    `
    opacity: ${props.opacity / 100};
    filter: blur(${getBlur(props.opacity)});
  `};

  @media screen and (max-width: 490px) {
    width: 100%;
  }
`

export const Flex = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  gap: 30px;
  padding: 10px;

  ${(props) => props.column && 'flex-direction: column;'}

  @media screen and (max-width: 490px) {
    flex-direction: column;
  }
`

export const Name = styled.p`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 40px;
  text-transform: capitalize;
  font-weight: bold;
`

export const BigText = styled.p`
  font-size: 24px;
  color: var(--white-90);
`

export const FlexContainer = styled.div`
  display: flex;
  gap: 15px;

  ${(props) => props.wrap && 'flex-wrap: wrap;'}
`

export const Badge = styled.p`
  color: var(--primary-text);
  background: var(--white-97);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 16px;
  width: fit-content;
  height: 35px;
  display: grid;
  place-items: center;
`

export const Box = styled.div`
  background: var(--white-97);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 15px;
  border-radius: 8px;
`

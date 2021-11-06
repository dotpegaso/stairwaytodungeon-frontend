import styled, { keyframes } from 'styled-components'

const marquee = keyframes`
  0% { transform: translate(0, 0); }
  100% { transform: translate(-100%, 0); }
`

export const HorizontalScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  gap: var(--gap);
  padding-left: 20px;
  height: 100px;
  position: relative;
`

export const Card = styled.div`
  flex: 0 0 auto;
  width: 240px;
  height: 100px;
  padding: var(--padding);
  background-color: var(--green-34);
  color: var(--green-88);
  font-size: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  ${(props) =>
    props.isForgotten &&
    `
    opacity: 0.1;
    pointer-events: none;
    touch-action: none;
  `}

  ${(props) =>
    props.isEmpty &&
    `
    width: calc(100% - 55px);
    text-align: center;
    justify-content: center;
    background: transparent;
    opacity: .5;
    border: 3px solid var(--primary-text);
  `}
`

export const Damage = styled.span`
  color: #fff;
  font-size: 18px;
`

export const MagicDescription = styled.p`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

export const Bonus = styled.p`
  width: 100%;
  padding: var(--padding);
  text-align: center;
  color: var(--green-88);
  text-transform: uppercase;
  font-size: 22px;
`

export const Marquee = styled.p`
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;

  span {
    display: inline-block;
    width: max-content;

    padding-left: 100%;
    /* show the marquee just outside the paragraph */
    will-change: transform;
    animation: ${marquee} 20s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee span {
      animation-iteration-count: 1;
      animation-duration: 0.01;
      /* instead of animation: none, so an animationend event is
     * still available, if previously attached.
     */
      width: auto;
      padding-left: 0;
    }
  }
`

export const DicePoolWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 100%;
  gap: var(--gap);
`

export const Tag = styled.div`
  background: var(--green-34);
  width: 30px;
  position: relative;
  display: flex;
  align-items: center;

  p {
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    width: 100%;
    margin-top: 58px;
  }
`

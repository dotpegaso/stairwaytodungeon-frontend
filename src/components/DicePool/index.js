import React from 'react'

import * as S from './styles'

const diceIconByValue = {
  4: '/images/d4.svg',
  6: '/images/d6.svg',
  8: '/images/d8.svg',
  10: '/images/d10.svg',
  12: '/images/d12.svg',
  20: '/images/d20.svg'
}

const Dicepool = ({ diceRollRequested, handleDiceRoll }) =>
  [4, 6, 8, 10, 12, 20].map((dice, index) => (
    <S.Dice
      key={index}
      disabled={diceRollRequested}
      onClick={() => handleDiceRoll(dice)}>
      <S.Icon src={diceIconByValue[dice]} />
    </S.Dice>
  ))

export default Dicepool

import { useEffect } from 'react'
import _ from 'lodash'

import { useCharacter } from '../../context/characterContext'
import { useDice } from '../../context/diceContext'

import { diceRoll } from '../../utils'
import { socket } from '../../pages/_app'

import { useGetCombatBonus } from '../../hooks'

import * as S from './styles'

const diceIconByValue = {
  4: '/images/d4.svg',
  6: '/images/d6.svg',
  8: '/images/d8.svg',
  10: '/images/d10.svg',
  12: '/images/d12.svg',
  20: '/images/d20.svg'
}

const rollDataTimeout = 4600

const Dicepool = () => {
  const { characterDetails } = useCharacter()
  const { totalMeleeBonus, totalRangedBonus } = useGetCombatBonus()

  const {
    diceRollRequested,
    setDiceRollRequested,
    setDiceRollSides,
    setDiceRollResult,
    setSocketIOPlayerName,
    setSocketIOMeleeBonus,
    setSocketIORangedBonus,
    resetRollData,
    diceRollSides
  } = useDice()

  useEffect(() => {
    socket.on('diceroll', function (socketIOPlayer) {
      setDiceRollRequested(true)

      setSocketIOPlayerName(socketIOPlayer.name)
      setSocketIOMeleeBonus(socketIOPlayer.meleeBonus)
      setSocketIORangedBonus(socketIOPlayer.rangedBonus)

      setDiceRollSides(socketIOPlayer.dice)
      setDiceRollResult(socketIOPlayer.result)

      setTimeout(() => resetRollData(), rollDataTimeout)
    })
  })

  async function handleDiceRoll(dice) {
    setDiceRollSides(dice)
    setDiceRollRequested(true)

    const result = await diceRoll(dice)

    setDiceRollResult(result)

    socket.emit('diceroll', {
      result,
      dice,
      meleeBonus: totalMeleeBonus,
      rangedBonus: totalRangedBonus,
      name: _.get(characterDetails, 'name')
    })

    setTimeout(() => resetRollData(), rollDataTimeout)
  }

  return (
    <S.Container>
      {[4, 6, 8, 10, 12, 20].map((dice, index) => (
        <S.Dice
          key={index}
          disabled={diceRollRequested}
          selected={dice === diceRollSides}
          onClick={() => handleDiceRoll(dice)}>
          <S.Icon src={diceIconByValue[dice]} />
        </S.Dice>
      ))}
    </S.Container>
  )
}

export default Dicepool

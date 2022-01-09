import { useEffect } from 'react'
import _ from 'lodash'
import confetti from 'canvas-confetti'

import { useDice } from '../../context/diceContext'
import { useCharacter } from '../../context/characterContext'

import { useGetCombatBonus } from '../../hooks'

import * as S from './styles'

const DiceTray = () => {
  const { characterDetails } = useCharacter()
  const { socketIOPlayerName, diceRollResult, diceRollSides } = useDice()
  const { totalMeleeBonus, totalRangedBonus } = useGetCombatBonus()

  useEffect(() => {
    if (diceRollResult === 20) {
      confetti()
    }
  }, [diceRollResult])

  const playerName = socketIOPlayerName || _.get(characterDetails, 'name')

  if (_.isNil(diceRollResult)) {
    return null
  }

  return (
    <S.Overlay>
      <S.Dicetray>
        <S.Announcement>
          <strong>{playerName}</strong>
          {' rolou um '}
          <strong>{`d${diceRollSides}`}</strong>
          {' e o resultado foi: '}
        </S.Announcement>

        <S.Announcement diceResult={diceRollResult}>
          <p>{diceRollResult}</p>
          <S.Flex>
            {totalMeleeBonus !== 0 && (
              <S.Badge>{`⚔️ ${totalMeleeBonus}`}</S.Badge>
            )}
            {totalRangedBonus !== 0 && (
              <S.Badge>{`🏹 ${totalRangedBonus}`}</S.Badge>
            )}
          </S.Flex>
        </S.Announcement>
      </S.Dicetray>
    </S.Overlay>
  )
}

export default DiceTray

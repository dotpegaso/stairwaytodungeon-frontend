import { useEffect } from 'react'
import _ from 'lodash'
import confetti from 'canvas-confetti'

import BlurOverlay from '../BlurOverlay'

import { useDice } from '../../context/diceContext'
import { useCharacter } from '../../context/characterContext'

import * as S from './styles'

const DiceTray = () => {
  const { characterDetails } = useCharacter()
  const {
    socketIOPlayerName,
    socketIOMeleeBonus,
    socketIORangedBonus,
    diceRollResult,
    diceRollSides
  } = useDice()

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
    <BlurOverlay>
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
            {socketIOMeleeBonus !== 0 && (
              <S.Badge>{`⚔️ ${socketIOMeleeBonus}`}</S.Badge>
            )}
            {socketIORangedBonus !== 0 && (
              <S.Badge>{`🏹 ${socketIORangedBonus}`}</S.Badge>
            )}
          </S.Flex>
        </S.Announcement>
        {diceRollSides === 20 && diceRollResult === 1 && (
          <S.Image src="/images/pepe.png" />
        )}
      </S.Dicetray>
    </BlurOverlay>
  )
}

export default DiceTray

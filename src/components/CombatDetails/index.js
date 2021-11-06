import React, { useState } from 'react'
import { io } from 'socket.io-client'
import _ from 'lodash'

import { useCharacter } from '../../context/characterContext'
import { getCombatBonus, diceRoll } from '../../utils'

import DicePool from '../DicePool'
import DiceTray from '../DiceTray'
import MagicDetails from '../MagicDetails'

import * as S from './styles'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT)
const rollDataTimeout = 3600

const CombatDetails = () => {
  const [diceRollRequested, setDiceRollRequested] = useState(false)
  const [diceRollResult, setDiceRollResult] = useState(null)
  const [diceRollSides, setDiceRollSides] = useState(null)
  const [socketIOPlayerName, setSocketIOPlayerName] = useState(null)

  const [magicDetailsRequested, setMagicDetailsRequested] = useState(null)

  const { characterDetails } = useCharacter()

  const weapons = _.defaultTo(_.get(characterDetails, 'weapons'), [])
  const grimoire = _.defaultTo(_.get(characterDetails, 'grimoire'), [])
  const combatBonus = getCombatBonus(characterDetails)

  function resetRollData() {
    setDiceRollRequested(false)
    setDiceRollSides(null)
    setDiceRollResult(null)
    setSocketIOPlayerName(null)
  }

  async function handleDiceRoll(dice) {
    setDiceRollRequested(true)

    const result = await diceRoll(dice)

    setDiceRollSides(dice)
    setDiceRollResult(result)

    socket.emit('diceroll', {
      result,
      dice,
      name: _.get(characterDetails, 'name')
    })

    setTimeout(() => resetRollData(), rollDataTimeout)
  }

  function handleShowMagicDetails(magic) {
    setMagicDetailsRequested(magic)
  }

  function renderWeapons() {
    if (_.isEmpty(weapons)) {
      return <S.Card isEmpty>Você não possui equipamentos</S.Card>
    }

    return weapons.map((weapon, index) => {
      const damage = _.get(weapon, 'damage')
      const attackBonus = _.get(weapon, 'attack_bonus')

      return (
        <S.Card key={index}>
          <div>
            {`${_.get(weapon, 'name')} ${
              _.isNil(attackBonus) ? ' ' : `+${attackBonus} `
            }`}
          </div>
          {_.isNil(damage) ? null : (
            <S.Damage>{`🎲 ${_.get(weapon, 'damage')}`}</S.Damage>
          )}
        </S.Card>
      )
    })
  }

  function renderGrimoire() {
    if (_.isEmpty(grimoire)) {
      return <S.Card isEmpty>Você não possui magias</S.Card>
    }

    return grimoire.map((magic, index) => {
      return (
        <S.Card
          key={index}
          isForgotten={_.get(magic, 'isForgotten')}
          onClick={() => handleShowMagicDetails(magic)}>
          <div>{_.get(magic, 'name')}</div>
          <S.MagicDescription>{_.get(magic, 'description')}</S.MagicDescription>
        </S.Card>
      )
    })
  }

  const dicePoolProps = {
    diceRollRequested,
    handleDiceRoll
  }

  const diceTrayProps = {
    playerName: socketIOPlayerName || _.get(characterDetails, 'name'),
    diceRollResult,
    diceRollSides
  }

  const magicDetailsProps = {
    magic: magicDetailsRequested,
    handleClose: () => setMagicDetailsRequested(null)
  }

  return (
    <>
      <S.HorizontalScrollContainer>
        <S.Tag>
          <p>EQUIPAMENTO</p>
        </S.Tag>
        {renderWeapons()}
      </S.HorizontalScrollContainer>

      <S.HorizontalScrollContainer>
        <S.Tag>
          <p>MAGIAS</p>
        </S.Tag>
        {renderGrimoire()}
      </S.HorizontalScrollContainer>

      <S.Bonus>
        <S.Marquee>
          <span>{combatBonus}</span>
        </S.Marquee>
      </S.Bonus>

      <S.DicePoolWrapper>
        <DicePool {...dicePoolProps} />
      </S.DicePoolWrapper>

      {!_.isNil(diceRollResult) && <DiceTray {...diceTrayProps} />}
      {!_.isNil(magicDetailsRequested) && (
        <MagicDetails {...magicDetailsProps} />
      )}
    </>
  )
}

export default CombatDetails

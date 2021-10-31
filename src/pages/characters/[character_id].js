import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context'

import { Loading } from '../../components'

import {
  getLevelByExperienceCrystals,
  getCharacterDescription,
  getArmorClass,
  parseClass,
  getThaco,
  diceRoll,
  api
} from '../../utils'

import * as S from './styles'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT)

const diceIconByValue = {
  4: '/images/d4.svg',
  6: '/images/d6.svg',
  8: '/images/d8.svg',
  10: '/images/d10.svg',
  12: '/images/d12.svg',
  20: '/images/d20.svg'
}

function getAvatar({ discordId, avatarHash }) {
  return `https://cdn.discordapp.com/avatars/${discordId}/${avatarHash}.png`
}

const Character = () => {
  const [diceResult, setDiceResult] = useState()
  const [diceRequested, setDiceRequested] = useState(false)
  const [allyAvatar, setAllyAvatar] = useState()
  const [allyName, setAllyName] = useState()
  const [allyDice, setAllyDice] = useState()
  const [playerCharacter, setUpdatedPlayerCharacter] = useState({})

  const { discordId, avatarHash } = useAppContext()

  const router = useRouter()
  const { character_id } = router.query

  useEffect(() => {
    api({ method: 'GET', url: `characters/${character_id}` }).then(
      (response) => {
        setUpdatedPlayerCharacter(response)
      }
    )
  }, [character_id])

  useEffect(() => {
    if (_.isNil(discordId)) {
      router.push('/')
    }
  }, [discordId, router])

  useEffect(() => {
    socket.on('characters', () => {
      if (!_.isNil(playerCharacter)) {
        api({ method: 'GET', url: `characters/${character_id}` }).then(
          (response) => {
            setUpdatedPlayerCharacter(response)
          }
        )
      }
    })

    socket.on('diceroll', function (ally) {
      setDiceResult(ally.result)
      setAllyAvatar(ally.avatar)
      setAllyName(ally.name)
      setAllyDice(ally.dice)
      setDiceRequested(true)

      setTimeout(() => {
        setDiceResult(null)
        setDiceRequested(false)
        setAllyAvatar(null)
        setAllyName(null)
        setAllyDice(null)
      }, 4000)
    })
  }, [character_id, playerCharacter])

  async function handleDiceRoll(dice) {
    setDiceRequested(true)
    const result = await diceRoll(dice)
    setDiceResult(result)

    socket.emit('diceroll', {
      result,
      dice,
      avatar: getAvatar({ discordId, avatarHash }),
      name: _.get(playerCharacter, 'name')
    })

    setTimeout(() => {
      setDiceResult(null)
      setDiceRequested(false)
    }, 3500)
  }

  function renderDescription() {
    return getCharacterDescription(playerCharacter || []).map(
      (attribute, index) => (
        <S.ListItem
          key={index}
          isPositive={attribute.value === 3}
          isNegative={attribute.value === -3}>
          {attribute.description}
        </S.ListItem>
      )
    )
  }

  if (_.isEmpty(playerCharacter)) {
    return <Loading>Carregando personagem</Loading>
  }

  return (
    <S.Container>
      <S.Text isName>{`${_.get(playerCharacter, 'name')}, ${parseClass(
        _.get(playerCharacter, 'class')
      )} de Nível ${getLevelByExperienceCrystals(
        _.get(playerCharacter, 'experience_crystals')
      )}`}</S.Text>

      <S.CharacterCard>
        <div>{renderDescription()}</div>

        {_.size(_.get(playerCharacter, 'weapons')) > 0 && (
          <S.Gap>
            <S.Text>Equipamentos:</S.Text>
            {_.get(playerCharacter, 'weapons').map((weapon, index) => (
              <S.Text key={index}>
                {`-
                  ${weapon.name}
                  ${!_.isNil(weapon.damage) ? `(${weapon.damage})` : ''}
                  ${
                    !_.isNil(weapon.attack_bonus)
                      ? `(${weapon.attack_bonus_description})`
                      : ''
                  }
                  ${
                    !_.isNil(weapon.defense_bonus)
                      ? `(${weapon.defense_bonus_description})`
                      : ''
                  }

                `}
              </S.Text>
            ))}
          </S.Gap>
        )}

        {_.size(_.get(playerCharacter, 'grimoire')) > 0 && (
          <S.Gap>
            <S.Text>Magias:</S.Text>
            {_.get(playerCharacter, 'grimoire').map((spell, index) => {
              return _.get(spell, 'isAvailable') ? (
                <div key={index}>
                  <S.Text>{`✨ ${spell.name}`}</S.Text>
                  <S.Details key={index}>
                    <summary>Detalhes da magia</summary>
                    <S.Text>{`${spell.description}`}</S.Text>
                  </S.Details>
                </div>
              ) : (
                <S.Text isUnavailable>{`✨ ${spell.name} - esquecida`}</S.Text>
              )
            })}
          </S.Gap>
        )}

        {_.size(_.get(playerCharacter, 'items')) > 0 && (
          <S.Gap>
            <S.Text>Items:</S.Text>
            {_.get(playerCharacter, 'items').map((item, index) => {
              return _.get(item, 'quantity') > 0 ? (
                <S.Text key={index}>{`${item.quantity} ${item.name}`}</S.Text>
              ) : (
                <S.Text
                  key={index}
                  isUnavailable>{`${item.quantity} ${item.name}`}</S.Text>
              )
            })}
          </S.Gap>
        )}

        <S.Gap>
          <S.Text>Extra:</S.Text>
          <S.Text>{`💰 ${_.get(playerCharacter, 'gold_pieces')}`}</S.Text>
          <S.Text>{`🏏 THAC0: ${getThaco({
            characterClass: _.get(playerCharacter, 'class'),
            level: getLevelByExperienceCrystals(
              _.get(playerCharacter, 'experience_crystals')
            )
          })}`}</S.Text>
          <S.Text>{`🛡 Armadura: ${getArmorClass({
            baseArmorClass: _.get(playerCharacter, 'armor_class'),
            weapons: _.defaultTo(_.get(playerCharacter, 'weapons'), []),
            playerCharacter
          })}`}</S.Text>
          <S.Text>{`💠 Cristais de XP: ${_.get(
            playerCharacter,
            'experience_crystals'
          )} `}</S.Text>
          <S.Text>{`👤 Já foi: ${_.get(
            playerCharacter,
            'occupation'
          )}`}</S.Text>
          {_.get(playerCharacter, 'first_weapon') && (
            <S.Text>{`✋ Equipamento: ${_.get(
              playerCharacter,
              'first_weapon'
            )}`}</S.Text>
          )}
        </S.Gap>
      </S.CharacterCard>

      <S.DiceTray>
        {[4, 6, 8, 10, 12, 20].map((dice, index) => (
          <S.Dice
            key={index}
            disabled={diceRequested}
            onClick={() => handleDiceRoll(dice)}>
            <S.Icon src={diceIconByValue[dice]} />
          </S.Dice>
        ))}
      </S.DiceTray>

      {!_.isNil(diceResult) && (
        <S.AllyDiceTrayOverlay>
          <S.AllyDiceTray>
            <S.PlayerTag>
              {allyAvatar && <S.Avatar src={allyAvatar} alt="avatar" />}
              <S.Text playerName>{`${
                allyName || _.get(playerCharacter, 'name')
              }`}</S.Text>
            </S.PlayerTag>
            <S.Text diceResult>{diceResult}</S.Text>
            {allyDice && <S.Icon src={diceIconByValue[allyDice]} isAllyDice />}
          </S.AllyDiceTray>
        </S.AllyDiceTrayOverlay>
      )}
    </S.Container>
  )
}

export default Character

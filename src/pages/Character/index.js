/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useNavigate } from '@reach/router'
import { io } from 'socket.io-client'

import {
  getLevelByExperienceCrystals,
  getCharacterDescription,
  diceRoll,
  api,
  parseClass
} from '../../utils'

import d4 from '../../assets/images/d4.svg'
import d6 from '../../assets/images/d6.svg'
import d8 from '../../assets/images/d8.svg'
import d10 from '../../assets/images/d10.svg'
import d12 from '../../assets/images/d12.svg'
import d20 from '../../assets/images/d20.svg'

import * as S from './styles'

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT)

const diceIconByValue = {
  4: d4,
  6: d6,
  8: d8,
  10: d10,
  12: d12,
  20: d20
}

function getAvatar({ id, avatar }) {
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
}

const Character = ({ location }) => {
  const [diceResult, setDiceResult] = useState()
  const [diceRequested, setDiceRequested] = useState(false)
  const [allyAvatar, setAllyAvatar] = useState()
  const [allyName, setAllyName] = useState()
  const [allyDice, setAllyDice] = useState()
  const [playerCharacter, setUpdatedPlayerCharacter] = useState({})
  const navigate = useNavigate()
  const { character, avatar, id } = _.defaultTo(
    _.get(location, 'state.player'),
    {}
  )

  useEffect(() => {
    api({ method: 'GET', url: `characters/${character.id}` }).then(
      (response) => {
        setUpdatedPlayerCharacter(response)
      }
    )
  }, [character.id])

  useEffect(() => {
    if (_.isNil(id)) {
      navigate('/')
    }
  }, [id, navigate])

  useEffect(() => {
    socket.on('characters', () => {
      console.log('chars')
      if (!_.isNil(playerCharacter)) {
        api({ method: 'GET', url: `characters/${character.id}` }).then(
          (response) => {
            setUpdatedPlayerCharacter(response)
          }
        )
      }
    })

    socket.on('diceroll', function (ally) {
      console.log('diceroll')
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
  }, [])

  async function handleDiceRoll(dice) {
    setDiceRequested(true)
    const result = await diceRoll(dice)

    setDiceResult(result)
    socket.emit('diceroll', {
      result,
      dice,
      avatar: getAvatar({ id, avatar }),
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

  return (
    <S.Container>
      <S.Text isName>{`${_.get(playerCharacter, 'name')}, ${parseClass(
        _.get(playerCharacter, 'class')
      )} de Nível ${getLevelByExperienceCrystals(
        _.get(playerCharacter, 'experience_crystals')
      )}`}</S.Text>

      <S.CharacterCard>
        <S.Text>{`Busca ${_.get(playerCharacter, 'motivation')}`}</S.Text>
        <div>{renderDescription()}</div>
        <S.Text>{`💰 ${_.get(playerCharacter, 'gold_pieces')}`}</S.Text>
        <S.Text>{`💠 Cristais de XP: ${_.get(
          playerCharacter,
          'experience_crystals'
        )} `}</S.Text>
        <S.Text>{`👤 Já foi: ${_.get(playerCharacter, 'occupation')}`}</S.Text>
        {_.get(playerCharacter, 'first_weapon') && (
          <S.Text>{`✋ Equipamento: ${_.get(
            playerCharacter,
            'first_weapon'
          )}`}</S.Text>
        )}
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
              <S.Avatar
                src={allyAvatar || getAvatar({ id, avatar })}
                alt="avatar"
              />
              <S.Text playerName>{`${
                allyName || _.get(playerCharacter, 'name')
              } rolou:`}</S.Text>
            </S.PlayerTag>
            <S.Text diceResult>{diceResult}</S.Text>
            <S.Icon src={diceIconByValue[allyDice]} isAllyDice />
          </S.AllyDiceTray>
        </S.AllyDiceTrayOverlay>
      )}
    </S.Container>
  )
}

export default Character

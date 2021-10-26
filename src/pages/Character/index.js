/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useNavigate } from '@reach/router'
import { io } from 'socket.io-client'

import {
  getLevelByExperienceCrystals,
  getCharacterDescription,
  diceRoll
} from '../../utils'

import d4 from '../../assets/images/d4.svg'
import d6 from '../../assets/images/d6.svg'
import d8 from '../../assets/images/d8.svg'
import d10 from '../../assets/images/d10.svg'
import d12 from '../../assets/images/d12.svg'
import d20 from '../../assets/images/d20.svg'

import * as S from './styles'

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT)

function getAvatar({ id, avatar }) {
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
}

const Character = ({ location }) => {
  const [diceResult, setDiceResult] = useState()
  const [diceRequested, setDiceRequested] = useState(false)
  const [allyAvatar, setAllyAvatar] = useState()
  const [allyName, setAllyName] = useState()
  const navigate = useNavigate()
  const { character, avatar, id } = _.defaultTo(
    _.get(location, 'state.player'),
    {}
  )

  useEffect(() => {
    if (_.isNil(id)) {
      navigate('/')
    }
  }, [id, navigate])

  socket.on('diceroll', function (ally) {
    setDiceResult(ally.result)
    setAllyAvatar(ally.avatar)
    setAllyName(ally.name)
    setDiceRequested(true)

    setTimeout(() => {
      setDiceResult(null)
      setDiceRequested(false)
      setAllyAvatar(null)
      setAllyName(null)
    }, 3500)
  })

  async function handleDiceRoll(dice) {
    setDiceRequested(true)
    const result = await diceRoll(dice)

    setDiceResult(result)
    socket.emit('diceroll', {
      result,
      avatar: getAvatar({ id, avatar }),
      name: character.name
    })

    setTimeout(() => {
      setDiceResult(null)
      setDiceRequested(false)
    }, 3500)
  }

  function renderDescription() {
    return getCharacterDescription(character).map((attribute, index) => (
      <S.ListItem
        key={index}
        isPositive={attribute.value === 3}
        isNegative={attribute.value === -3}>
        {attribute.description}
      </S.ListItem>
    ))
  }

  return (
    <S.Container>
      <S.Text>{`${character.name}, ${
        character.class
      } de nível ${getLevelByExperienceCrystals(
        character.experience_crystals
      )}`}</S.Text>

      <S.CharacterCard>
        <div>{renderDescription()}</div>
        <S.Text>{`💰 Carrega ${character.gold_pieces} moedas de ouro`}</S.Text>
        <S.Text>{`👤 Já trabalhou como ${character.occupation}`}</S.Text>
        <S.Text>{`💠 Total de Cristais de XP: ${character.experience_crystals} `}</S.Text>
      </S.CharacterCard>

      <S.DiceTray>
        <S.Dice disabled={diceRequested} onClick={() => handleDiceRoll(4)}>
          <S.Icon src={d4} />
        </S.Dice>
        <S.Dice disabled={diceRequested} onClick={() => handleDiceRoll(6)}>
          <S.Icon src={d6} />
        </S.Dice>
        <S.Dice disabled={diceRequested} onClick={() => handleDiceRoll(8)}>
          <S.Icon src={d8} />
        </S.Dice>
        <S.Dice disabled={diceRequested} onClick={() => handleDiceRoll(10)}>
          <S.Icon src={d10} />
        </S.Dice>
        <S.Dice disabled={diceRequested} onClick={() => handleDiceRoll(12)}>
          <S.Icon src={d12} />
        </S.Dice>
        <S.Dice disabled={diceRequested} onClick={() => handleDiceRoll(20)}>
          <S.Icon src={d20} />
        </S.Dice>
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
                allyName || character.name
              } rolou:`}</S.Text>
            </S.PlayerTag>
            <S.Text diceResult>{diceResult}</S.Text>
          </S.AllyDiceTray>
        </S.AllyDiceTrayOverlay>
      )}
    </S.Container>
  )
}

export default Character

/* eslint-disable react/prop-types */
import { io } from 'socket.io-client'
import _ from 'lodash'
import React, { useState } from 'react'
import { getLevelByExperienceCrystals, diceRoll } from '../../utils'
import * as S from './styles'

const socket = io('https://stairwaytodungeon-socket.herokuapp.com:3000')

const Character = ({ location }) => {
  const [diceResult, setDiceResult] = useState()
  const [diceRequested, setDiceRequested] = useState(false)
  const { character } = location.state

  socket.on('diceroll', function (msg) {
    setDiceResult(msg)

    setTimeout(() => {
      setDiceResult(null)
      setDiceRequested(false)
    }, 3500)
  })

  async function handleDiceRoll(dice) {
    setDiceRequested(true)
    const result = await diceRoll(dice)

    setDiceResult(result)
    socket.emit('diceroll', dice)

    setTimeout(() => {
      setDiceResult(null)
      setDiceRequested(false)
    }, 3500)
  }

  return (
    <S.Container>
      <p>nome: {character.name}</p>
      <p>classe: {character.class}</p>
      <p>
        nivel: {getLevelByExperienceCrystals(character.experience_crystals)}
      </p>
      <p>motivação: {character.motivation}</p>
      <p>força: {character.strength}</p>
      <p>destreza: {character.dexterity}</p>
      <p>constuição: {character.constitution}</p>
      <p>inteligência: {character.intelligence}</p>
      <p>sabedoria: {character.wisdom}</p>
      <p>carisma: {character.charisma}</p>
      <p>ocupação: {character.occupation}</p>
      <p>ouro: {character.gold_pieces}</p>
      <p>armadura: {character.armor_class}</p>

      <button disabled={diceRequested} onClick={() => handleDiceRoll(4)}>
        roll d4
      </button>
      <button disabled={diceRequested} onClick={() => handleDiceRoll(6)}>
        roll d6
      </button>
      <button disabled={diceRequested} onClick={() => handleDiceRoll(8)}>
        roll d8
      </button>
      <button disabled={diceRequested} onClick={() => handleDiceRoll(10)}>
        roll d10
      </button>
      <button disabled={diceRequested} onClick={() => handleDiceRoll(12)}>
        roll d12
      </button>
      <button disabled={diceRequested} onClick={() => handleDiceRoll(20)}>
        roll d20
      </button>
      <button disabled={diceRequested} onClick={() => handleDiceRoll(100)}>
        roll d100
      </button>

      {!_.isNil(diceResult) && <h1>{diceResult}</h1>}
    </S.Container>
  )
}

export default Character

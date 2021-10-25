import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from '@reach/router'
import _ from 'lodash'
const RandomOrg = require('random-org')

import {
  pointsToAttributes,
  getGoldPieces,
  getOccupation,
  getHitPointsByClass,
  api
} from '../../utils'

const random = new RandomOrg({
  apiKey: process.env.REACT_APP_RANDOM_ORG_API_KEY
})

import * as S from './styles'

const classOptions = [
  { value: 'cleric', description: 'Clérigo(a)' },
  { value: 'fighter', description: 'Guerreiro(a)' },
  { value: 'magic-user', description: 'Usuário(a) de Magia' },
  { value: 'thief', description: 'Ladino(a)' },
  { value: 'dwarf', description: 'Anão/Anã' },
  { value: 'elf', description: 'Elfo(a)' },
  { value: 'halfling', description: 'Halfling' }
]

const CreateCharacter = ({ location }) => {
  const [attributes, setAttributes] = useState()
  const [characterOptions, setCharacterOptions] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState()
  const [characterName, setCharacterName] = useState()
  const [characterClass, setCharacterClass] = useState()
  const [characterMotivation, setCharacterMotivation] = useState()
  const navigate = useNavigate()

  const { player_id } = location.state

  useEffect(() => {
    random
      .generateIntegers({
        min: 3,
        max: 18,
        n: 18
      })
      .then((result) => {
        const { data } = result.random
        setAttributes(data)
      })
  }, [])

  useEffect(() => {
    if (_.isNil(attributes)) {
      return
    }

    async function initCharacter() {
      const [
        firstAttributePoints,
        secondAttributePoints,
        thirdAttributePoints
      ] = _.chunk(attributes, 6)

      const firstCharacter = {
        ...pointsToAttributes(firstAttributePoints),
        occupation: await getOccupation(),
        gold_pieces: await getGoldPieces(),
        armor_class: 9
      }

      const secondCharacter = {
        ...pointsToAttributes(secondAttributePoints),
        occupation: await getOccupation(),
        gold_pieces: await getGoldPieces(),
        armor_class: 9
      }

      const thirdCharacter = {
        ...pointsToAttributes(thirdAttributePoints),
        occupation: await getOccupation(),
        gold_pieces: await getGoldPieces(),
        armor_class: 9
      }

      setCharacterOptions([firstCharacter, secondCharacter, thirdCharacter])
    }

    initCharacter()
  }, [attributes])

  function renderCharacterOptions() {
    if (_.isEmpty(characterOptions)) {
      return 'Carregando...'
    }

    return characterOptions.map((character, index) => (
      <S.CharacterCard
        onClick={() => setSelectedCharacter(character)}
        key={index}>
        <p>força: {character.strength}</p>
        <p>destreza: {character.dexterity}</p>
        <p>constuição: {character.constitution}</p>
        <p>inteligência: {character.intelligence}</p>
        <p>sabedoria: {character.wisdom}</p>
        <p>carisma: {character.charisma}</p>
        <p>ocupação: {character.occupation}</p>
        <p>ouro: {character.gold_pieces}</p>
        <p>armadura: {character.armor_class}</p>
      </S.CharacterCard>
    ))
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    if (_.isNil(selectedCharacter)) {
      return
    }

    const hp = getHitPointsByClass(characterClass)

    const data = {
      ...selectedCharacter,
      name: characterName,
      class: characterClass,
      motivation: characterMotivation,
      total_hp: hp,
      current_hp: hp,
      player_id
    }

    api({ method: 'POST', url: '/characters', data }).then(() => {
      navigate('/dashboard', { state: { response: { id: player_id } } })
    })
  }

  return (
    <S.Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="nome"
          onChange={({ target }) => setCharacterName(target.value)}
          value={characterName}
          required
        />
        <select
          value={characterClass}
          onChange={({ target }) => setCharacterClass(target.value)}
          required>
          <option value="" disabled selected>
            Classe
          </option>
          {classOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.description}
            </option>
          ))}
        </select>
        {renderCharacterOptions()}
        <input
          placeholder="motivação"
          onChange={({ target }) => setCharacterMotivation(target.value)}
          value={characterMotivation}
          required
        />
        <button type="submit">Criar Personagem</button>
      </form>
    </S.Container>
  )
}

CreateCharacter.propTypes = {
  location: PropTypes.shape({
    state: {
      player_id: PropTypes.number
    }
  }).isRequired
}

export default CreateCharacter

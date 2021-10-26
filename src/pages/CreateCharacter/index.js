import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useNavigate } from '@reach/router'
const RandomOrg = require('random-org')

import { Loading } from '../../components'

import {
  pointsToAttributes,
  getGoldPieces,
  getOccupation,
  getHitPointsByClass,
  getCharacterDescription,
  getCharacterMotivation,
  api,
  parseClass
} from '../../utils'

import * as S from './styles'

const random = new RandomOrg({
  apiKey: process.env.REACT_APP_RANDOM_ORG_API_KEY
})

const classOptions = [
  { value: 'cleric', description: 'Clérigo(a)', emoji: '🛡' },
  { value: 'fighter', description: 'Guerreiro(a)', emoji: '⚔️' },
  { value: 'magic-user', description: 'Mago(a)', emoji: '🧙‍♂️' },
  { value: 'thief', description: 'Ladino(a)', emoji: '🗡' },
  { value: 'dwarf', description: 'Anão/Anã', emoji: '🌋' },
  { value: 'elf', description: 'Elfo(a)', emoji: '🧝‍♂️' },
  { value: 'halfling', description: 'Halfling', emoji: '🦶' }
]

const CreateCharacter = ({ location }) => {
  const [attributes, setAttributes] = useState()
  const [characterOptions, setCharacterOptions] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState()
  const [characterName, setCharacterName] = useState()
  const [characterClass, setCharacterClass] = useState()
  const [characterMotivation, setCharacterMotivation] = useState([])
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCharacterCard, setSelectedCharacterCard] = useState()
  const navigate = useNavigate()

  const { player_id } = _.defaultTo(_.get(location, 'state'), {})

  useEffect(() => {
    if (_.isNil(player_id)) {
      navigate('/')
    }
  }, [player_id, navigate])

  useEffect(() => {
    if (_.isEmpty(characterOptions)) {
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

      setCharacterMotivation(getCharacterMotivation())
    }
  }, [characterOptions])

  useEffect(() => {
    if (_.isNil(attributes) || !_.isEmpty(characterOptions)) {
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
        armor_class: 9,
        id: 1
      }

      const secondCharacter = {
        ...pointsToAttributes(secondAttributePoints),
        occupation: await getOccupation(),
        gold_pieces: await getGoldPieces(),
        armor_class: 9,
        id: 2
      }

      const thirdCharacter = {
        ...pointsToAttributes(thirdAttributePoints),
        occupation: await getOccupation(),
        gold_pieces: await getGoldPieces(),
        armor_class: 9,
        id: 3
      }

      setCharacterOptions([firstCharacter, secondCharacter, thirdCharacter])
    }

    initCharacter()
  }, [attributes, characterOptions])

  useEffect(() => {
    if (!_.isEmpty(characterOptions)) {
      setShowLoadingScreen(false)
    }
  }, [characterOptions])

  function handleCharacterSelection({ character, index }) {
    setSelectedCharacter(character)
    setSelectedCharacterCard(index)
  }

  if (showLoadingScreen) {
    return <Loading>Gerando opções de personagens...</Loading>
  }

  function renderCharacterOptions() {
    return characterOptions.map((character, index) => (
      <S.CharacterCard
        onClick={() =>
          handleCharacterSelection({ character, index: character.id })
        }
        isSelected={selectedCharacterCard === character.id}
        key={index}>
        <S.Text>
          {`${
            parseClass(characterClass) + ' que busca ' || 'Alguém que busca '
          } ${characterMotivation[index]}`}
        </S.Text>
        <div>
          {getCharacterDescription(character).map((attribute, index) => (
            <S.ListItem
              key={index}
              isPositive={attribute.value === 3}
              isNegative={attribute.value === -3}>
              {attribute.description}
            </S.ListItem>
          ))}
        </div>
        <S.Text>{`💰 Carrega ${character.gold_pieces} moedas de ouro`}</S.Text>
        <S.Text>{`👤 Já trabalhou como ${character.occupation}`}</S.Text>
      </S.CharacterCard>
    ))
  }

  function renderClassOptions() {
    return (
      <S.ClassOptionsWrapper>
        {classOptions.map((option, index) => (
          <S.ClassOption
            key={index}
            isSelected={option.value === characterClass}
            onClick={() => setCharacterClass(option.value)}>
            {option.emoji} {option.description}
          </S.ClassOption>
        ))}
      </S.ClassOptionsWrapper>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsSubmitting(true)

    if (_.isNil(characterName)) {
      return alert('Adicione um nome')
    }

    if (_.isNil(characterClass)) {
      return alert('Selecione uma classe')
    }

    if (_.isNil(selectedCharacter)) {
      return alert('Selecione um arquétipo')
    }

    const hp = getHitPointsByClass(characterClass)

    const data = {
      ...selectedCharacter,
      name: characterName,
      class: characterClass,
      motivation: characterMotivation[selectedCharacter.id],
      total_hp: hp,
      current_hp: hp,
      player_id
    }

    api({ method: 'POST', url: '/characters', data }).then(() => {
      setIsSubmitting(false)
      navigate('/dashboard', { state: { response: { id: player_id } } })
    })
  }

  if (isSubmitting) {
    return <Loading>Criando personagem...</Loading>
  }

  return (
    <S.Container>
      <S.Text>Escolha um nome:</S.Text>
      <S.Input
        placeholder="Ex: Cleverson Canelafina"
        value={characterName}
        onChange={({ target }) => setCharacterName(target.value)}
        required
      />
      <S.Text>Escolha uma classe:</S.Text>
      {renderClassOptions()}
      <S.Text>Selecione um arquétipo, entre os três:</S.Text>
      {renderCharacterOptions()}
      <S.Button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        disabled={isSubmitting}>
        Criar personagem
      </S.Button>
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

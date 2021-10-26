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
  api
} from '../../utils'

import * as S from './styles'

const random = new RandomOrg({
  apiKey: process.env.REACT_APP_RANDOM_ORG_API_KEY
})

const classOptions = [
  { value: 'cleric', description: 'Clérigo(a)' },
  { value: 'fighter', description: 'Guerreiro(a)' },
  { value: 'magic-user', description: 'Mago(a)' },
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
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const navigate = useNavigate()

  const { player_id } = _.defaultTo(_.get(location, 'state'), {})

  useEffect(() => {
    if (_.isNil(player_id)) {
      navigate('/')
    }
  }, [player_id, navigate])

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

  useEffect(() => {
    if (!_.isEmpty(characterOptions)) {
      setShowLoadingScreen(false)
    }
  }, [characterOptions])

  if (showLoadingScreen) {
    return <Loading>Gerando opções de personagens...</Loading>
  }

  function renderCharacterOptions() {
    return characterOptions.map((character, index) => (
      <S.CharacterCard
        onClick={() => setSelectedCharacter(character)}
        key={index}>
        {getCharacterDescription(character).map((description, index) => (
          <S.ListItem key={index}>{description};</S.ListItem>
        ))}
        <S.ListItem>{`Carrega ${character.gold_pieces} moedas de ouro`}</S.ListItem>
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

  return <S.Container>{renderCharacterOptions()}</S.Container>
}

CreateCharacter.propTypes = {
  location: PropTypes.shape({
    state: {
      player_id: PropTypes.number
    }
  }).isRequired
}

export default CreateCharacter

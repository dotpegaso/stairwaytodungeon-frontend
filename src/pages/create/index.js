import { useEffect, useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'

import { useUser } from '../../context/userContext'
import { random } from '../_app'

import { Prompt } from '../../components'

import {
  pointsToAttributes,
  getGoldPieces,
  getOccupation,
  getHitPointsByClass,
  getCharacterDescription,
  parseClass,
  api
} from '../../utils'

const classOptions = [
  { value: 'cleric' },
  { value: 'fighter' },
  { value: 'magic-user' },
  { value: 'thief' },
  { value: 'dwarf' },
  { value: 'elf' },
  { value: 'halfling' }
]

const Create = () => {
  const { discordId } = useUser()
  const router = useRouter()

  const [characterOptions, setCharacterOptions] = useState([])
  const [attributes, setAttributes] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState(
    'Gerando 3 personagens...'
  )
  const [characterName, setCharacterName] = useState()
  const [characterClass, setCharacterClass] = useState()
  const [selectedCharacter, setSelectedCharacter] = useState({})

  useEffect(() => {
    if (!_.isEmpty(characterOptions)) {
      setIsLoading(false)
    }
  }, [characterOptions])

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
    }
  }, [characterOptions])

  useEffect(() => {
    if (_.isNil(attributes) || !_.isEmpty(characterOptions)) {
      return null
    }

    function initCharacter() {
      const [firstCharacter, secondCharacter, thirdCharacter] = _.chunk(
        attributes,
        6
      ).map((character, index) => ({
        ...pointsToAttributes(character),
        occupation: getOccupation(),
        gold_pieces: getGoldPieces(),
        armor_class: 9,
        id: index + 1
      }))

      setCharacterOptions([firstCharacter, secondCharacter, thirdCharacter])
    }

    initCharacter()
  }, [attributes, characterOptions])

  if (isLoading) {
    return <Prompt>{loadingMessage}</Prompt>
  }

  function renderCharacterOptions() {
    return characterOptions.map((character, index) => (
      <div
        onClick={() => setSelectedCharacter({ character, index: character.id })}
        isSelected={selectedCharacter.index === character.id}
        key={index}>
        <div>
          {getCharacterDescription(character).map((attribute, index) => (
            <div
              key={index}
              isPositive={attribute.value === 3}
              isNegative={attribute.value === -3}>
              {attribute.description}
            </div>
          ))}
        </div>
        <p>{`💰 Carrega ${character.gold_pieces} moedas de ouro`}</p>
        <p>{`👤 Já trabalhou como ${character.occupation}`}</p>
      </div>
    ))
  }

  function renderClassOptions() {
    return (
      <>
        {classOptions.map((option, index) => (
          <div
            key={index}
            isSelected={option.value === characterClass}
            onClick={() => setCharacterClass(option.value)}>
            {parseClass(option.value)}
          </div>
        ))}
      </>
    )
  }

  function handleSubmit({ preventDefault, stopPropagation }) {
    preventDefault()
    stopPropagation()

    if (_.isNil(characterName)) {
      return alert('Adicione um nome')
    }

    if (_.isNil(characterClass)) {
      return alert('Selecione uma classe')
    }

    if (_.isNil(selectedCharacter.character)) {
      return alert('Selecione um arquétipo')
    }

    setLoadingMessage('Criando personagem...')
    setIsLoading(true)

    const hp = getHitPointsByClass(characterClass)

    const data = {
      ...selectedCharacter.character,
      name: characterName,
      class: characterClass,
      total_hp: hp,
      current_hp: hp,
      discord_id: discordId
    }

    api({ method: 'POST', url: '/characters', data }).then(() => {
      setIsLoading(false)
      router.push('/')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Escolha um nome:</p>
      <input
        placeholder="Ex: Cleverson Canelafina"
        value={characterName}
        onChange={({ target }) => setCharacterName(target.value)}
        required
      />
      <p>Escolha uma classe:</p>
      {renderClassOptions()}
      <p>Selecione um arquétipo, entre os três:</p>
      {renderCharacterOptions()}
      <button type="submit" disabled={isLoading}>
        Criar personagem
      </button>
    </form>
  )
}

export default Create

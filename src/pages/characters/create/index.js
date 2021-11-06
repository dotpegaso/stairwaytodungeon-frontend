import { useEffect, useState } from 'react'
import RandomOrg from 'random-org'
import _ from 'lodash'
import { useRouter } from 'next/router'

import { useUser } from '../../../context/userContext'
import { Loading, ListItem, Container } from '../../../components'

import {
  pointsToAttributes,
  getGoldPieces,
  getOccupation,
  getHitPointsByClass,
  getCharacterDescription,
  parseClass,
  api
} from '../../../utils'

const random = new RandomOrg({
  apiKey: String(process.env.NEXT_PUBLIC_RANDOM_ORG_API_KEY)
})

const classOptions = [
  { value: 'cleric' },
  { value: 'fighter' },
  { value: 'magic-user' },
  { value: 'thief' },
  { value: 'dwarf' },
  { value: 'elf' },
  { value: 'halfling' }
]

const CreateCharacter = () => {
  const [attributes, setAttributes] = useState()
  const [characterOptions, setCharacterOptions] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState()
  const [characterName, setCharacterName] = useState()
  const [characterClass, setCharacterClass] = useState()
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCharacterCard, setSelectedCharacterCard] = useState()

  const router = useRouter()
  const { discordId } = useUser()

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

  useEffect(() => {
    if (!_.isEmpty(characterOptions)) {
      setShowLoadingScreen(false)
    }
  }, [characterOptions])

  function handleCharacterSelection({ character, index }) {
    setSelectedCharacter(character)
    setSelectedCharacterCard(index)
  }

  function renderCharacterOptions() {
    return characterOptions.map((character, index) => (
      <div
        onClick={() =>
          handleCharacterSelection({ character, index: character.id })
        }
        isSelected={selectedCharacterCard === character.id}
        key={index}>
        <div>
          {getCharacterDescription(character).map((attribute, index) => (
            <ListItem
              key={index}
              isPositive={attribute.value === 3}
              isNegative={attribute.value === -3}>
              {attribute.description}
            </ListItem>
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

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    if (_.isNil(characterName)) {
      return alert('Adicione um nome')
    }

    if (_.isNil(characterClass)) {
      return alert('Selecione uma classe')
    }

    if (_.isNil(selectedCharacter)) {
      return alert('Selecione um arquétipo')
    }

    setIsSubmitting(true)

    const hp = getHitPointsByClass(characterClass)

    const data = {
      ...selectedCharacter,
      name: characterName,
      class: characterClass,
      total_hp: hp,
      current_hp: hp,
      discord_id: discordId
    }

    api({ method: 'POST', url: '/characters', data }).then(() => {
      setIsSubmitting(false)
      router.push('/welcome')
    })
  }

  if (isSubmitting) {
    return <Loading>Criando personagem...</Loading>
  }

  if (showLoadingScreen) {
    return <Loading>Gerando opções de personagens...</Loading>
  }

  return (
    <Container onSubmit={(e) => handleSubmit(e)}>
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
      <button type="submit" disabled={isSubmitting}>
        Criar personagem
      </button>
    </Container>
  )
}

export default CreateCharacter

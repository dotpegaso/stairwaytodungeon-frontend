import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { getHitPointsByClass, api } from '../utils'
import { classOptions } from '../utils/shared'

import { useUser } from './userContext'

const CreateCharacterContext = createContext()

const equipmentOptions = [
  {
    name: 'Lança',
    type: 'melee',
    damage: '1d10',
    attack_bonus: null,
    defense_bonus: null,
    attack_bonus_description: null,
    defense_bonus_description: null
  },
  {
    name: 'Espada Curta',
    type: 'melee',
    damage: '1d6',
    attack_bonus: null,
    defense_bonus: null,
    attack_bonus_description: null,
    defense_bonus_description: null
  },
  {
    name: 'Adaga',
    type: 'melee',
    damage: '1d4',
    attack_bonus: null,
    defense_bonus: null,
    attack_bonus_description: null,
    defense_bonus_description: null
  },
  {
    name: 'Cajado',
    type: 'melee',
    damage: '1d6',
    attack_bonus: null,
    defense_bonus: null,
    attack_bonus_description: null,
    defense_bonus_description: null
  },
  {
    name: 'Forcado',
    type: 'melee',
    damage: '1d6',
    attack_bonus: null,
    defense_bonus: null,
    attack_bonus_description: null,
    defense_bonus_description: null
  }
]

function getInitialEquipment(characterClass) {
  const weapon =
    equipmentOptions[Math.floor(Math.random() * equipmentOptions.length)]
  const shield = {
    name: 'Escudo',
    type: 'melee',
    damage: null,
    attack_bonus: null,
    defense_bonus: 1,
    attack_bonus_description: null,
    defense_bonus_description: null
  }

  const equip = [weapon]

  if (!['magic-user', 'thief'].includes(characterClass)) {
    equip.push(shield)
  }

  return equip
}

export function CreateCharacterProvider({ children }) {
  const { discordId } = useUser()
  const router = useRouter()

  const [characterName, setCharacterName] = useState()
  const [characterClass, setCharacterClass] = useState(classOptions[0].value)

  const [attributes, setAttributes] = useState()
  const [characterOptions, setCharacterOptions] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState({})

  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('Gerando arquétipos...')

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    setLoadingMessage('Criando personagem...')
    setIsLoading(true)

    const hp = getHitPointsByClass(characterClass)

    const data = {
      ...selectedCharacter.character,
      name: characterName,
      class: characterClass,
      total_hp: hp,
      current_hp: hp,
      discord_id: discordId,
      items: [
        {
          name: 'Kit de Aventura',
          quantity: 1
        },
        {
          name: 'Kit de Alimentação',
          quantity: 1
        }
      ],
      weapons: getInitialEquipment(characterClass),
      notes:
        '- Kit de Aventura: 1 mochila + 4 tochas + 1 corda 15m + 1 óleo + 1 lanterna + 1 barraca de dormir \n - Kit de Alimentação: 4 cantis de vinho + 4 provisões'
    }

    api({ method: 'POST', url: '/characters', data }).then(() => {
      setIsLoading(false)
      router.push('/')
    })
  }

  const value = {
    characterName,
    characterClass,
    attributes,
    characterOptions,
    selectedCharacter,
    isLoading,
    loadingMessage,
    setCharacterName,
    setCharacterClass,
    setAttributes,
    setCharacterOptions,
    setSelectedCharacter,
    setIsLoading,
    setLoadingMessage,
    handleSubmit
  }

  return (
    <CreateCharacterContext.Provider value={value}>
      {children}
    </CreateCharacterContext.Provider>
  )
}

export function useCreateCharacter() {
  return useContext(CreateCharacterContext)
}

import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import { getHitPointsByClass, api } from '../utils'
import { classOptions } from '../utils/shared'

import { useUser } from './userContext'

const CreateCharacterContext = createContext()

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
      discord_id: discordId
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

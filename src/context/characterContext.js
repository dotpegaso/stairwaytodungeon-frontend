import { createContext, useContext, useState } from 'react'

const CharacterContext = createContext()

export function CharacterProvider({ children }) {
  const [characterDetails, setCharacterDetails] = useState()
  const [characterList, setCharacterList] = useState([])
  const [isLoadingCharacterList, setIsLoadingCharacterList] = useState(true)

  const value = {
    characterDetails,
    setCharacterDetails,
    characterList,
    setCharacterList,
    isLoadingCharacterList,
    setIsLoadingCharacterList
  }

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  return useContext(CharacterContext)
}

import { createContext, useContext, useState } from 'react'

const CharacterContext = createContext()

export function CharacterProvider({ children }) {
  const [characterDetails, setCharacterDetails] = useState({})

  const value = {
    characterDetails,
    setCharacterDetails
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

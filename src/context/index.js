import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppWrapper({ children }) {
  const [discordId, setDiscordId] = useState(null)
  const [avatarHash, setAvatarHash] = useState(null)

  return (
    <AppContext.Provider
      value={{
        discordId,
        setDiscordId,
        avatarHash,
        setAvatarHash
      }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

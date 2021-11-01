import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [discordId, setDiscordId] = useState(null)
  const [avatarHash, setAvatarHash] = useState(null)

  const value = {
    discordId,
    setDiscordId,
    avatarHash,
    setAvatarHash
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}

import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [discordId, setDiscordId] = useState(null)
  const [avatarHash, setAvatarHash] = useState(null)

  useEffect(() => {
    const discordId = localStorage.getItem('discord_id')
    const avatarHash = localStorage.getItem('avatar_hash')

    if (discordId) {
      setDiscordId(discordId)
    }

    if (avatarHash) {
      setAvatarHash(avatarHash)
    }
  }, [])

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

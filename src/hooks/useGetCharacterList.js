import { useEffect } from 'react'
import { api } from '../utils'

import { useCharacter } from '../context/characterContext'
import { useUser } from '../context/userContext'

const useGetCharacterList = () => {
  const { discordId } = useUser()
  const { setCharacterList, setIsLoadingCharacterList } = useCharacter()

  useEffect(() => {
    api({ method: 'GET', url: `characters?discord_id=${discordId}` }).then(
      (response) => {
        setCharacterList(response)
        setIsLoadingCharacterList(false)
      }
    )
  }, [discordId, setCharacterList, setIsLoadingCharacterList])
}

export default useGetCharacterList

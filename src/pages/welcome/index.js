import _ from 'lodash'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContext'

import { Loading, Container, Menu, CharacterPool } from '../../components'
import { api } from '../../utils'

const Dashboard = () => {
  const [characterList, setCharacterList] = useState([])
  const [loadingCharacterList, setLoadingCharacterList] = useState(true)
  const { discordId } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (_.isNil(discordId)) {
      router.push('/')
    }
  }, [discordId, router])

  useEffect(() => {
    api({ method: 'GET', url: `characters?discord_id=${discordId}` }).then(
      (response) => {
        setCharacterList(response)
        setLoadingCharacterList(false)
      }
    )
  }, [discordId, router])

  function renderCharacterPool() {
    if (_.isEmpty(characterList) && loadingCharacterList) {
      return <Loading isInline>Carregando lista de personagens...</Loading>
    }

    return <CharacterPool characters={characterList} />
  }

  const menuOptions = {
    options: [
      {
        path: '/characters/create',
        description: 'Criar personagem',
        isActive: true
      }
    ]
  }

  return (
    <Container>
      {renderCharacterPool()}
      <Menu {...menuOptions} />
    </Container>
  )
}

export default Dashboard

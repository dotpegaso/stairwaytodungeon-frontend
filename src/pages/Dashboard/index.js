import _ from 'lodash'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAppContext } from '../../context'
import Link from 'next/link'

import { Loading, Container } from '../../components'
import { api, getLevelByExperienceCrystals, parseClass } from '../../utils'

const Dashboard = () => {
  const [characterList, setCharacterList] = useState([])
  const [loadingCharacterList, setLoadingCharacterList] = useState(true)
  const { discordId } = useAppContext()

  const router = useRouter()

  useEffect(() => {
    if (_.isNil(discordId)) {
      router.push('/')
    }

    api({ method: 'GET', url: `characters?discord_id=${discordId}` }).then(
      (response) => {
        setCharacterList(response)
        setLoadingCharacterList(false)
      }
    )
  }, [discordId, router])

  function renderCharactesList() {
    if (_.isEmpty(characterList) && loadingCharacterList) {
      return <Loading isInline>Carregando lista de personagens...</Loading>
    }

    if (
      (_.isEmpty(characterList) && !loadingCharacterList) ||
      (!_.size(characterList.filter((pc) => pc.isAlive)) &&
        !loadingCharacterList)
    ) {
      return (
        <Link href="/characters/create">
          <a>Criar personagem</a>
        </Link>
      )
    }

    return characterList
      .filter((pc) => pc.isAlive)
      .map((character) => (
        <div key={character.id} href={`/characters/${character.id}`}>
          <a>
            <p>{character.name}</p>
            <p>{`${parseClass(
              character.class
            )} de nível ${getLevelByExperienceCrystals(
              character.experience_crystals
            )}`}</p>
          </a>
        </div>
      ))
  }

  return (
    <Container>
      {renderCharactesList()}
      <Link href="/characters/create">
        <a>Criar personagem</a>
      </Link>{' '}
    </Container>
  )
}

export default Dashboard

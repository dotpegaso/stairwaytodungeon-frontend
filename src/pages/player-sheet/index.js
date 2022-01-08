import { useEffect } from 'react'
import Link from 'next/link'
import _ from 'lodash'

import { useGetCharacterList } from '../../hooks'
import { useCharacter } from '../../context/characterContext'

import { Prompt, CharacterDetails } from '../../components'

const PlayerSheet = () => {
  useGetCharacterList()

  const {
    isLoadingCharacterList,
    characterList,
    setCharacterDetails
  } = useCharacter()

  const characterToLoad = characterList.find((character) => character.isAlive)

  useEffect(() => {
    setCharacterDetails(characterToLoad)
  }, [characterToLoad, setCharacterDetails])

  if (isLoadingCharacterList) {
    return <Prompt>Carregando personagens...</Prompt>
  }

  const isCharacterMissing = _.isNil(characterToLoad)

  if (isCharacterMissing) {
    const isCharacterListEmpty = _.isEmpty(characterList)

    return (
      <Prompt>
        {isCharacterListEmpty
          ? 'Nenhum personagem encontrado'
          : 'Todos morreram'}
        <br />
        <Link href="/create">
          <a>Criar personagem</a>
        </Link>
      </Prompt>
    )
  }

  return <CharacterDetails />
}

export default PlayerSheet

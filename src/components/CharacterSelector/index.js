import Select from 'react-select'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { socket } from '../../pages/_app'

import { useCharacter } from '../../context/characterContext'

import { useGetCharacterList } from '../../hooks'

import * as S from './styles'

function emitConnectedCharacter(character_id) {
  socket.emit('connectedCharacter', { character_id })
}

function handleSetCharacterDetails({
  characterList,
  character_id,
  setCharacterDetails
}) {
  const selectedCharacter = characterList.find(
    (character) => Number(character.id) === Number(character_id)
  )

  return setCharacterDetails(selectedCharacter)
}

const CharacterSelector = () => {
  useGetCharacterList()

  const router = useRouter()
  const { character_id } = router.query

  const { characterList, setCharacterDetails } = useCharacter()

  useEffect(() => {
    if (Number(character_id) !== 0) {
      handleSetCharacterDetails({
        characterList,
        character_id,
        setCharacterDetails
      })
    }
  }, [characterList, character_id, setCharacterDetails])

  useEffect(() => {
    emitConnectedCharacter(character_id)
  }, [character_id])

  const options = characterList.map((character) => ({
    value: character.id,
    label: `${
      character.isAlive ? `🌱 ${character.name}` : `💀 ${character.name}`
    }`,
    isDisabled: !character.isAlive
  }))

  const handleChange = ({ value: character_id }) => {
    handleSetCharacterDetails({
      characterList,
      character_id,
      setCharacterDetails
    })

    emitConnectedCharacter(character_id)

    router.push(`/characters/${character_id}`)
  }

  return (
    <S.Container>
      <Select
        options={options}
        onChange={handleChange}
        value={options.find(
          (option) => Number(option.value) === Number(character_id)
        )}
      />
      <Link href="/characters/create">
        <S.Anchor>Criar personagem</S.Anchor>
      </Link>
    </S.Container>
  )
}

export default CharacterSelector

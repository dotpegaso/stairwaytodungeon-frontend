import * as S from './styles'
import _ from 'lodash'
import Link from 'next/link'

import { useCharacter } from '../../context/characterContext'

import CharacterName from '../CharacterName'

const CharacterPool = () => {
  const { characterList } = useCharacter()

  const aliveCharacters = _.defaultTo(characterList, []).filter((character) =>
    _.get(character, 'isAlive')
  )

  return (
    <S.Container>
      {aliveCharacters.map((character, index) => (
        <Link key={index} href="/characters/0">
          <S.CharacterCard>
            <CharacterName>{character.name}</CharacterName>
          </S.CharacterCard>
        </Link>
      ))}
    </S.Container>
  )
}

export default CharacterPool

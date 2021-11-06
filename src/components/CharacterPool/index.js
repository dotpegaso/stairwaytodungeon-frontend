import * as S from './styles'
import _ from 'lodash'
import Link from 'next/link'

import CharacterName from '../CharacterName'

const CharacterPool = ({ characters }) => {
  const aliveCharacters = _.defaultTo(characters, []).filter((character) =>
    _.get(character, 'isAlive')
  )

  return (
    <S.Container>
      {aliveCharacters.map((character, index) => (
        <Link key={index} href={`/characters/${character.id}?option=character`}>
          <S.CharacterCard>
            <CharacterName>{character.name}</CharacterName>
          </S.CharacterCard>
        </Link>
      ))}
    </S.Container>
  )
}

export default CharacterPool

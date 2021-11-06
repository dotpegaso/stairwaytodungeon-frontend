import * as S from './styles'
import Link from 'next/link'

import CharacterName from '../CharacterName'

const CharacterPool = ({ characters }) => (
  <S.Container>
    {characters.map((character, index) => (
      <Link key={index} href={`/characters/${character.id}?option=character`}>
        <S.CharacterCard>
          <CharacterName>{character.name}</CharacterName>
        </S.CharacterCard>
      </Link>
    ))}
  </S.Container>
)

export default CharacterPool

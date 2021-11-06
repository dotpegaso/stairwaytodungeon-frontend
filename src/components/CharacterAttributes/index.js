import _ from 'lodash'
import React from 'react'
import { useCharacter } from '../../context/characterContext'

import { getCharacterDescription } from '../../utils'

import * as S from './styles'

const CharacterAttributes = () => {
  const { characterDetails } = useCharacter()

  return (
    <S.Container>
      {getCharacterDescription(characterDetails || []).map((item, index) => (
        <S.Attribute
          key={index}
          isPositive={_.get(item, 'value') === 3}
          isNegative={_.get(item, 'value') === -3}>
          {_.get(item, 'description')}
        </S.Attribute>
      ))}
    </S.Container>
  )
}

export default CharacterAttributes

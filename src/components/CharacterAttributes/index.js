import _ from 'lodash'
import React from 'react'
import { useCharacter } from '../../context/characterContext'

import { getCharacterDescription, parseAttributes } from '../../utils'

import * as S from './styles'

const CharacterAttributes = () => {
  const { characterDetails } = useCharacter()

  return (
    <S.Container>
      {getCharacterDescription(characterDetails || []).map((item, index) => (
        <S.Attribute
          pseudotext={parseAttributes(item.attribute)}
          key={index}
          positive={_.get(item, 'value') === 3}
          negative={_.get(item, 'value') === -3}>
          {_.get(item, 'description')}
        </S.Attribute>
      ))}
    </S.Container>
  )
}

export default CharacterAttributes

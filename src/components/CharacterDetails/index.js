import React from 'react'

import { useCharacter } from '../../context/characterContext'

import CharacterName from '../CharacterName'
import CharacterExtras from '../CharacterExtras'
import CharacterAttributes from '../CharacterAttributes'

import * as S from './styles'
import _ from 'lodash'

const CharacterDetails = () => {
  const { characterDetails } = useCharacter()

  return (
    <>
      <S.Header>
        <div>
          <CharacterName>{_.get(characterDetails, 'name')}</CharacterName>
          <S.Occupation>{`Ex ${_.get(
            characterDetails,
            'occupation'
          )}`}</S.Occupation>
        </div>
        <CharacterExtras />
      </S.Header>
      <CharacterAttributes />
    </>
  )
}

export default CharacterDetails

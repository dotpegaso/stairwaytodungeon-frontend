import React from 'react'

import { useCharacter } from '../../context/characterContext'

import CharacterName from '../CharacterName'
import CharacterInfo from '../CharacterInfo'
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
        <CharacterInfo />
      </S.Header>
      <CharacterAttributes />
    </>
  )
}

export default CharacterDetails

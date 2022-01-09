import React from 'react'
import _ from 'lodash'

import { useCharacter } from '../../context/characterContext'
import { getLevelByExperienceCrystals, parseClass } from '../../utils'

import * as S from './styles'

const CharacterInfo = () => {
  const { characterDetails } = useCharacter()
  const experienceCrystals = _.get(characterDetails, 'experience_crystals')

  return (
    <S.Container>
      <p>{`👤 Ex ${_.get(characterDetails, 'occupation')}`}</p>
      <p>{`${parseClass(
        _.get(characterDetails, 'class')
      )} de nível ${getLevelByExperienceCrystals(experienceCrystals)}`}</p>
      <p>{`💠 ${experienceCrystals} Cristais de XP`}</p>
      <p>{`💰 ${_.get(characterDetails, 'gold_pieces')} de ouro`}</p>
    </S.Container>
  )
}

export default CharacterInfo

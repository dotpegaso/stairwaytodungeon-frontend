import * as S from './styles'
import _ from 'lodash'

import { getClericalSlots } from '../../utils'

const ClericalSpells = ({ list, characterLevel }) => {
  const slots = getClericalSlots(characterLevel)

  const spellsMaxLevel = _.keys(slots)
    .filter((key) => slots[key] > 0)
    .map((item) => Number(item))
    .reduce((a, b) => (a > b ? a : b))

  const parsedList = list.filter((spell) => spell.level <= spellsMaxLevel)

  return (
    <S.Grid>
      {parsedList.map((spell, index) => (
        <S.Container key={index} isReverse={spell.reverse}>
          <S.Name>
            <S.Level>{spell.level}</S.Level>
            <div>
              <b>{spell.name}</b> ({spell.range})
            </div>
          </S.Name>
          <br />
          <S.Name>{spell.effect}</S.Name>
        </S.Container>
      ))}
    </S.Grid>
  )
}

export default ClericalSpells

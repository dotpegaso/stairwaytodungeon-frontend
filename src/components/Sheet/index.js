import _ from 'lodash'

import CharacterAttributes from '../CharacterAttributes'
import CharacterInfo from '../CharacterInfo'
import DicePool from '../DicePool'
import DayPeriodBadge from '../DayPeriodBadge'

import { useCharacter } from '../../context/characterContext'

import { useGetCombatBonus } from '../../hooks'

import * as S from './styles'

const Sheet = () => {
  const { characterDetails } = useCharacter()
  const { totalMeleeDescription, totalRangedDescription } = useGetCombatBonus()

  const weapons = _.defaultTo(_.get(characterDetails, 'weapons'), [])
  const grimoire = _.defaultTo(_.get(characterDetails, 'grimoire'), [])
  const items = _.defaultTo(_.get(characterDetails, 'items'), [])

  const remainingHitPoints =
    (100 * _.get(characterDetails, 'current_hp')) /
    _.get(characterDetails, 'total_hp')

  return (
    <S.Container opacity={remainingHitPoints}>
      <S.Flex>
        <S.Flex primary column>
          <S.Name>
            <DayPeriodBadge /> {_.get(characterDetails, 'name')}
          </S.Name>

          <CharacterInfo />

          <S.BigText>ATRIBUTOS</S.BigText>
          <CharacterAttributes />

          <S.BigText>COMBATE</S.BigText>

          <S.FlexContainer>
            {!_.isNil(totalMeleeDescription) && (
              <S.Badge>{totalMeleeDescription}</S.Badge>
            )}
            {!_.isNil(totalRangedDescription) && (
              <S.Badge>{totalRangedDescription}</S.Badge>
            )}
          </S.FlexContainer>

          <S.FlexContainer>
            <DicePool />
          </S.FlexContainer>

          {!_.isEmpty(weapons) && (
            <>
              <S.BigText>EQUIPAMENTOS</S.BigText>

              <S.FlexContainer>
                {weapons.map((weapon, index) => (
                  <S.Box key={index}>
                    <p>{`Nome: ${weapon.name}`}</p>
                    {!_.isNil(weapon.damage) && (
                      <p>{`Dano: ${weapon.damage} ${
                        weapon.attack_bonus ? `+ ${weapon.attack_bonus}` : ''
                      }`}</p>
                    )}
                    {!_.isNil(weapon.defense_bonus) && (
                      <p>{`Defesa: +${weapon.defense_bonus}`}</p>
                    )}
                  </S.Box>
                ))}
              </S.FlexContainer>
            </>
          )}

          {!_.isEmpty(grimoire) && (
            <>
              <S.BigText>MAGIAS</S.BigText>

              <S.FlexContainer>
                {grimoire.map((magic, index) => (
                  <S.Box key={index}>
                    <p>{`Nome: ${magic.name}`}</p>
                  </S.Box>
                ))}
              </S.FlexContainer>
            </>
          )}

          {!_.isEmpty(items) && (
            <>
              <S.BigText>ITENS</S.BigText>

              <S.FlexContainer>
                {items.map((item, index) => (
                  <S.Box key={index}>
                    <p>{`Nome: ${item.name}`}</p>
                    <p>{`Quantidade: ${item.quantity}`}</p>
                  </S.Box>
                ))}
              </S.FlexContainer>
            </>
          )}
        </S.Flex>
      </S.Flex>
    </S.Container>
  )
}

export default Sheet
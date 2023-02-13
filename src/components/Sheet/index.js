import { useState } from 'react'
import _ from 'lodash'

import CharacterAttributes from '../CharacterAttributes'
import CharacterInfo from '../CharacterInfo'
import DicePool from '../DicePool'
import DayPeriodBadge from '../DayPeriodBadge'
import Notes from '../Notes'
import ClericalSpells from '../ClericalSpells'

import { useCharacter } from '../../context/characterContext'

import { useGetCombatBonus } from '../../hooks'

import {
  getThaco,
  getArmorClass,
  getClericalSpells,
  getLevelByExperienceCrystals,
  getHitPointsByClass
} from '../../utils'

import * as S from './styles'

const Sheet = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const { characterDetails } = useCharacter()
  const { totalMeleeDescription, totalRangedDescription } = useGetCombatBonus()

  const weapons = _.defaultTo(_.get(characterDetails, 'weapons'), [])
  const grimoire = _.defaultTo(_.get(characterDetails, 'grimoire'), [])
  const items = _.defaultTo(_.get(characterDetails, 'items'), [])
  const crystals = _.defaultTo(
    _.get(characterDetails, 'experience_crystals'),
    0
  )
  const characterClass = _.get(characterDetails, 'class')
  const level = getLevelByExperienceCrystals(crystals)
  const totalHp = getHitPointsByClass(characterClass) * level

  const [currentHp, setCurrentHp] = useState(
    localStorage.getItem('current_hp') || totalHp
  )

  const spellList = characterClass === 'cleric' ? getClericalSpells() : []

  const remainingHitPoints =
    (100 * _.get(characterDetails, 'current_hp')) /
    _.get(characterDetails, 'total_hp')

  const modalSheetProps = {
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    children: <ClericalSpells list={spellList} characterLevel={level} />
  }

  function handleHpChange(action) {
    if (action === 'add' && currentHp + 1 <= totalHp) {
      setCurrentHp(currentHp + 1)
      localStorage.setItem('current_hp', currentHp + 1)
    }

    if (action === 'remove') {
      setCurrentHp(currentHp - 1)
      localStorage.setItem('current_hp', currentHp - 1)
    }

    if (action === 'reset') {
      setCurrentHp(totalHp)
      localStorage.setItem('current_hp', totalHp)
    }

    return null
  }

  return (
    <S.Container opacity={remainingHitPoints}>
      <S.Flex column>
        <S.Name>
          <DayPeriodBadge /> {_.get(characterDetails, 'name')}
        </S.Name>

        <CharacterInfo />

        <S.BigText>ATRIBUTOS</S.BigText>
        <CharacterAttributes />

        <S.BigText>COMBATE</S.BigText>

        <S.FlexContainer wrap>
          <S.Badge onClick={() => handleHpChange('remove')} fixHalfWidth>
            -
          </S.Badge>
          <S.Badge onClick={() => handleHpChange('reset')} fixWidth>{`🫀 HP ${
            currentHp || totalHp
          }`}</S.Badge>
          <S.Badge
            onClick={() => handleHpChange('add')}
            disabled={currentHp === totalHp}
            fixHalfWidth>
            +
          </S.Badge>
          <S.Badge>{`🏏 THAC0 ${getThaco({ characterClass, level })}`}</S.Badge>
          <S.Badge>
            {`🛡 ${getArmorClass({ characterDetails, weapons })} de armadura`}
          </S.Badge>
        </S.FlexContainer>

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
            <S.BigText>
              EQUIPAMENTOS
              <S.Button type="button" disabled>
                Bazar
              </S.Button>
            </S.BigText>

            <S.FlexContainer>
              {weapons.map((weapon, index) => (
                <S.Box key={index}>
                  <p>{`${weapon.name}`}</p>
                  {!_.isNil(weapon.damage) && (
                    <p>{`Dano: ${weapon.damage} ${
                      weapon.attack_bonus ? `+ ${weapon.attack_bonus}` : ''
                    }`}</p>
                  )}
                </S.Box>
              ))}
            </S.FlexContainer>
          </>
        )}

        {!_.isEmpty(grimoire) && (
          <>
            <S.BigText>
              {characterClass === 'cleric' ? 'MAGIAS ' : 'GRIMÓRIO '}
              <S.Button
                type="button"
                onClick={() => setIsBottomSheetOpen(true)}>
                Lista de magias
              </S.Button>
            </S.BigText>

            <S.FlexContainer>
              {grimoire.map((magic, index) => (
                <S.Box key={index}>
                  <p>{magic.name}</p>
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

        <S.BigText>ANOTAÇÕES</S.BigText>
        <Notes />
      </S.Flex>
    </S.Container>
  )
}

export default Sheet

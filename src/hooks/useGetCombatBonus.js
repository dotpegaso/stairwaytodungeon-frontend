import _ from 'lodash'

import { useCharacter } from '../context/characterContext'

import getAttributeModifier from '../utils/getAttributeModifier'

function sumWeaponBonuses({ weapons, type }) {
  return _.sumBy(
    weapons
      .filter((weapon) => weapon.type === type)
      .filter((weapon) => weapon.attack_bonus),
    'attack_bonus'
  )
}

export default function useGetCombatBonus() {
  const { characterDetails } = useCharacter()

  const weapons = _.defaultTo(_.get(characterDetails, 'weapons'), [])
  const strength = _.get(characterDetails, 'strength')
  const dexterity = _.get(characterDetails, 'dexterity')

  const strengthModifier = getAttributeModifier(strength)
  const dexterityModifier = getAttributeModifier(dexterity)

  const totalMeleeDamage =
    strengthModifier + sumWeaponBonuses({ weapons, type: 'melee' })

  const totalRangedDamage =
    dexterityModifier + sumWeaponBonuses({ weapons, type: 'ranged' })

  const totalMeleeBonus =
    totalMeleeDamage > 0 ? `+${totalMeleeDamage}` : totalMeleeDamage

  const totalRangedBonus =
    totalRangedDamage > 0 ? `+${totalRangedDamage}` : totalRangedDamage

  const totalMeleeDescription =
    totalMeleeDamage !== 0
      ? `⚔️ Rolagem & dano corpo-a-corpo: ${totalMeleeBonus}`
      : null

  const totalRangedDescription =
    totalRangedDamage !== 0
      ? `🏹 Rolagem à distância: ${totalRangedBonus}`
      : null

  return {
    totalMeleeBonus,
    totalRangedBonus,
    totalMeleeDescription,
    totalRangedDescription
  }
}

import _ from 'lodash'

import getAttributeModifier from './getAttributeModifier'

function sumWeaponBonuses({ weapons, type }) {
  return _.sumBy(
    weapons
      .filter((weapon) => weapon.type === type)
      .filter((weapon) => weapon.attack_bonus),
    'attack_bonus'
  )
}

export default function getCombatBonus(characterDetails) {
  const weapons = _.defaultTo(_.get(characterDetails, 'weapons'), [])
  const strength = _.get(characterDetails, 'strength')
  const dexterity = _.get(characterDetails, 'dexterity')

  const strengthModifier = getAttributeModifier(strength)
  const dexterityModifier = getAttributeModifier(dexterity)

  const totalMeleeDamage =
    strengthModifier + sumWeaponBonuses({ weapons, type: 'melee' })

  const totalRangedDamage =
    dexterityModifier + sumWeaponBonuses({ weapons, type: 'ranged' })

  const response = `${
    totalMeleeDamage !== 0
      ? `⚔️ Rolagem & dano corpo-a-corpo: ${
          totalMeleeDamage > 0 ? `+${totalMeleeDamage}` : totalMeleeDamage
        }`
      : ''
  } ‎ ${
    totalRangedDamage !== 0
      ? `🏹 Rolagem à distância: ${
          totalRangedDamage > 0 ? `+${totalRangedDamage}` : totalRangedDamage
        }`
      : ''
  }`

  return response
}

import _ from 'lodash'
import getAttributeModifier from './getAttributeModifier'

export default function getArmorClass({
  baseArmorClass,
  weapons,
  characterDetails
}) {
  let finalArmorClass = baseArmorClass

  const hasBonusShield = weapons.some((weapon) =>
    _.get(weapon, 'defense_bonus')
  )

  if (hasBonusShield) {
    finalArmorClass -= weapons.find((weapon) => _.get(weapon, 'defense_bonus'))
      .defense_bonus
  }

  finalArmorClass -= getAttributeModifier(_.get(characterDetails, 'dexterity'))

  return finalArmorClass
}

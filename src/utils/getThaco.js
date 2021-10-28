export default function getThaco({ characterClass, level }) {
  function magicUser(level) {
    if (level <= 5) {
      return 19
    }
    if (level <= 10) {
      return 17
    }
    if (level <= 15) {
      return 15
    }
  }

  function CT(level) {
    if (level <= 4) {
      return 19
    }
    if (level <= 8) {
      return 17
    }
    if (level <= 12) {
      return 15
    }
  }

  function FDH(level) {
    if (level <= 3) {
      return 19
    }
    if (level <= 6) {
      return 17
    }
    if (level <= 9) {
      return 15
    }
    if (level <= 12) {
      return 13
    }
  }

  if (characterClass === 'magic-user') {
    return magicUser(level)
  }

  if (['cleric', 'thief'].includes(characterClass)) {
    return CT(level)
  }

  if (['fighter', 'dwarf', 'elf', 'halfling'].includes(characterClass)) {
    return FDH(level)
  }
}

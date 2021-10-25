export default function getHitPointsByClass(characterClass) {
  switch (characterClass) {
    case 'cleric':
      return 6
    case 'fighter':
      return 8
    case 'magic-user':
      return 4
    case 'thief':
      return 4
    case 'dwarf':
      return 8
    case 'elf':
      return 6
    case 'halfling':
      return 6
    default:
      return 0
  }
}

export default function parseClass(characterClass) {
  if (characterClass === 'cleric') {
    return 'Clérigo(a)'
  }
  if (characterClass === 'fighter') {
    return 'Guerreiro(a)'
  }
  if (characterClass === 'magic-user') {
    return 'Mago(a)'
  }
  if (characterClass === 'thief') {
    return 'Ladino(a)'
  }
  if (characterClass === 'dwarf') {
    return 'Anão/Anã'
  }
  if (characterClass === 'elf') {
    return 'Elfo(a)'
  }

  return 'Halfling'
}

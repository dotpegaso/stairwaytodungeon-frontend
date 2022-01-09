export default function parseAttributes(attribute) {
  if (attribute === 'strength') {
    return 'Força'
  }
  if (attribute === 'dexterity') {
    return 'Destreza'
  }
  if (attribute === 'constituition') {
    return 'Constituição'
  }
  if (attribute === 'intelligence') {
    return 'Inteligência'
  }
  if (attribute === 'wisdom') {
    return 'Sabedoria'
  }

  return 'Carisma'
}

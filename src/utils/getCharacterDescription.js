import getAttributeModifier from './getAttributeModifier'

export default function getCharacterDescription(character) {
  function filterModifiers() {
    const list = []
    const {
      strength,
      dexterity,
      constituition,
      intelligence,
      wisdom,
      charisma
    } = character

    if (getAttributeModifier(strength) !== 0) {
      list.push({
        attribute: 'strength',
        value: getAttributeModifier(strength)
      })
    }

    if (getAttributeModifier(constituition) !== 0) {
      list.push({
        attribute: 'constituition',
        value: getAttributeModifier(constituition)
      })
    }

    if (getAttributeModifier(dexterity) !== 0) {
      list.push({
        attribute: 'dexterity',
        value: getAttributeModifier(dexterity)
      })
    }

    if (getAttributeModifier(intelligence) !== 0) {
      list.push({
        attribute: 'intelligence',
        value: getAttributeModifier(intelligence)
      })
    }

    if (getAttributeModifier(wisdom) !== 0) {
      list.push({ attribute: 'wisdom', value: getAttributeModifier(wisdom) })
    }

    if (getAttributeModifier(charisma) !== 0) {
      list.push({
        attribute: 'charisma',
        value: getAttributeModifier(charisma)
      })
    }

    return list
  }

  function parseAttribute({ attribute, value }) {
    if (attribute === 'strength') {
      if (value === -3) {
        return 'Praticamente não tem força física'
      }

      if (value < 0) {
        return 'Possui baixa força física'
      }

      if (value === 3) {
        return 'Possui uma força física absurda'
      }

      return 'Possui uma boa força física'
    }

    if (attribute === 'intelligence') {
      if (value === -3) {
        return 'Mal sabe falar'
      }

      if (value < 0) {
        return 'Não sabe ler, nem escrever'
      }

      if (value === 3) {
        return 'Consegue falar 4 línguas'
      }

      return `Consegue falar ${value + 1} línguas`
    }

    if (attribute === 'wisdom') {
      if (value === -3) {
        return 'Completamente ignorante sobre o mundo'
      }

      if (value < 0) {
        return 'Tem um baixo conhecimento geral'
      }

      if (value === 3) {
        return 'Conhece muito bem o mundo'
      }

      return 'Conhece bem o mundo'
    }

    if (attribute === 'dexterity') {
      if (value === -3) {
        return 'Mal consegue mirar e se desviar'
      }

      if (value < 0) {
        return 'Tem dificuldade pra mirar e desviar'
      }

      if (value === 3) {
        return 'Mira e se esquiva de olhos fechados'
      }

      return 'Tem uma boa mira e um bom reflexo'
    }

    if (attribute === 'constituition') {
      if (value === -3) {
        return 'Está constantemente doente'
      }

      if (value < 0) {
        return 'Tem uma saúde meio ruim'
      }

      if (value === 3) {
        return 'Tem uma saúde incrível!'
      }

      return 'Tem uma saúde boa'
    }

    if (attribute === 'charisma') {
      if (value === -3) {
        return 'Péssima lábia'
      }

      if (value < 0) {
        return 'Meio ruim na lábia'
      }

      if (value === 3) {
        return 'Engana qualquer um'
      }

      return 'É bom de lábia'
    }
  }

  const filteredModifiers = filterModifiers()

  return filteredModifiers.map((attribute) => parseAttribute(attribute))
}

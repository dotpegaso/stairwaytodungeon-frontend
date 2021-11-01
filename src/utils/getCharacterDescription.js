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
        return {
          value,
          description: 'Praticamente não tem força física'
        }
      }

      if (value < 0) {
        return {
          value,
          description: 'Possui baixa força física'
        }
      }

      if (value === 3) {
        return {
          value,
          description: 'Possui uma força física absurda'
        }
      }

      return {
        value,
        description: 'Possui uma boa força física'
      }
    }

    if (attribute === 'intelligence') {
      if (value === -3) {
        return {
          value,
          description: 'Mal sabe falar'
        }
      }

      if (value < 0) {
        return {
          value,
          description: 'Não sabe ler, nem escrever'
        }
      }

      if (value === 3) {
        return {
          value,
          description: 'Consegue falar 4 línguas'
        }
      }

      return {
        value,
        description: `Consegue falar ${value + 1} línguas`
      }
    }

    if (attribute === 'wisdom') {
      if (value === -3) {
        return {
          value,
          description: 'Super ignorante sobre o mundo'
        }
      }

      if (value < 0) {
        return {
          value,
          description: 'Tem um baixo conhecimento geral'
        }
      }

      if (value === 3) {
        return {
          value,
          description: 'Conhece muito bem o mundo'
        }
      }

      return {
        value,
        description: 'Conhece bem o mundo'
      }
    }

    if (attribute === 'dexterity') {
      if (value === -3) {
        return {
          value,
          description: 'Mal consegue mirar e se desviar'
        }
      }

      if (value < 0) {
        return {
          value,
          description: 'Tem dificuldade pra mirar e desviar'
        }
      }

      if (value === 3) {
        return {
          value,
          description: 'Mira e se esquiva de olhos fechados'
        }
      }

      return {
        value,
        description: 'Tem uma boa mira e um bom reflexo'
      }
    }

    if (attribute === 'constituition') {
      if (value === -3) {
        return {
          value,
          description: 'Está constantemente doente'
        }
      }

      if (value < 0) {
        return {
          value,
          description: 'Tem uma saúde meio ruim'
        }
      }

      if (value === 3) {
        return {
          value,
          description: 'Tem uma saúde incrível!'
        }
      }

      return {
        value,
        description: 'Tem uma saúde boa'
      }
    }

    if (attribute === 'charisma') {
      if (value === -3) {
        return {
          value,
          description: 'Tem uma péssima lábia'
        }
      }

      if (value < 0) {
        return {
          value,
          description: 'É um pouco ruim de lábia'
        }
      }

      if (value === 3) {
        return {
          value,
          description: 'Engana quase qualquer um'
        }
      }

      return {
        value,
        description: 'É bom de lábia'
      }
    }
  }

  const filteredModifiers = filterModifiers()

  return filteredModifiers.map((attribute) => parseAttribute(attribute))
}

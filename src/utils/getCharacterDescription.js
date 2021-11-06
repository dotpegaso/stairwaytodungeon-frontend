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

  function getIconByAttribute(attribute) {
    if (attribute === 'strength') {
      return '💪'
    }
    if (attribute === 'constituition') {
      return '🫀'
    }
    if (attribute === 'dexterity') {
      return '⚡️'
    }
    if (attribute === 'intelligence') {
      return ' 🧠 '
    }
    if (attribute === 'wisdom') {
      return '🌏'
    }
    if (attribute === 'charisma') {
      return '👄'
    }
  }

  function parseAttribute({ attribute, value }) {
    if (attribute === 'strength') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `Praticamente não tem força física ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `Possui baixa força física ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `Possui uma força física absurda ${getIconByAttribute(
            attribute
          )}`
        }
      }

      return {
        value,
        attribute,
        description: `Possui uma boa força física ${getIconByAttribute(
          attribute
        )}`
      }
    }

    if (attribute === 'intelligence') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `Mal sabe falar ${getIconByAttribute(attribute)}`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `Não sabe ler, nem escrever ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `Consegue falar 4 línguas ${getIconByAttribute(
            attribute
          )}`
        }
      }

      return {
        value,
        attribute,
        description: `Consegue falar ${value + 1} línguas ${getIconByAttribute(
          attribute
        )}`
      }
    }

    if (attribute === 'wisdom') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `Super ignorante sobre o mundo ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `Tem um baixo conhecimento geral ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `Conhece muito bem o mundo ${getIconByAttribute(
            attribute
          )}`
        }
      }

      return {
        value,
        attribute,
        description: `Conhece bem o mundo ${getIconByAttribute(attribute)}`
      }
    }

    if (attribute === 'dexterity') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `Mal consegue mirar e se desviar ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `Tem dificuldade pra mirar e desviar ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `Mira e se esquiva de olhos fechados ${getIconByAttribute(
            attribute
          )}`
        }
      }

      return {
        value,
        attribute,
        description: `Tem uma boa mira e um bom reflexo ${getIconByAttribute(
          attribute
        )}`
      }
    }

    if (attribute === 'constituition') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `Está constantemente doente ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `Tem uma saúde meio ruim ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `Tem uma saúde incrível! ${getIconByAttribute(
            attribute
          )}`
        }
      }

      return {
        value,
        attribute,
        description: `Tem uma saúde boa ${getIconByAttribute(attribute)}`
      }
    }

    if (attribute === 'charisma') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `Tem uma péssima lábia ${getIconByAttribute(attribute)}`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `É um pouco ruim de lábia ${getIconByAttribute(
            attribute
          )}`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `Engana quase qualquer um ${getIconByAttribute(
            attribute
          )}`
        }
      }

      return {
        value,
        attribute,
        description: `É bom de lábia ${getIconByAttribute(attribute)}`
      }
    }
  }

  const filteredModifiers = filterModifiers()

  return filteredModifiers.map((attribute) => parseAttribute(attribute))
}

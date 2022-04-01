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
          description: `${getIconByAttribute(attribute)} Muito fracote`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Meio fracote`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Muito forte`
        }
      }

      return {
        value,
        attribute,
        description: `${getIconByAttribute(attribute)} Meio forte`
      }
    }

    if (attribute === 'intelligence') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Mal sabe falar`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Não lê, nem escreve`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Fala 4 idiomas`
        }
      }

      return {
        value,
        attribute,
        description: `${getIconByAttribute(attribute)} Fala ${
          value + 1
        } idiomas`
      }
    }

    if (attribute === 'wisdom') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(
            attribute
          )} Zero conhecimento geral`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(
            attribute
          )} Baixo conhecimento geral`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(
            attribute
          )} Ótimos conhecimentos gerais`
        }
      }

      return {
        value,
        attribute,
        description: `${getIconByAttribute(
          attribute
        )} Conhecimento geral razoável`
      }
    }

    if (attribute === 'dexterity') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(
            attribute
          )} Horrível pra mirar e se desviar`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(
            attribute
          )} É ruim pra mirar e desviar`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(
            attribute
          )} Mira e reflexos excelentes`
        }
      }

      return {
        value,
        attribute,
        description: `${getIconByAttribute(attribute)} Boa mira e reflexos`
      }
    }

    if (attribute === 'constituition') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Tem uma saúde péssima`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Tem uma saúde ruim`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Tem uma saúde incrível`
        }
      }

      return {
        value,
        attribute,
        description: `${getIconByAttribute(attribute)} Tem uma saúde boa`
      }
    }

    if (attribute === 'charisma') {
      if (value === -3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Péssima lábia`
        }
      }

      if (value < 0) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Um pouco ruim de lábia`
        }
      }

      if (value === 3) {
        return {
          value,
          attribute,
          description: `${getIconByAttribute(attribute)} Incrível na lábia`
        }
      }

      return {
        value,
        attribute,
        description: `${getIconByAttribute(attribute)} Bom de lábia`
      }
    }
  }

  const filteredModifiers = filterModifiers()

  return filteredModifiers.map((attribute) => parseAttribute(attribute))
}

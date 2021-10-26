export default function getAttributeModifier(value) {
  const attribute = Number(value)

  if (attribute <= 3) {
    return -3
  }

  if (attribute <= 5) {
    return -2
  }

  if (attribute <= 8) {
    return -1
  }

  if (attribute <= 12) {
    return 0
  }

  if (attribute <= 15) {
    return 1
  }

  if (attribute <= 17) {
    return 2
  }

  if (attribute === 18) {
    return 3
  }
}

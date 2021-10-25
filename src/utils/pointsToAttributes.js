export default function pointsToAttributes(points) {
  const [
    strength,
    intelligence,
    wisdom,
    dexterity,
    constituition,
    charisma
  ] = points

  return {
    strength,
    intelligence,
    wisdom,
    dexterity,
    constituition,
    charisma
  }
}

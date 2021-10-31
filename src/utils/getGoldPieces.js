import _ from 'lodash'

export default function getGoldPieces() {
  const result = _(3).times(() => Math.floor(Math.random() * 6 + 1))
  return result.reduce((a, b) => a + b) * 10
}

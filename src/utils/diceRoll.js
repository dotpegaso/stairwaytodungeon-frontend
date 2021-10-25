const RandomOrg = require('random-org')

const random = new RandomOrg({
  apiKey: process.env.REACT_APP_RANDOM_ORG_API_KEY
})

export default async function diceRoll(dice) {
  const result = await random
    .generateIntegers({
      min: 1,
      max: dice,
      n: 1
    })
    .then((result) => {
      const { data } = result.random
      return data
    })

  return result[0]
}

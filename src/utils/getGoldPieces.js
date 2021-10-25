const RandomOrg = require('random-org')

const random = new RandomOrg({
  apiKey: process.env.REACT_APP_RANDOM_ORG_API_KEY
})

export default async function getGoldPieces() {
  const result = await random
    .generateIntegers({
      min: 1,
      max: 6,
      n: 3
    })
    .then((result) => {
      const { data } = result.random
      return data
    })

  return result.reduce((a, b) => a + b) * 10
}

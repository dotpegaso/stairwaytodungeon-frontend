import RandomOrg from 'random-org'

const random = new RandomOrg({
  apiKey: String(process.env.NEXT_PUBLIC_RANDOM_ORG_API_KEY)
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

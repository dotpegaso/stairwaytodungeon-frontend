const RandomOrg = require('random-org')

const random = new RandomOrg({
  apiKey: String(process.env.NEXT_PUBLIC_RANDOM_ORG_API_KEY)
})

const occupationList = [
  'Armeiro(a)',
  'Astrólogo(a)',
  'Fabricante de Bolsas',
  'Padeiro(a)',
  'Fabricante de Cestos',
  'Fabricante de Cintos',
  'Ferreiro(a)',
  'Fabricante de Vassouras',
  'Açougueiro(a)',
  'Carpinteiro(a)',
  'Cartógrafo(a)',
  'Queimador(a) De Carvão',
  'Fabricante de Queijos',
  'Sapateiro(a)',
  'Cozinheiro(a)',
  'Bêbado(a)',
  'Agricultor(a)',
  'Pescador(a)',
  'Bardo(a)',
  'Soprador(a) de Vidros',
  'Pedinte',
  'Agiota',
  'Apostador(a)',
  'Coletor(a) de Bosta',
  'Coveiro(a)',
  'Carniceiro(a)',
  'Pergaminheiro(a)',
  'Caçador(a)',
  'Golpista',
  'Joalheiro(a)',
  'Ladra(ão) de Corpos',
  'Carcereiro(a)',
  'Caçador(a) de Ratos',
  'Pedreiro(a)',
  'Contrabandista',
  'Lenhador(a)',
  'Alquimista',
  'Profeta de Rua',
  'Engenheiro(a)',
  'Falcoeiro(a)',
  'Fabricante de Chaves',
  'Contador(a) de Histórias',
  'Coletor(a) de Impostos',
  'Vigarista'
]

export default async function getOccupation() {
  const result = await random
    .generateIntegers({
      min: 0,
      max: occupationList.length - 1,
      n: 1
    })
    .then((result) => {
      const { data } = result.random
      return data
    })

  return occupationList[result]
}

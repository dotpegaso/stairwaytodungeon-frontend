// Alguém que busca...
const motivationList = [
  'riquezas, das grandes! Mas o que fará com ela assim que a encontrar?',
  'espalhar sua música pelo mundo. Que tipo de música?',
  'conhecimento arcano, novas magias! Existe alguma em específico?',
  'registrar a história de outros povos. Mas o que fará com esses registros?',
  'antigas relíquias para alimentar seu colecionismo. Qual antiguidade mais te intriga?',
  'explorar novos lugares e simplesmente se aventurar! Qual será a sua região preferida?',
  'fugir de uma dívida que possui. Que dívida é essa?',
  'pagar uma promessa. Mas que promessa é essa?',
  'encontrar o lugar que esteve em seu sonho. Mas que lugar era esse?',
  'capturar alguém. Quem?',
  'superar seu maior medo. Qual será esse pavor?',
  'conquistar fama e glória. O que fará assim que conseguí-la?',
  'responder a grande pergunta da sua vida. Qual é essa pergunta?',
  'encontrar um poder. Qual poder?',
  'encontrar um objeto. Qual objeto?',
  'encontrar um artefato. Qual artefato?',
  'confirmar a existência de um grande rumor. Qual rumor é esse?',
  'encontrar um poder divino. Qual poder divino?',
  'completar uma profecia. Qual profecia?',
  'vingança. Por quem?'
]

export default function getCharacterMotivation() {
  return [
    motivationList[Math.floor(Math.random() * 20)],
    motivationList[Math.floor(Math.random() * 20)],
    motivationList[Math.floor(Math.random() * 20)]
  ]
}

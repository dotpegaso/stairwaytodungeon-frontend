export default function getClericalSpells() {
  return [
    {
      name: 'Curar ferimentos leves',
      level: 1,
      range: 'Ao toque',
      effect:
        'Cura dano ou remove paralisia. Se for usada pra curar, role 1d6+1 para determinar o resultado da cura.'
    },
    {
      level: 1,
      name: 'Causar ferimentos leves',
      range: 'Ao toque',
      effect: 'Role 1d6+1 para determinar o resultado do dano causado',
      reverse: true
    },
    {
      name: 'Detectar o Mal',
      level: 1,
      range: '36m',
      effect:
        'Revelará até 1d6 criaturas no raio de 36m. Ao serem reveladas, 1d4 deverá ser usado para determinar o quão distante em turnos essas criaturas estão daquela pessoa que utilizou essa magia'
    },
    {
      name: 'Detectar Magia',
      level: 1,
      range: '18m',
      effect:
        'Quando este feitiço é lançado, o clérigo verá um brilho ao redor de objetos, criaturas e lugares mágicos dentro do efeito do feitiço. O brilho não dura muito; clérigos devem normalmente usar o feitiço quando eles querem saber se objetos particulares já no campo de visão são, de fato, mágicos.'
    },
    {
      name: 'Luz',
      level: 1,
      range: '36m',
      effect:
        'Este feitiço cria uma grande bola de luz, como uma tocha ou lâmpada brilhante. Caso o feitiço seja lançado num objeto (como a arma do clérigo), a luz se move com o objeto. Se lançado nos olhos de uma criatura, a vítima deverá fazer uma jogada de proteção contra feitiços. Falhando, ela ficará cega pela luz enquanto durar o feitiço, ou até o efeito do feitiço ser cancelado.'
    },
    {
      level: 1,
      name: 'Escuridão',
      range: '36m',
      effect:
        'Quando invertido, este feitiço, trevas, cria um círculo de escuridão com 9m de diâmetro. Ele bloqueia toda visão, exceto a infravisão. Trevas podem cancelar um feitiço de luz se lançadas sobre ele, mas podem elas próprias ser canceladas por outro feitiço de luz. Caso sejam lançadas nos olhos de um oponente, trevas causam cegueira enquanto durar o feitiço ou até ser cancelado. Se o alvo realizar uma jogada de proteção contra feitiços bem-sucedida, o feitiço falha.',
      reverse: true
    },
    {
      name: 'Proteção contra o Mal',
      level: 1,
      range: 'Em si',
      effect:
        'Este feitiço cria uma barreira mágica invisível em volta do corpo do clérigo (de menos de uma polegada). Enquanto o feitiço durar, personagens e monstros atacando o clérigo são penalizados em -1 em suas jogadas de ataque, e o clérigo ganha +1 de bônus em todas as jogadas de proteção.'
    },
    {
      name: 'Remover o Medo',
      level: 1,
      range: 'Toque',
      effect:
        'Quando o clérigo lança este feitiço e toca qualquer criatura viva, o feitiço irá acalmar e remover qualquer medo. Se a criatura tiver sido afetada por um feitiço medo ou um efeito que normalmente não permite uma jogada de proteção, o feitiço remover o medo ainda pode ser útil.'
    },
    {
      level: 1,
      name: 'Causar medo',
      range: 'Toque',
      effect:
        'A forma invertida do feitiço, causar o medo, fará qualquer criatura fugir durante dois turnos. A vítima pode fazer uma jogada de proteção contra feitiços para evitar o efeito. Este feitiço invertido tem o alcance de 36m',
      reverse: true
    },
    {
      name: 'Bênção',
      level: 2,
      range: '18m',
      effect:
        'Este feitiço aumenta a moral das criaturas amigáveis em +1 e concede aos atingidos bônus de +1 em todas as jogadas de ataque e dano.'
    },
    {
      level: 2,
      name: 'Praga',
      range: '18m',
      effect:
        'Quando invertido, este feitiço, praga, causa uma penalidade de -1 na moral, jogadas de ataque e dano dos inimigos. Cada vítima pode fazer uma jogada de proteção contra feitiços para evitar as penalidades.',
      reverse: true
    },
    {
      name: 'Falar com Animais',
      level: 2,
      range: 'Em si',
      effect:
        'O clérigo deve nomear um tipo de animal (como lobos). O clérigo então pode fazer 3 perguntas à todos os animais daquele tipo se eles estiverem dentro de 9m'
    },
    {
      name: 'Silêncio',
      level: 2,
      range: '5m',
      effect:
        'Este feitiço torna a área atingida totalmente silenciosa. Conversar e lançar feitiços na área são ações impossíveis por 1d6+1 turnos.'
    },
    {
      name: 'Prender Pessoas',
      level: 2,
      range: '54m',
      effect:
        'Paralisa até 4 criaturas. O feitiço prender pessoas atingirá qualquer ser humano, semi-humano ou criatura humanoide Ele não atinge mortos-vivos ou criaturas maiores que ogros. Cada vítima deve fazer uma jogada de proteção contra feitiços ou ficar paralisada por nove turnos. O feitiço pode ser lançado sobre apenas uma pessoa ou sobre um grupo.'
    },
    {
      level: 2,
      name: 'Liberar pessoas',
      range: '54m',
      effect:
        'Remove a paralisia de até quatro vítimas da forma normal do feitiço (incluindo prender pessoas lançado por um mago ou um elfo). Não tem outros efeitos; por exemplo, não remove os efeitos da habilidade paralisia de um ghoul.',
      reverse: true
    },
    {
      name: 'Crescimento de Animal',
      level: 3,
      range: '36m',
      effect:
        'Este feitiço duplica o tamanho de um animal normal ou gigante por 1d10+2 turnos. O animal tem então duas vezes sua força normal e inflige o dobro do dano normal. Pode também carregar o dobro da carga normal. Este feitiço não altera o comportamento, classe de armadura, ou pontos de vida de um animal.'
    },
    {
      name: 'Curar doença',
      level: 3,
      range: '9m',
      effect:
        'Este feitiço irá curar qualquer criatura viva de uma doença, como aquelas causadas por uma múmia ou lama esverdeada. Se lançado por um clérigo de 11o nível ou maior, este feitiço irá curar também licantropia.'
    },
    {
      level: 3,
      name: 'Causar doença',
      range: '9m',
      effect:
        'Infecta a vítima com uma doença devastadora horrível a menos que ela seja bem-sucedida em uma jogada de proteção contra feitiços. Uma vítima doente tem uma penalidade de -2 em todas as jogadas de ataque. Em adição, os ferimentos da vítima não podem ser curados magicamente e cura natural leva duas vezes mais tempo que o usual. A doença é fatal em 2d12 dias a menos que removida por um feitiço curar doença.',
      reverse: true
    },
    {
      name: 'Remover Maldição',
      level: 3,
      range: 'Toque',
      effect:
        'Este feitiço remove uma maldição, seja em um personagem, item ou área.',
      reverse: true,
      reverseName: 'Amaldiçoar',
      reverseEffect:
        'Causa um infortúnio ou penalidade à vítima. Maldições são limitadas apenas pela sua imaginação, mas se uma maldição tentada é muito poderosa, ela pode voltar para o lançador!'
    },
    {
      level: 3,
      name: 'Amaldiçoar',
      range: 'Toque',
      effect:
        'Causa um infortúnio ou penalidade à vítima. Maldições são limitadas apenas pela sua imaginação, mas se uma maldição tentada é muito poderosa, ela pode voltar para o lançador!',
      reverse: true
    },
    {
      name: 'Falar com os Mortos',
      level: 3,
      range: '3m',
      effect:
        'Por meio deste feitiço, o clérigo pode fazer três perguntas a um espírito desencarnado se o corpo estiver dentro do alcance. O espírito irá sempre responder em uma língua conhecida pelo clérigo, mas somente pode oferecer conhecimento de coisas até o tempo de sua morte.'
    },
    {
      name: 'Golpeamento',
      level: 3,
      range: '9m',
      effect:
        'Este feitiço permite que qualquer uma arma provoque +1d6 pontos de dano no próximo ataque que foi bem sucedido.'
    },
    {
      name: 'Animar Morto-Vivo',
      level: 4,
      range: '18m',
      effect:
        'Este feitiço permite ao lançador produzir esque- letos ou zumbis animados, encantados a partir de esqueletos e corpos normais dentro do alcance. Para cada nível do clérigo, ele pode animar um 1d6 mortos-vivos.'
    },
    {
      name: 'Criar Água',
      level: 4,
      range: '3m',
      effect:
        'Com este feitiço, o clérigo invoca uma fonte encantada a partir do chão ou de uma parede. A nascente irá fluir por uma hora, água o bastante para 12 homens e suas montarias (para aquele dia, quase 50 galões).'
    },
    {
      name: 'Curar Ferimentos Graves',
      level: 4,
      range: 'Toque',
      effect:
        'Cura dano ou remove paralisia. Se for usada pra curar, role 2d6+2 para determinar o resultado da cura.'
    },
    {
      name: 'Causar Ferimentos Graves',
      level: 4,
      range: 'Toque',
      effect: 'Role 2d6+2 para determinar o resultado do dano causado',
      reverse: true
    },
    {
      name: 'Falar com plantas',
      level: 4,
      range: 'Em si',
      effect:
        'Este feitiço habilita o clérigo para conversar com plantas como se elas fossem inteligentes. O clérigo pode requisitar um favor simples, e as plantas irão concedê-lo se estiver dentro das possibilidades das plantas entenderem e realizarem. Funciona também com Ents.'
    },
    {
      name: 'Gravetos em Cobras',
      level: 4,
      range: '36m',
      effect:
        'Este feitiço torna 2d8 gravetos em cobras. As cobras podem ser venenosas (50% de chance por cobra; o MJ pode jogar 1d6 para cada cobra; com uma jogada de 1-3, a cobra é venenosa).'
    },
    {
      name: 'Neutralizar Veneno',
      level: 4,
      range: 'Toque',
      effect:
        'Este feitiço irá tornar veneno inofensivo seja em uma criatura, um recipiente (como uma garrafa), ou em um objeto (como um baú). Irá até reviver uma vítima abatida por veneno. Entretanto, não cura dano.'
    },
    {
      name: 'Criar veneno',
      level: 4,
      range: 'Toque',
      effect:
        'Pode ser lançado, através do toque, em uma criatura ou recipiente. Um clérigo não pode lançá-lo em qualquer outro objeto. Uma vítima deve fazer uma jogada de proteção contra veneno ou ser imediatamente abatida pelo veneno. Se lançado em um recipiente, o feitiço envenena o seu conteúdo, mesmo para recipientes ou conteúdos mágicos (como poções).',
      reverse: true
    },
    {
      name: 'Curar Ferimentos Críticos',
      level: 5,
      range: 'Toque',
      effect:
        'Cura dano ou remove paralisia. Se for usada pra curar, role 3d6+3 para determinar o resultado da cura.'
    },
    {
      name: 'Causar Ferimentos Críticos',
      level: 5,
      range: 'Toque',
      effect: 'Role 3d6+3 para determinar o resultado do dano causado',
      reverse: true
    },
    {
      name: 'Anular o mal',
      level: 5,
      range: '9m',
      effect:
        'Este feitiço pode afetar todos os mortos-vivos ou monstros encantados (convocado, controlado, e animado) dentro do alcance. Irá destruir o monstro a menos que cada vítima faça uma jogada de proteção contra feitiços. Qualquer criatura de outro plano é banida. Este feitiço irá também retirar a maldição de qualquer um item amaldiçoado.'
    },
    {
      name: 'Criar Alimentos',
      level: 5,
      range: '3m',
      effect:
        'Este feitiço cria comida normal o suficiente para alimentar 12 homens e suas montarias por um dia.'
    },
    {
      name: 'Praga de Insetos',
      level: 5,
      range: '140m',
      effect:
        'Este feitiço invoca um imenso enxame de insetos. O enxame obscurece a visão e afasta criaturas de menos que 3 Dados de Vida (sem jogadas de proteção). O enxame se move a até 6 m por round como direcionado pelo clérigo enquanto estiver dentro do alcance. O lançador deve se concen- trar, sem se mover, para controlar o enxame. Se o lançador é perturbado, os insetos dispersam e o feitiço termina. Este feitiço funciona somente em áreas externas e sobre o solo.'
    },
    {
      name: 'Aplicar missão',
      level: 5,
      range: '9m',
      effect:
        'Este feitiço força a vítima a realizar alguma tarefa especial ou missão, conforme comandado pelo lançador. A vítima pode fazer uma jogada de proteção contra feitiços; se bem-sucedida, o feitiço não a afeta. Uma tarefa típica pode envolver abater um certo monstro, resgatar um prisioneiro, ou ir em uma peregrinação. Se a tarefa é impossível ou suicida, o feitiço não tem efeito. Uma vez que a tarefa é completada, o feitiço termina.'
    },
    {
      name: 'Remover missão',
      level: 5,
      range: '9m',
      effect:
        'Pode ser utilizado para anular uma missão indesejada ou uma maldição relacionada a uma missão.',
      reverse: true
    },
    {
      name: 'Reviver Morto',
      level: 5,
      range: '36m',
      effect:
        'Por meio deste feitiço, o clérigo pode reviver qualquer humano, anão, halfling ou elfo dos mortos. O corpo deve estar presente, e se parte estiver ausente, o personagem revivido estará debilitado de acordo.'
    },
    {
      name: 'Raio da morte',
      level: 5,
      range: '36m',
      effect:
        'Cria um raio da morte que matará qualquer uma criatura viva dentro de 18m. A vítima pode fazer uma jogada de proteção contra raio da morte para evitar o efeito.',
      reverse: true
    }
  ]
}

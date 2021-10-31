import * as S from './styles'

const diceIconByValue = {
  4: '/images/d4.svg',
  6: '/images/d6.svg',
  8: '/images/d8.svg',
  10: '/images/d10.svg',
  12: '/images/d12.svg',
  20: '/images/d20.svg'
}

const DiceTray = ({
  playerAvatar,
  playerName,
  diceRollResult,
  diceRollSides
}) => (
  <S.Overlay>
    <S.Dicetray>
      <div>
        {playerAvatar && <S.Avatar src={playerAvatar} alt="avatar" />}
        <p>{playerName}</p>
      </div>
      <h1 diceResult>{diceRollResult}</h1>
      {diceRollSides && (
        <S.Icon src={diceIconByValue[diceRollSides]} isAllyDice />
      )}
    </S.Dicetray>
  </S.Overlay>
)

export default DiceTray

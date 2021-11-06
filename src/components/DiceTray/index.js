import * as S from './styles'

const DiceTray = ({ playerName, diceRollResult, diceRollSides }) => (
  <S.Overlay>
    <S.Dicetray>
      <S.Announcement>{`${playerName} rolou um d${diceRollSides} e o resultado foi:`}</S.Announcement>

      <S.Announcement diceResult>{diceRollResult}</S.Announcement>
    </S.Dicetray>
  </S.Overlay>
)

export default DiceTray

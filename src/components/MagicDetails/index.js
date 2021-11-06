import _ from 'lodash'
import * as S from './styles'

const MagicDetails = ({ magic, handleClose }) => {
  const { name, description } = _.defaultTo(magic, {})

  return (
    <S.Overlay>
      <S.MagicDetails>
        <S.Text title>{name}</S.Text>
        <S.Text>{description}</S.Text>
        <S.CloseButton onClick={handleClose}>Fechar</S.CloseButton>
      </S.MagicDetails>
    </S.Overlay>
  )
}

export default MagicDetails

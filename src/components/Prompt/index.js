import * as S from './styles'

const Prompt = ({ children }) => (
  <S.Container>
    <img src="/images/logo.svg" alt="Stairway to Dungeon" />
    <S.Text>{children}</S.Text>
  </S.Container>
)

export default Prompt

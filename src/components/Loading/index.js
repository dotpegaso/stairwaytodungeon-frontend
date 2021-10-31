import React from 'react'

import * as S from './styles'

const Loading = ({ children, isInline }) => {
  return isInline ? (
    <S.InlineContainer>
      <S.Text>{children}</S.Text>
    </S.InlineContainer>
  ) : (
    <S.Container>
      <S.Text>{children}</S.Text>
    </S.Container>
  )
}

export default Loading

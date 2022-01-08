import React from 'react'

import * as S from './styles'

const Loading = () => <S.LoadingIcon src="/images/loading.svg" alt="Loading" />

export const LoadingContainer = () => (
  <S.LoadingContainer>{Loading()}</S.LoadingContainer>
)

export default Loading

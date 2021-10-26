/* eslint-disable react/prop-types */
import React from 'react'

import * as S from './styles'

import iconLoading from '../../assets/images/icon_loading.svg'

const Loading = ({ children, isInline }) => {
  return isInline ? (
    <S.InlineContainer>
      <S.Image src={iconLoading} alt="Loading" />
      <S.Text>{children}</S.Text>
    </S.InlineContainer>
  ) : (
    <S.Container>
      <S.Image src={iconLoading} alt="Loading" />
      <S.Text>{children}</S.Text>
    </S.Container>
  )
}

export default Loading

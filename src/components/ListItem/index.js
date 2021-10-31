import React from 'react'

import * as S from './styles'

const ListItem = ({ children, ...props }) => (
  <S.ListItem {...props}>{children}</S.ListItem>
)

export default ListItem

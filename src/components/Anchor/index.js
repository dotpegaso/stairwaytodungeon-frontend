/* eslint-disable react/prop-types */
import React from 'react'

import * as S from './styles'

const Anchor = ({ href, children, icon, ...props }) => (
  <S.Anchor href={href} icon={icon} {...props}>
    {children}
  </S.Anchor>
)

export default Anchor

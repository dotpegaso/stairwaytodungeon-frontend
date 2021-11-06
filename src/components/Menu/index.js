import React from 'react'
import Link from 'next/link'

import * as S from './styles'

const Menu = ({ options }) => {
  return (
    <S.Menu>
      {options.map((option, index) => (
        <Link
          key={index}
          href={option.path}
          shallow={option.shallow}
          replace={option.shallow}>
          <S.MenuOption isActive={option.isActive}>
            {option.description}
          </S.MenuOption>
        </Link>
      ))}
    </S.Menu>
  )
}

export default Menu

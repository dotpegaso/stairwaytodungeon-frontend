import _ from 'lodash'
import React, { useState } from 'react'

import * as S from './styles'

const Menu = ({ options, onChange }) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(0)

  function handleOnClick({ index, optionValue }) {
    setActiveOptionIndex(index)
    onChange(optionValue)
  }

  return (
    <S.Menu>
      {options.map((option, index) => (
        <S.MenuOption
          onClick={() =>
            handleOnClick({ index, optionValue: _.get(option, 'value') })
          }
          isActive={activeOptionIndex === index}
          key={index}>
          {option.description}
        </S.MenuOption>
      ))}
    </S.Menu>
  )
}

export default Menu

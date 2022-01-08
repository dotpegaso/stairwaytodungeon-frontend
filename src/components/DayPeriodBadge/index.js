import { useState } from 'react'
import { socket } from '../../pages/_app'

import * as S from './styles'

const DayPeriodBadge = () => {
  const [currentDayPeriod, setCurrentDayPeriod] = useState('dawn') // dawn, day, night

  function getDayPeriodIcon() {
    switch (currentDayPeriod) {
      case 'dawn':
        return '/images/icon_dawn.svg'
      case 'day':
        return '/images/icon_sun.svg'
      case 'night':
        return '/images/icon_moon.svg'
      default:
        return '/images/icon_dawn.svg'
    }
  }

  socket.on('dayPeriodChange', ({ day_period }) => {
    setCurrentDayPeriod(day_period)
  })

  return <img src={getDayPeriodIcon()} alt={currentDayPeriod} />
}

export default DayPeriodBadge

import { useState } from 'react'
import { io } from 'socket.io-client'
import RandomOrg from 'random-org'
import GlobalStyle from '../styles/globalStyles'
import { UserProvider } from '../context/userContext'
import { CharacterProvider } from '../context/characterContext'

import '../styles/colors.css'

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT)

export const random = new RandomOrg({
  apiKey: String(process.env.NEXT_PUBLIC_RANDOM_ORG_API_KEY)
})

export default function App({ Component, pageProps }) {
  const [dayPeriod, setDayPeriod] = useState('noon')

  socket.on('dayPeriodChange', ({ day_period }) => {
    return setDayPeriod(day_period)
  })

  return (
    <UserProvider>
      <CharacterProvider>
        <GlobalStyle dayPeriod={dayPeriod} />
        <Component {...pageProps} />
      </CharacterProvider>
    </UserProvider>
  )
}

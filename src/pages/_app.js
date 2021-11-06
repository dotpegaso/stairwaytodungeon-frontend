import GlobalStyle from '../styles/globalStyles'
import { UserProvider } from '../context/userContext'
import { CharacterProvider } from '../context/characterContext'

import '../styles/colors.css'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <CharacterProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </CharacterProvider>
    </UserProvider>
  )
}

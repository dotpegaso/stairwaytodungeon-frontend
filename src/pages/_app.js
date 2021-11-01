import GlobalStyle from '../styles/globalStyles'
import { UserProvider } from '../context/userContext'
import '../styles/colors.css'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </UserProvider>
  )
}

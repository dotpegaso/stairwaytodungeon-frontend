import GlobalStyle from '../styles/globalStyles'
import { AppWrapper } from '../context'
import '../styles/colors.css'

export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppWrapper>
  )
}

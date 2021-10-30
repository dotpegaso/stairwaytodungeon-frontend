import React from 'react'
import { isMobile } from 'react-device-detect'
import { Anchor } from '../../components'

import * as S from './styles'

import logo from '../../assets/images/logo.svg'
import download from '../../assets/images/icon_download.svg'

const driveUrl =
  'https://drive.google.com/drive/u/0/folders/1tg3sTMbm065Dkgw9dku084oelrwkZipQ'

const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URI}&response_type=token&scope=identify%20guilds`

const Login = () => {
  return (
    <S.Container>
      <img src={logo} alt="logo" />
      {isMobile && (
        <Anchor href={discordUrl} isDiscord>
          Entrar com Discord
        </Anchor>
      )}
      <Anchor href={driveUrl} icon={download}>
        Baixar material gratuito
      </Anchor>
    </S.Container>
  )
}

export default Login

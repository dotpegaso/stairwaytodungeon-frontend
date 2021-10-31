import React from 'react'
// import { isMobile } from 'react-device-detect'

import * as S from './styles'

const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}&response_type=token&scope=identify%20guilds`

const Login = () => {
  return (
    <S.Container>
      <a href={discordUrl}>Entrar com Discord</a>
    </S.Container>
  )
}

export default Login

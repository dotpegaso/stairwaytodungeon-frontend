import React from 'react'
// import { isMobile } from 'react-device-detect'

import { Container } from '../components'

const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}&response_type=token&scope=identify%20guilds`

const Login = () => {
  return (
    <Container>
      <a href={discordUrl}>Entrar com Discord</a>
    </Container>
  )
}

export default Login

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// import { isMobile } from 'react-device-detect'

import { Container } from '../components'

const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}&response_type=token&scope=identify%20guilds`

const Login = () => {
  const router = useRouter()

  useEffect(() => {
    const discordId = localStorage.getItem('discord_id')
    if (discordId) {
      router.push('/welcome')
    }
  }, [router])

  return (
    <Container>
      <a href={discordUrl}>Entrar com Discord</a>
    </Container>
  )
}

export default Login

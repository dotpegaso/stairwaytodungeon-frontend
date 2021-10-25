import React from 'react'

const Login = () => {
  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_DISCORD_REDIRECT_URI}&response_type=token&scope=identify%20guilds`

  console.log('discordUrl', discordUrl)

  return (
    <>
      <a href={discordUrl}>Entrar com discord</a>
    </>
  )
}

export default Login

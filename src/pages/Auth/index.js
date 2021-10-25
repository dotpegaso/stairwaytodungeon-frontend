import React from 'react'
import _ from 'lodash'
import { useEffect } from 'react'
import { useNavigate } from '@reach/router'
import { api } from '../../utils'

const Auth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))

    if (!fragment.has('access_token')) {
      return
    }

    const accessToken = fragment.get('access_token')
    const tokenType = fragment.get('token_type')

    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${accessToken}`
      }
    })
      .then((res) => res.json())
      .then((response) => {
        const { id } = response

        api({ method: 'GET', url: `players?discord_id=${id}` }).then((res) => {
          if (_.isEmpty(res)) {
            navigate('/forbidden')
          } else {
            navigate('/dashboard', { state: { response } })
          }
        })
      })
      .catch((err) => console.error('Auth error: ', err))
  }, [navigate])

  return <h1>Verificando...</h1>
}

export default Auth

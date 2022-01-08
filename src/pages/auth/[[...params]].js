import _ from 'lodash'
import { useEffect } from 'react'
import { api } from '../../utils'
import { useRouter } from 'next/router'
import { useUser } from '../../context/userContext'

import { Prompt } from '../../components'

import {
  characterPoolRoute,
  errorRoute,
  forbiddenRoute
} from '../../utils/shared'

const Auth = () => {
  const router = useRouter()
  const { setDiscordId, setAvatarHash } = useUser()

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))

    if (!fragment.has('access_token')) {
      return null
    }

    const accessToken = fragment.get('access_token')
    const tokenType = fragment.get('token_type')

    if (_.isNil(accessToken) || _.isNil(tokenType)) {
      return router.push(errorRoute)
    }

    function handleRouteChange(route) {
      return router.push(route, undefined, { shallow: true })
    }

    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${accessToken}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        const { id, avatar } = response

        setDiscordId(id)
        setAvatarHash(avatar)

        api({ method: 'GET', url: `players?discord_id=${id}` }).then(
          (response) => {
            if (_.isEmpty(response)) {
              return handleRouteChange(forbiddenRoute)
            }

            localStorage.setItem('discord_id', id)
            localStorage.setItem('avatar_hash', avatar)

            return handleRouteChange(characterPoolRoute)
          }
        )
      })
      .catch(() => handleRouteChange(errorRoute))
  }, [router, setAvatarHash, setDiscordId])

  return <Prompt>Carregando...</Prompt>
}

export default Auth

import _ from 'lodash'
import { useEffect } from 'react'
import { api } from '../../utils'
import { useRouter } from 'next/router'
import { useAppContext } from '../../context'

import { Loading } from '../../components'

const Auth = () => {
  const router = useRouter()
  const { setDiscordId, setAvatarHash } = useAppContext()

  useEffect(() => {
    router.prefetch('/dashboard')
  }, [])

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))

    if (!fragment.has('access_token')) {
      return
    }

    const access_token = fragment.get('access_token')
    const token_type = fragment.get('token_type')

    if (_.isNil(access_token) || _.isNil(token_type)) {
      return
    }

    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    })
      .then((res) => res.json())
      .then((response) => {
        const { id: discord_id, avatar } = response

        setDiscordId(discord_id)
        setAvatarHash(avatar)

        api({ method: 'GET', url: `players?discord_id=${discord_id}` }).then(
          (res) => {
            if (_.isEmpty(res)) {
              router.push('/missing-player')
            } else {
              router.push('/characters/1')
            }
          }
        )
      })
      .catch((err) => console.error('Auth error: ', err))
  }, [router, setAvatarHash, setDiscordId])

  return <Loading>Verificando...</Loading>
}

export default Auth

import { useEffect, useState } from 'react'
import Link from 'next/link'
import _ from 'lodash'

import { Prompt, Button, Sheet, DiceTray } from '../../components'

import { api } from '../../utils'
import { useGetCharacterList } from '../../hooks'
import { useCharacter } from '../../context/characterContext'

import { socket } from '../_app'

function emitConnectedCharacter(character_id) {
  socket.emit('connectedCharacter', { character_id })
}

const PlayerSheet = () => {
  useGetCharacterList()

  const [characterToLoad, setCharacterToLoad] = useState(null)
  const [image, setImage] = useState([])

  const {
    isLoadingCharacterList,
    characterList,
    setCharacterDetails,
    characterDetails
  } = useCharacter()

  useEffect(() => {
    setCharacterToLoad(characterList.find((character) => character.isAlive))
  }, [characterList])

  useEffect(() => {
    if (!_.isNil(characterToLoad)) {
      setCharacterDetails(characterToLoad)
      emitConnectedCharacter(characterToLoad.id)
    }
  }, [characterToLoad, setCharacterDetails])

  useEffect(() => {
    if (_.get(characterDetails, 'isAlive') === false) {
      setCharacterToLoad(null)
      setCharacterDetails(null)
    }
  }, [characterDetails, setCharacterDetails, setCharacterToLoad])

  useEffect(() => {
    socket.on('characters', () => {
      const characterId = _.get(characterToLoad, 'id')

      if (!_.isNil(characterId)) {
        api({
          method: 'GET',
          url: `characters/${characterId}`
        }).then((response) => {
          setCharacterDetails(response)
        })
      }
    })
  }, [characterToLoad, setCharacterDetails])

  useEffect(() => {
    socket.on('imageUpload', ({ image }) => {
      const img = (window.URL || window.webkitURL).createObjectURL(
        new Blob([image], { type: 'image/png' })
      )
      setImage(img)
    })
  }, [])

  if (isLoadingCharacterList) {
    return <Prompt>Carregando personagens...</Prompt>
  }

  const isCharacterMissing = _.isNil(characterDetails)

  if (isCharacterMissing) {
    return (
      <Prompt>
        Todos estão mortos
        <Link href="/create">
          <a>
            <Button>Criar personagem</Button>
          </a>
        </Link>
      </Prompt>
    )
  }

  return (
    <>
      <img src={image} />
      <Sheet />
      <DiceTray />
    </>
  )
}

export default PlayerSheet

// var img = document.createElement('img')
// img.src = (window.URL || window.webkitURL).createObjectURL(
//   new Blob([src], { type: 'image/png' })
// )
// img.width = 200
// img.height = 200
// document.querySelector('div').append(img)

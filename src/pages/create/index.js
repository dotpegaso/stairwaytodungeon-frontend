import { useEffect } from 'react'
import _ from 'lodash'
import { useCreateCharacter } from '../../context/createCharacterContext'

import { random } from '../_app'

import { Prompt, NewCharacter } from '../../components'

import { pointsToAttributes, getGoldPieces, getOccupation } from '../../utils'

const Create = () => {
  const {
    attributes,
    characterOptions,
    isLoading,
    loadingMessage,
    setAttributes,
    setCharacterOptions,
    setIsLoading
  } = useCreateCharacter()

  useEffect(() => {
    if (!_.isEmpty(characterOptions)) {
      setIsLoading(false)
    }
  }, [characterOptions, setIsLoading])

  useEffect(() => {
    if (_.isEmpty(characterOptions)) {
      random
        .generateIntegers({
          min: 3,
          max: 18,
          n: 18
        })
        .then((result) => {
          const { data } = result.random
          setAttributes(data)
        })
    }
  }, [characterOptions, setAttributes])

  useEffect(() => {
    if (_.isNil(attributes) || !_.isEmpty(characterOptions)) {
      return null
    }

    function initCharacter() {
      const [firstCharacter, secondCharacter, thirdCharacter] = _.chunk(
        attributes,
        6
      ).map((character, index) => ({
        ...pointsToAttributes(character),
        occupation: getOccupation(),
        gold_pieces: getGoldPieces(),
        armor_class: 9,
        id: index + 1
      }))

      setCharacterOptions([firstCharacter, secondCharacter, thirdCharacter])
    }

    initCharacter()
  }, [attributes, characterOptions, setCharacterOptions])

  if (isLoading) {
    return <Prompt>{loadingMessage}</Prompt>
  }

  return <NewCharacter />
}

export default Create

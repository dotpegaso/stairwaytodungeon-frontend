import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useUser } from '../../context/userContext'
import { useCharacter } from '../../context/characterContext'

import {
  Loading,
  ListItem,
  Container,
  DiceTray,
  DicePool,
  Menu,
  CharacterDetails,
  CombatDetails,
  ItemsDetails,
  NotesDetails
} from '../../components'

import {
  getLevelByExperienceCrystals,
  getCharacterDescription,
  getArmorClass,
  parseClass,
  getThaco,
  diceRoll,
  getAvatar,
  api
} from '../../utils'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT)
const rollDataTimeout = 3600

const Character = () => {
  const { characterDetails, setCharacterDetails } = useCharacter()
  const [menuOption, setMenuOption] = useState('character')

  const [diceRollRequested, setDiceRollRequested] = useState(false)
  const [diceRollResult, setDiceRollResult] = useState(null)
  const [diceRollSides, setDiceRollSides] = useState(null)

  const [socketIOPlayerAvatar, setSocketIOPlayerAvatar] = useState(null)
  const [socketIOPlayerName, setSocketIOPlayerName] = useState(null)

  const { discordId, avatarHash } = useUser()

  const router = useRouter()
  const { character_id, option } = router.query
  const baseUrl = `/characters/${character_id}`

  function resetRollData() {
    setDiceRollRequested(false)
    setDiceRollSides(null)
    setDiceRollResult(null)
    setSocketIOPlayerAvatar(null)
    setSocketIOPlayerName(null)
  }

  useEffect(() => {
    if (!_.isNil(character_id)) {
      api({ method: 'GET', url: `characters/${character_id}` }).then(
        (response) => {
          setCharacterDetails(response)
        }
      )
    }
  }, [character_id, setCharacterDetails])

  useEffect(() => {
    socket.on('characters', () => {
      if (!_.isNil(characterDetails) && !_.isNil(character_id)) {
        api({ method: 'GET', url: `characters/${character_id}` }).then(
          (response) => {
            setCharacterDetails(response)
          }
        )
      }
    })

    socket.on('diceroll', function (socketIOPlayer) {
      setDiceRollRequested(true)

      setSocketIOPlayerAvatar(socketIOPlayer.avatar)
      setSocketIOPlayerName(socketIOPlayer.name)

      setDiceRollSides(socketIOPlayer.dice)
      setDiceRollResult(socketIOPlayer.result)

      setTimeout(() => resetRollData(), rollDataTimeout)
    })
  }, [character_id, characterDetails, setCharacterDetails])

  useEffect(() => {
    setMenuOption(option)
  }, [option])

  async function handleDiceRoll(dice) {
    setDiceRollRequested(true)

    const result = await diceRoll(dice)

    setDiceRollSides(dice)
    setDiceRollResult(result)

    socket.emit('diceroll', {
      result,
      dice,
      avatar: getAvatar({ discordId, avatarHash }),
      name: _.get(characterDetails, 'name')
    })

    setTimeout(() => resetRollData(), rollDataTimeout)
  }

  function renderDescription() {
    return getCharacterDescription(characterDetails || []).map(
      (attribute, index) => (
        <ListItem
          key={index}
          isPositive={attribute.value === 3}
          isNegative={attribute.value === -3}>
          {attribute.description}
        </ListItem>
      )
    )
  }

  function renderDiceTray() {
    const DiceTrayProps = {
      playerAvatar:
        socketIOPlayerAvatar || getAvatar({ discordId, avatarHash }),
      playerName: socketIOPlayerName || _.get(characterDetails, 'name'),
      diceRollResult,
      diceRollSides
    }

    return <DiceTray {...DiceTrayProps} />
  }

  function renderWeapons() {
    return _.isEmpty(_.get(characterDetails, 'weapons')) > 0 ? null : (
      <>
        <p>Equipamentos:</p>
        {_.get(characterDetails, 'weapons').map((weapon, index) => (
          <p key={index}>
            {`-
              ${weapon.name}
              ${!_.isNil(weapon.damage) ? `(${weapon.damage})` : ''}
              ${
                !_.isNil(weapon.attack_bonus)
                  ? `(${weapon.attack_bonus_description})`
                  : ''
              }
              ${
                !_.isNil(weapon.defense_bonus)
                  ? `(${weapon.defense_bonus_description})`
                  : ''
              }
            `}
          </p>
        ))}
      </>
    )
  }

  function renderGrimoire() {
    return _.isEmpty(_.get(characterDetails, 'grimoire')) > 0 ? null : (
      <div>
        <p>Magias:</p>
        {_.get(characterDetails, 'grimoire').map((spell, index) => {
          return _.get(spell, 'isAvailable') ? (
            <div key={index}>
              <p>{`✨ ${spell.name}`}</p>
              <details key={index}>
                <summary>Detalhes da magia</summary>
                <p>{`${spell.description}`}</p>
              </details>
            </div>
          ) : (
            <p isUnavailable>{`✨ ${spell.name} - esquecida`}</p>
          )
        })}
      </div>
    )
  }

  function renderItems() {
    return _.isEmpty(_.get(characterDetails, 'items')) > 0 ? null : (
      <div>
        <p>Items:</p>
        {_.get(characterDetails, 'items').map((item, index) => {
          return _.get(item, 'quantity') > 0 ? (
            <p key={index}>{`${item.quantity} ${item.name}`}</p>
          ) : (
            <p key={index} isUnavailable>{`${item.quantity} ${item.name}`}</p>
          )
        })}
      </div>
    )
  }

  function renderDicePool() {
    const dicePoolProps = {
      diceRollRequested,
      handleDiceRoll
    }

    return <DicePool {...dicePoolProps} />
  }

  if (_.isEmpty(characterDetails)) {
    return <Loading>Carregando personagem</Loading>
  }

  const menuProps = {
    options: [
      {
        path: `${baseUrl}?option=character`,
        description: 'Personagem',
        isActive: option === 'character',
        shallow: true
      },
      {
        path: `${baseUrl}?option=combat`,
        description: 'Combate',
        isActive: option === 'combat',
        shallow: true
      }
      // {
      //   path: `${baseUrl}?option=items`,
      //   description: 'Itens',
      //   isActive: option === 'items',
      //   shallow: true
      // },
      // {
      //   path: `${baseUrl}?option=notes`,
      //   description: 'Notas',
      //   isActive: option === 'notes',
      //   shallow: true
      // }
    ]
  }

  return (
    <Container withMenu>
      {menuOption === 'character' && <CharacterDetails />}
      {menuOption === 'combat' && <CombatDetails />}
      {menuOption === 'items' && <ItemsDetails />}
      {menuOption === 'notes' && <NotesDetails />}

      <Menu {...menuProps} />

      {!_.isNil(diceRollResult) && renderDiceTray()}
    </Container>
  )
}

export default Character

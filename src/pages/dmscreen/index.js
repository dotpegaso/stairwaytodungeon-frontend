import { io } from 'socket.io-client'
import { useState } from 'react'
import _ from 'lodash'

import { Board, Dropzone } from '../../components'

import { api } from '../../utils'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_ENDPOINT)

const DMScreen = () => {
  const [currentDayPeriod, setCurrentDayPeriod] = useState('dawn') // dawn, day, night
  const [connectedCharacters, setConnectedCharacters] = useState([])

  async function handleDayPeriodChange(day_period) {
    setCurrentDayPeriod(day_period)

    socket.emit('dayPeriodChange', {
      day_period
    })
  }

  async function handleSubmit({ e, character }) {
    e.preventDefault()
    const form = document.querySelector(`#form-${character.id}`)
    const data = new FormData(form)

    const value = Object.fromEntries(data.entries())

    api({
      method: 'PUT',
      url: `characters/${character.id}`,
      data: value
    }).then((response) => {
      console.log('response', response)
    })
  }

  socket.on('connectedCharacter', ({ character_id }) => {
    if (_.isNil(character_id)) {
      return null
    }

    api({ method: 'GET', url: `characters/${character_id}` }).then(
      (response) => {
        const isCharacterConnected = connectedCharacters.find(
          (character) => Number(character.id) === Number(character_id)
        )

        if (!isCharacterConnected && !_.isNil(response)) {
          setConnectedCharacters([...connectedCharacters, response])
        }
      }
    )
  })

  console.log('connectedCharacters', connectedCharacters)

  return (
    <>
      {/* <Board /> */}
      <Dropzone />
      {`current: ${currentDayPeriod}`}
      <hr />
      <button onClick={() => handleDayPeriodChange('dawn')}>dawn</button>
      <button onClick={() => handleDayPeriodChange('day')}>day</button>
      <button onClick={() => handleDayPeriodChange('night')}>night</button>
      <br />
      <hr />
      {connectedCharacters.map((character) => (
        <form
          id={`form-${character.id}`}
          onSubmit={(e) => handleSubmit({ e, character })}
          key={character.id}>
          <br />
          <br />
          <br />
          {character.name}
          <label>{`current hp (total: ${character.total_hp})`}</label>
          <input
            type="number"
            name="current_hp"
            defaultValue={character.current_hp}
          />
          <label>experience crystals</label>
          <input
            type="number"
            name="experience_crystals"
            defaultValue={character.experience_crystals}
          />
          <label>gold pieces</label>
          <input
            type="number"
            name="gold_pieces"
            defaultValue={character.gold_pieces}
          />
          <label>armor class</label>
          <input
            type="number"
            name="armor_class"
            defaultValue={character.armor_class}
          />
          <button>update char</button>
        </form>
      ))}
    </>
  )
}

export default DMScreen

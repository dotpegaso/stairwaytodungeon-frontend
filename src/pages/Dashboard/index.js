import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from '@reach/router'
import { api } from '../../utils'

import * as S from './styles'

const Dashboard = ({ location }) => {
  const [characterList, setCharacterList] = useState([])
  const navigate = useNavigate()
  const { id } = location.state.response

  useEffect(() => {
    api({ method: 'GET', url: `characters?player_id=${id}` }).then(
      (response) => {
        setCharacterList(response)
      }
    )
  }, [id])

  return (
    <S.Container>
      {characterList.map((character) => (
        <S.CharacterCard key={character.id}>
          <h1
            onClick={() =>
              navigate('/character', { state: { character } })
            }>{`${character.name} ${character.class}`}</h1>
        </S.CharacterCard>
      ))}
      <h1
        onClick={() =>
          navigate('/character/new', { state: { player_id: id } })
        }>
        Criar novo personagem
      </h1>
    </S.Container>
  )
}

Dashboard.propTypes = {
  location: PropTypes.shape({
    state: {
      response: PropTypes.object
    }
  }).isRequired
}

export default Dashboard

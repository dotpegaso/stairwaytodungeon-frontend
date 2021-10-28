import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { useNavigate } from '@reach/router'
import { api, getLevelByExperienceCrystals, parseClass } from '../../utils'
import { Anchor, Loading } from '../../components'

import * as S from './styles'

import iconAdd from '../../assets/images/icon_add.svg'

const Dashboard = ({ location }) => {
  const [characterList, setCharacterList] = useState([])
  const [loadingCharacterList, setLoadingCharacterList] = useState(true)

  const navigate = useNavigate()

  const { id, avatar } = _.defaultTo(_.get(location, 'state.response'), {})

  useEffect(() => {
    if (_.isNil(id)) {
      navigate('/')
    }

    api({ method: 'GET', url: `characters?player_id=${id}` }).then(
      (response) => {
        setCharacterList(response)
        setLoadingCharacterList(false)
      }
    )
  }, [id, navigate])

  function renderCharactesList() {
    if (_.isEmpty(characterList) && loadingCharacterList) {
      return <Loading isInline>Carregando lista de personagens...</Loading>
    }

    if (
      (_.isEmpty(characterList) && !loadingCharacterList) ||
      (!_.size(characterList.filter((pc) => pc.status === 'alive')) &&
        !loadingCharacterList)
    ) {
      return (
        <Anchor
          icon={iconAdd}
          onClick={() =>
            navigate('/character/new', { state: { player_id: id } })
          }>
          Criar personagem
        </Anchor>
      )
    }

    return characterList
      .filter((pc) => pc.status === 'alive')
      .map((character) => (
        <S.CharacterCard
          key={character.id}
          onClick={() =>
            navigate('/character', {
              state: {
                player: {
                  id,
                  avatar,
                  character
                }
              }
            })
          }>
          <S.CharacterName>{character.name}</S.CharacterName>
          <S.CharacterPreview>{`${parseClass(
            character.class
          )} de nível ${getLevelByExperienceCrystals(
            character.experience_crystals
          )}`}</S.CharacterPreview>
        </S.CharacterCard>
      ))
  }

  return <S.Container>{renderCharactesList()}</S.Container>
}

Dashboard.propTypes = {
  location: PropTypes.shape({
    state: {
      response: PropTypes.object
    }
  }).isRequired
}

export default Dashboard

import { useEffect, useState } from 'react'
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify'

import { api } from '../../utils'
import { useCharacter } from '../../context/characterContext'

import * as S from './styles'
import 'react-toastify/dist/ReactToastify.css'

const Notes = () => {
  const { characterDetails } = useCharacter()
  const [notes, setNotes] = useState()

  const characterId = _.get(characterDetails, 'id')

  useEffect(() => {
    if (!_.isNil(notes)) {
      api({
        method: 'PUT',
        url: `characters/${characterId}`,
        data: { notes }
      }).then(() => {
        toast('✏️ \u00A0 Anotações salvas', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
    }
  }, [characterId, notes])

  function handleChange(e) {
    const { value } = e.target
    setNotes(value)
  }

  return (
    <S.Container>
      <S.TextArea
        defaultValue={_.get(characterDetails, 'notes')}
        placeholder="Adicione uma nota"
        onBlur={handleChange}
      />
      <ToastContainer />
    </S.Container>
  )
}

export default Notes

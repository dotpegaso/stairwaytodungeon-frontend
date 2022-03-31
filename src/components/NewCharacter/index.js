import _ from 'lodash'
import { useState } from 'react'
import Select from 'react-select'

import Button from '../Button'

import { useCreateCharacter } from '../../context/createCharacterContext'

import { parseClass, getCharacterDescription } from '../../utils'
import { classOptions } from '../../utils/shared'

import * as S from './styles'

const NewCharacter = () => {
  const {
    characterName,
    characterClass,
    characterOptions,
    selectedCharacter,
    setCharacterName,
    setCharacterClass,
    setSelectedCharacter,
    handleSubmit
  } = useCreateCharacter()

  const [step, setStep] = useState(1)

  function preventSubmit(e) {
    e.preventDefault()
    e.stopPropagation()

    setStep(step + 1)
  }

  function stepOne() {
    return (
      <S.Form onSubmit={preventSubmit}>
        <S.Text>Começamos com um arquétipo:</S.Text>
        <S.CharacterContainer>
          {characterOptions.map((character, index) => (
            <S.CharacterCard
              onClick={() =>
                setSelectedCharacter({ character, index: character.id })
              }
              selected={selectedCharacter.index === character.id}
              key={index}>
              <S.CharacterDescription>
                {getCharacterDescription(character).map((attribute, index) => (
                  <S.CharacterAttribute
                    key={index}
                    positive={attribute.value === 3}
                    negative={attribute.value === -3}>
                    {attribute.description}
                  </S.CharacterAttribute>
                ))}
              </S.CharacterDescription>
              <div>{`💰 ${character.gold_pieces} moedas de ouro`}</div>
              <div>{`👤 Ex ${character.occupation}`}</div>
            </S.CharacterCard>
          ))}
        </S.CharacterContainer>
        <Button>Continuar</Button>
      </S.Form>
    )
  }

  function stepTwo() {
    const options = classOptions.map((option) => ({
      value: option.value,
      label: parseClass(option.value)
    }))

    function handleChange({ value }) {
      setCharacterClass(value)
    }

    const defaultValue =
      options.find((option) => option.value === characterClass) || options[0]

    const CustomControl = (props) => <S.StyledControl {...props} />

    return (
      <S.Form onSubmit={preventSubmit}>
        <S.Text>Agora escolha uma classe:</S.Text>
        <Select
          options={options}
          defaultValue={defaultValue}
          onChange={handleChange}
          components={{
            Control: CustomControl
          }}
        />
        <S.ButtonContainer>
          <Button type="button" onClick={() => setStep(1)}>
            Voltar
          </Button>
          <Button>Continuar</Button>
        </S.ButtonContainer>
      </S.Form>
    )
  }

  function stepThree() {
    return (
      <S.Form onSubmit={handleSubmit}>
        <S.Text>Vamos finalizar com um nome:</S.Text>
        <S.Input
          placeholder="Ex: Cleverson Canelafina"
          defaultValue={characterName}
          onChange={({ target }) => setCharacterName(target.value)}
          required
        />
        <S.ButtonContainer>
          <Button type="button" onClick={() => setStep(2)}>
            Voltar
          </Button>
          <Button disabled={_.isEmpty(selectedCharacter)}>
            Criar personagem
          </Button>
        </S.ButtonContainer>
      </S.Form>
    )
  }

  function renderContent() {
    if (step === 1) {
      return stepOne()
    }

    if (step === 2) {
      return stepTwo()
    }

    if (step === 3) {
      return stepThree()
    }
  }

  return renderContent()
}

export default NewCharacter

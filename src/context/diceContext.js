import { createContext, useContext, useState } from 'react'

const DiceContext = createContext()

export function DiceProvider({ children }) {
  const [diceRollRequested, setDiceRollRequested] = useState(false)
  const [diceRollSides, setDiceRollSides] = useState(null)
  const [diceRollResult, setDiceRollResult] = useState(null)
  const [socketIOPlayerName, setSocketIOPlayerName] = useState(null)

  function resetRollData() {
    setDiceRollRequested(false)
    setDiceRollSides(null)
    setDiceRollResult(null)
    setSocketIOPlayerName(null)
  }

  const value = {
    diceRollRequested,
    diceRollSides,
    diceRollResult,
    socketIOPlayerName,
    setDiceRollRequested,
    setDiceRollSides,
    setDiceRollResult,
    setSocketIOPlayerName,
    resetRollData
  }

  return <DiceContext.Provider value={value}>{children}</DiceContext.Provider>
}

export function useDice() {
  return useContext(DiceContext)
}

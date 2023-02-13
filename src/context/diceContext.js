import { createContext, useContext, useState } from 'react'

const DiceContext = createContext()

export function DiceProvider({ children }) {
  const [diceRollRequested, setDiceRollRequested] = useState(false)
  const [diceRollSides, setDiceRollSides] = useState(null)
  const [diceRollResult, setDiceRollResult] = useState(null)
  const [socketIOPlayerName, setSocketIOPlayerName] = useState(null)
  const [socketIOMeleeBonus, setSocketIOMeleeBonus] = useState(null)
  const [socketIORangedBonus, setSocketIORangedBonus] = useState(null)

  function resetRollData() {
    setDiceRollRequested(false)
    setDiceRollSides(null)
    setDiceRollResult(null)
    setSocketIOPlayerName(null)
    setSocketIOMeleeBonus(null)
    setSocketIORangedBonus(null)
  }

  const value = {
    diceRollRequested,
    diceRollSides,
    diceRollResult,
    socketIOPlayerName,
    socketIOMeleeBonus,
    socketIORangedBonus,
    setDiceRollRequested,
    setDiceRollSides,
    setDiceRollResult,
    setSocketIOPlayerName,
    setSocketIOMeleeBonus,
    setSocketIORangedBonus,
    resetRollData
  }

  return <DiceContext.Provider value={value}>{children}</DiceContext.Provider>
}

export function useDice() {
  return useContext(DiceContext)
}

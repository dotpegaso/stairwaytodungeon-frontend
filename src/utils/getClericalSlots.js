const getClericalSlots = (level) => {
  if (level === 2) {
    return { 1: 1 }
  }

  if (level === 3) {
    return { 1: 2 }
  }

  if (level === 4) {
    return { 1: 2, 2: 1 }
  }

  if (level === 5) {
    return { 1: 2, 2: 2 }
  }

  if (level === 6) {
    return { 1: 2, 2: 2, 3: 1 }
  }

  if (level === 7) {
    return { 1: 3, 2: 2, 3: 2 }
  }

  if (level === 8) {
    return { 1: 3, 2: 3, 3: 2, 4: 1 }
  }

  if (level === 9) {
    return { 1: 3, 2: 3, 3: 3, 4: 2 }
  }

  if (level === 10) {
    return { 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 }
  }

  if (level === 11) {
    return { 1: 4, 2: 4, 3: 3, 4: 3, 5: 2 }
  }

  if (level === 12) {
    return { 1: 4, 2: 4, 3: 4, 4: 3, 5: 2, 6: 1 }
  }
}

export default getClericalSlots

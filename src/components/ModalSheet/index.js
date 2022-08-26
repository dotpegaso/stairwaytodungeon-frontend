import React from 'react'
import Sheet from 'react-modal-sheet'

import * as S from './styles'

import BlurOverlay from '../BlurOverlay'

const ModalSheet = ({ isBottomSheetOpen, setIsBottomSheetOpen, children }) => (
  <Sheet
    isOpen={isBottomSheetOpen}
    onClose={() => setIsBottomSheetOpen(false)}
    snapPoints={[0.7]}
    initialSnap={0}>
    <Sheet.Container>
      <Sheet.Header />
      <Sheet.Content disableDrag>
        <S.Container>{children}</S.Container>
      </Sheet.Content>
    </Sheet.Container>

    <BlurOverlay />
    <Sheet.Backdrop onClick={() => setIsBottomSheetOpen(false)} />
  </Sheet>
)

export default ModalSheet

import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { UnoptimizedImage } from './UnoptimizedImage'

type ZoomImageProps = {
  isOpen: boolean
  closeDialog: () => void
  fileKey: string
}

export const ZoomImage: React.FC<ZoomImageProps> = (props: ZoomImageProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeDialog}
      contentLabel="User icon edit dialog"
      ariaHideApp={false}
    >
      <UnoptimizedImage
        fileKey={props.fileKey}
        width="90vw"
        height="90vh"
        objectFit="contain"
      />
      <CloseButton onClick={() => props.closeDialog()}>✕</CloseButton>
    </Modal>
  )
}

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px;
`

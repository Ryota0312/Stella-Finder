import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { UnoptimizedImage } from './UnoptimizedImage'

type ZoomImageProps = {
  isOpen: boolean
  closeDialog: () => void
  fileKey: string
  canDelete: boolean
}

export const ZoomImage: React.FC<ZoomImageProps> = (props: ZoomImageProps) => {
  const { postFetcher } = useApi()

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeDialog}
      contentLabel="User icon edit dialog"
      ariaHideApp={false}
      style={{
        content: {
          width: '90vmin',
          height: '90vmin',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <UnoptimizedImage
        fileKey={props.fileKey}
        width="90vmin"
        height="90vmin"
        objectFit="contain"
      />
      <CloseButton onClick={() => props.closeDialog()}>✕</CloseButton>
      {props.canDelete && (
        <DeleteButton
          onClick={() => {
            postFetcher('/api/user/file/delete', { fileKey: props.fileKey })
            location.reload()
          }}
        >
          削除
        </DeleteButton>
      )}
    </Modal>
  )
}

const DeleteButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: red;
  color: white;
  margin: 16px;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px;
`

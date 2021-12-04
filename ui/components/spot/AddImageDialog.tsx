import React, { useState } from 'react'
import Modal from 'react-modal'
import { useApi } from '../../hooks/useApi'
import { ImageUploader } from '../common/ImageUploader'

export type UserIconEditDialogProps = {
  isOpen: boolean
  closeDialog: () => void
  spotId: number
}

export const AddImageDialog: (props: UserIconEditDialogProps) => JSX.Element = (
  props: UserIconEditDialogProps,
) => {
  const { postFetcher } = useApi()
  const [image, setImage] = useState()

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeDialog}
      contentLabel="Add image dialog"
      ariaHideApp={false}
      style={{
        content: {
          width: 'fit-content',
          height: 'fit-content',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <h3>写真を投稿</h3>
      <ImageUploader
        onSuccess={(res) => {
          setImage(res.fileKey)
        }}
      />
      <button
        onClick={() => {
          postFetcher('/api/user/spot/addImage', {
            spotId: props.spotId,
            image: image,
          }).then(() => {
            props.closeDialog()
            window.location.reload()
          })
        }}
      >
        投稿
      </button>
    </Modal>
  )
}

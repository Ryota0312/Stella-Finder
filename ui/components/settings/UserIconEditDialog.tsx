import React, { useState } from 'react'
import Modal from 'react-modal'
import { ImageUploader } from '../common/ImageUploader'
import { useApi } from '../../hooks/useApi'

export type UserIconEditDialogProps = {
  isOpen: boolean
  closeDialog: () => void
}

export const UserIconEditDialog: (
  props: UserIconEditDialogProps,
) => JSX.Element = (props: UserIconEditDialogProps) => {
  const { postFetcher } = useApi()
  const [icon, setIcon] = useState()

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeDialog}
      contentLabel="User icon edit dialog"
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
      <h3>アイコン画像の変更</h3>
      <ImageUploader
        onSuccess={(res) => {
          setIcon(res.fileKey)
        }}
      />
      <button
        onClick={() => {
          postFetcher('/api/user/profile', {
            icon: icon,
          }).then(() => {
            props.closeDialog()
            window.location.reload()
          })
        }}
      >
        更新
      </button>
    </Modal>
  )
}

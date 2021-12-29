import React, { useState } from 'react'
import Modal from 'react-modal'
import { ImageUploader } from '../common/ImageUploader'

export type InsertImageDialogProps = {
  isOpen: boolean
  closeDialog: () => void
  onInsert: (mdImageText: string) => void
}

export const InsertImageDialog: (props: InsertImageDialogProps) => JSX.Element =
  (props: InsertImageDialogProps) => {
    const [fileKey, setFileKey] = useState('')

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
        <h3>画像の挿入</h3>
        <ImageUploader
          onSuccess={(res) => {
            setFileKey(res.fileKey)
          }}
        />
        <button
          onClick={() => {
            props.onInsert(getMarkdownImageText_(fileKey))
            props.closeDialog()
          }}
        >
          挿入
        </button>
      </Modal>
    )
  }

const getMarkdownImageText_ = (fileKey: string) => {
  return `![](/api/file/download?fileKey=${fileKey})`
}

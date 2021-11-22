import React from 'react'
import Modal from 'react-modal'

export type UserIconEditDialogProps = {
  isOpen: boolean
  closeDialog: () => void
}

export const UserIconEditDialog: (
  props: UserIconEditDialogProps,
) => JSX.Element = (props: UserIconEditDialogProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeDialog}
      contentLabel="User icon edit dialog"
    >
      <h3>edit</h3>
      <button onClick={() => props.closeDialog()} />
    </Modal>
  )
}

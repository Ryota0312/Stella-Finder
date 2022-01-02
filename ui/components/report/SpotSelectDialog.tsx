import React, { useState } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { ImageUploader } from '../common/ImageUploader'
import { SpotCard } from '../spot/SpotCard'

export type SpotSelectDialogProps = {
  isOpen: boolean
  closeDialog: () => void
  spotIds: Array<number>
  onSelect: (spotId: number) => void
}

export const SpotSelectDialog: (props: SpotSelectDialogProps) => JSX.Element = (
  props: SpotSelectDialogProps,
) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeDialog}
      contentLabel="Spot select dialog"
      ariaHideApp={false}
    >
      <h3>スポット選択</h3>
      <SpotList>
        {props.spotIds.map((spotId) => (
          <SpotListItem key={spotId}>
            <SpotCard
              onClick={() => {
                props.onSelect(spotId)
                props.closeDialog()
              }}
              spotId={spotId}
            />
          </SpotListItem>
        ))}
      </SpotList>
    </Modal>
  )
}

const SpotList = styled.li`
  list-style: none;
`

const SpotListItem = styled.ul`
  margin: 0;
  padding: 0;
`

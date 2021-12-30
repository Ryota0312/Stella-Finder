import useSWR from 'swr'
import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useApi } from '../../hooks/useApi'
import { TinyLoading } from '../common/TinyLoading'
import { InsertImageDialog } from './InsertImageDialog'

type InsertImageProps = {
  onInsert: (mdImageText: string) => void
}

export const InsertImage: React.FC<InsertImageProps> = (
  props: InsertImageProps,
) => {
  const [isInsertImageDialogOpen, setIsInsertImageDialogOpen] = useState(false)

  const fetcher = useApi()
  const { data, error } = useSWR(['/api/loginUser', false], fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <TinyLoading />

  return (
    <>
      <button onClick={() => setIsInsertImageDialogOpen(true)}>
        <ButtonInnerWithImage>
          <Image
            src="/image/image-icon.png"
            alt="画像を挿入"
            width={18}
            height={18}
          />
          <div>画像を挿入</div>
        </ButtonInnerWithImage>
      </button>
      <InsertImageDialog
        onInsert={(mdImageText) => props.onInsert(mdImageText)}
        isOpen={isInsertImageDialogOpen}
        closeDialog={() => setIsInsertImageDialogOpen(false)}
      />
    </>
  )
}

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 8px;
`

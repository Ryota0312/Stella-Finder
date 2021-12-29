import useSWR from 'swr'
import React, { useState } from 'react'
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
        画像を挿入
      </button>
      <InsertImageDialog
        onInsert={(mdImageText) => props.onInsert(mdImageText)}
        isOpen={isInsertImageDialogOpen}
        closeDialog={() => setIsInsertImageDialogOpen(false)}
      />
    </>
  )
}

import React from 'react'
import { useUploader } from '../../hooks/useUploader'

export const ImageUploader: React.FC<{ onSuccess: (e: any) => void }> = ({
  onSuccess,
}) => {
  const { setImage, upload } = useUploader()

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setImage(e.target.files?.[0])
        }
      />
      <button
        type="button"
        onClick={() => {
          upload().then((res) => {
            onSuccess(res)
          })
        }}
      >
        Upload
      </button>
    </div>
  )
}

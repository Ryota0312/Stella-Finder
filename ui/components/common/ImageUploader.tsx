import React, { useState } from 'react'
import styled from 'styled-components'
import { useUploader } from '../../hooks/useUploader'
import { UnoptimizedImage } from './UnoptimizedImage'

export const ImageUploader: React.FC<{ onSuccess: (e: any) => void }> = ({
  onSuccess,
}) => {
  const { setImage, upload } = useUploader()
  const [uploadedImage, setUploadedImage] = useState<string>('')

  return (
    <div>
      {uploadedImage && (
        <UploadedImageThumbnails>
          <UnoptimizedImage fileKey={uploadedImage} width={'300px'} />
        </UploadedImageThumbnails>
      )}
      {!uploadedImage && (
        <UploadedImageThumbnails>
          アップロードされていません
        </UploadedImageThumbnails>
      )}
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
            setUploadedImage(res.fileKey)
          })
        }}
      >
        Upload
      </button>
    </div>
  )
}

const UploadedImageThumbnails = styled.div`
  width: 300px;
  height: 200px;
`

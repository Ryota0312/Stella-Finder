import React, { useState } from 'react'
import styled from 'styled-components'
import { useUploader } from '../../hooks/useUploader'
import { UnoptimizedImage } from './UnoptimizedImage'

const THUMBNAIL_WIDTH = '300px'
const THUMBNAIL_HEIGHT = '200px'

export const ImageUploader: React.FC<{ onSuccess: (e: any) => void }> = ({
  onSuccess,
}) => {
  const { setImage, upload } = useUploader()
  const [uploadedImage, setUploadedImage] = useState<string>('')

  return (
    <div>
      {uploadedImage && (
        <UploadedImageThumbnail>
          <UnoptimizedImage fileKey={uploadedImage} width={THUMBNAIL_WIDTH} />
        </UploadedImageThumbnail>
      )}
      {!uploadedImage && (
        <UploadedImageThumbnail>
          <NoThumbnail>画像がアップロードされていません</NoThumbnail>
        </UploadedImageThumbnail>
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

const UploadedImageThumbnail = styled.div`
  width: ${THUMBNAIL_WIDTH};
  height: ${THUMBNAIL_HEIGHT};
  border: 1px solid grey;
`
const NoThumbnail = styled.div`
  text-align: center;
  line-height: ${THUMBNAIL_HEIGHT};
  color: grey;
`

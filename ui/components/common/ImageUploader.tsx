import React, { useState } from 'react'
import styled from 'styled-components'
import { useUploader } from '../../hooks/useUploader'
import { UnoptimizedImage } from './UnoptimizedImage'

const THUMBNAIL_WIDTH = '300px'
const THUMBNAIL_HEIGHT = '200px'

type ImageUploaderProps = {
  onSuccess: (e: any) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = (
  props: ImageUploaderProps,
) => {
  const [uploadedImage, setUploadedImage] = useState<string>('')

  return (
    <div>
      <label htmlFor="image_input">
        {uploadedImage && (
          <UploadedImageThumbnail>
            <UnoptimizedImage fileKey={uploadedImage} width={THUMBNAIL_WIDTH} />
          </UploadedImageThumbnail>
        )}
        {!uploadedImage && (
          <UploadedImageThumbnail>
            <NoThumbnail>
              クリックまたはドラッグ＆ドロップで画像をアップロード
            </NoThumbnail>
          </UploadedImageThumbnail>
        )}
      </label>
      <ImageInput
        id="image_input"
        type="file"
        accept="image/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          upload(e.target.files?.[0] as File).then((res: any) => {
            props.onSuccess(res)
            setUploadedImage(res.fileKey)
          })
        }}
      />
    </div>
  )
}

const upload = async (image: File) => {
  const formData = new FormData()
  formData.append('image', image)
  const response = await fetch('/api/user/file/upload', {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

const ImageInput = styled.input`
  display: none;
`

const UploadedImageThumbnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${THUMBNAIL_WIDTH};
  height: ${THUMBNAIL_HEIGHT};
  border: 1px solid grey;
`
const NoThumbnail = styled.div`
  color: grey;
`

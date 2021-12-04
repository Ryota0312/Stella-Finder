import React, { useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
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

  const onDrop = (files: Array<File>) => {
    upload(files[0]).then((res: any) => {
      props.onSuccess(res)
      setUploadedImage(res.fileKey)
    })
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <UploadedImageThumbnail {...getRootProps()}>
        {uploadedImage && (
          <UnoptimizedImage fileKey={uploadedImage} width={THUMBNAIL_WIDTH} />
        )}
        {!uploadedImage && (
          <NoThumbnail>
            クリックまたはドラッグ＆ドロップで画像をアップロード
          </NoThumbnail>
        )}
        <input {...getInputProps()} type="file" accept="image/*" />
      </UploadedImageThumbnail>
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

const UploadedImageThumbnail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${THUMBNAIL_WIDTH};
  height: ${THUMBNAIL_HEIGHT};
  border: 1px solid grey;
  cursor: pointer;
`
const NoThumbnail = styled.div`
  color: grey;
`

import React, { useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { useUploader } from '../../hooks/useUploader'
import { UnoptimizedImage } from './UnoptimizedImage'

const THUMBNAIL_WIDTH = '300px'
const THUMBNAIL_HEIGHT = '200px'

type ImageUploaderProps = {
  onSuccess: (e: any) => void
  thumbnailWidth?: string
  thumbnailHeight?: string
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
      <UploadedImageThumbnail
        {...getRootProps()}
        width={props.thumbnailWidth}
        height={props.thumbnailHeight}
      >
        {uploadedImage && (
          <UnoptimizedImage
            fileKey={uploadedImage}
            width={props.thumbnailWidth}
          />
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

ImageUploader.defaultProps = {
  thumbnailWidth: THUMBNAIL_WIDTH,
  thumbnailHeight: THUMBNAIL_HEIGHT,
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

const UploadedImageThumbnail = styled.div<{ width: string; height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid grey;
  cursor: pointer;
`
const NoThumbnail = styled.div`
  color: grey;
`

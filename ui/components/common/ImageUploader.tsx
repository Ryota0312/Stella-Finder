import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { useApi } from '../../hooks/useApi'
import { UnoptimizedImage } from './UnoptimizedImage'

type ImageUploaderProps = {
  onSuccess: (e: any) => void
  initialImageKey?: string
  thumbnailWidth?: string
  thumbnailHeight?: string
  thumbnailMaxWidth?: string
  thumbnailMaxHeight?: string
}

export const ImageUploader: React.FC<ImageUploaderProps> = (
  props: ImageUploaderProps,
) => {
  const { postFetcher } = useApi()
  const [uploadedImage, setUploadedImage] = useState<string>(
    props.initialImageKey ? props.initialImageKey : '',
  )

  useEffect(
    () => setUploadedImage(props.initialImageKey ? props.initialImageKey : ''),
    [props.initialImageKey],
  )

  const onDrop = async (files: Array<File>) => {
    if (uploadedImage !== '' && uploadedImage !== props.initialImageKey) {
      await postFetcher('/api/user/file/delete', { fileKey: uploadedImage })
    }
    await upload(files[0]).then((res: any) => {
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
        maxWidth={props.thumbnailMaxWidth}
        maxHeight={props.thumbnailMaxHeight}
      >
        {uploadedImage && (
          <UnoptimizedImage
            fileKey={uploadedImage}
            width={props.thumbnailWidth}
            height={props.thumbnailHeight}
          />
        )}
        {!uploadedImage && (
          <NoThumbnail>
            クリックまたはドラッグ＆ドロップで画像をアップロード
          </NoThumbnail>
        )}
        {!!props.initialImageKey && (
          <Overlay
            {...getRootProps()}
            width={props.thumbnailWidth}
            maxWidth={props.thumbnailMaxWidth}
          >
            クリックまたはドラッグ＆ドロップで画像をアップロード
          </Overlay>
        )}
        <input {...getInputProps()} type="file" accept="image/*" />
      </UploadedImageThumbnail>
    </div>
  )
}

ImageUploader.defaultProps = {
  thumbnailWidth: '80vw',
  thumbnailHeight: '55vw',
  thumbnailMaxWidth: '600px',
  thumbnailMaxHeight: '450px',
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

const UploadedImageThumbnail = styled.div<{
  width: string
  height: string
  maxWidth: string
  maxHeight: string
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  border: 1px solid grey;
  cursor: pointer;
`
const NoThumbnail = styled.div`
  color: grey;
  padding: 16px;
`

const Overlay = styled.div<{ width: string; maxWidth: string }>`
  position: absolute;
  color: #2c2a2a;
  padding: 16px;
  background-color: rgba(225, 225, 225, 0.5);
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  transform: scale(0.9);
  text-align: center;
`

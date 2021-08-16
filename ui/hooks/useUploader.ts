import { useState } from 'react'

export const useUploader = () => {
  const [image, setImage] = useState<File>()

  const upload = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append('image', image)
    await fetch('/api/user/file/upload', {
      method: 'POST',
      body: formData,
    })
  }

  return {
    setImage,
    upload,
  }
}

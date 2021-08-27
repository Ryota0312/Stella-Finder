import { useState } from 'react'

export const useUploader = () => {
  const [image, setImage] = useState<File>()

  const upload = async () => {
    if (!image) return

    const formData = new FormData()
    formData.append('image', image)
    formData.append('spotId', '1')
    const response = await fetch('/api/user/file/upload', {
      method: 'POST',
      body: formData,
    })
    return response.json()
  }

  return {
    setImage,
    upload,
  }
}

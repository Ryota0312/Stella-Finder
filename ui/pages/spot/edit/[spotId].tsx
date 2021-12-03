import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Layout from '../../../components/layout'
import { ImageUploader } from '../../../components/common/ImageUploader'
import { useApi } from '../../../hooks/useApi'

import 'react-toastify/dist/ReactToastify.css'
import { UnoptimizedImage } from '../../../components/common/UnoptimizedImage'
import { PrefectureSelect } from '../../../components/common/PrefectureSelect'
import { InputField } from '../../../components/common/InputField'
import { useStateWithValidate } from '../../../hooks/useStateWithValidate'
import { TextField } from '../../../components/common/TextField'

const Edit: React.FC = () => {
  const router = useRouter()
  const { spotId } = router.query

  const { fetcher } = useApi()
  const { data, error } = useSWR(['/auth/check', true], fetcher)

  const [name, isNameValid, setName] = useStateWithValidate('', (v) => v !== '')
  const [coverImageKey, setCoverImageKey] = useState<string>('')
  const [postalCode, isPostalCodeValid, setPostalCode] = useStateWithValidate(
    '',
    (v) => {
      const regExp = new RegExp('^[0-9]{3}-?[0-9]{4}$')
      return v === '' || regExp.test(v)
    },
  )
  const [prefecture, isPrefectureValid, setPrefecture] = useStateWithValidate(
    '',
    (v) => v !== '',
  )
  const [address, setAddress] = useState<string>('')
  const [remarks, setRemarks] = useState<string>('')

  const notifyError = (msg: string) => toast.error(msg)

  useEffect(() => {
    fetcher('/api/spots?id=' + spotId, false).then((res) => {
      setName(res.name)
      setCoverImageKey(res.coverImage)
      setPostalCode(res.postalCode)
      setPrefecture(res.prefecture)
      setAddress(res.address)
      setRemarks(res.remarks)
    })
  }, [spotId])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Layout>
      <Head>
        <title>スポット情報編集</title>
      </Head>

      <main>
        <h2>スポット情報編集</h2>
        <InputField
          label="スポット名"
          value={name}
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          isValid={isNameValid}
          validateErrorMsg="必須です"
        />
        <InputField
          label="郵便番号"
          value={postalCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPostalCode(e.target.value)
          }
          isValid={isPostalCodeValid}
          validateErrorMsg="郵便番号の形式が不正です"
        />
        <PrefectureSelect
          label="都道府県"
          required={true}
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          isValid={isPrefectureValid}
          validateErrorMsg="必須です"
        />
        <InputField
          label="住所"
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddress(e.target.value)
          }
        />
        <TextField
          label="その他"
          value={remarks}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setRemarks(e.target.value)
          }
        />
        <p>写真</p>
        <UnoptimizedImage fileKey={coverImageKey} height={'400px'} />
        <ImageUploader
          onSuccess={(res) => {
            setCoverImageKey(res.fileKey)
          }}
        />
        <button
          type={'button'}
          onClick={async () => {
            if (!isNameValid || !isPostalCodeValid || !isPrefectureValid) {
              notifyError('エラーがあります')
              return
            }
            const response = await update_(
              Number(spotId),
              name,
              coverImageKey,
              postalCode,
              prefecture,
              address,
              remarks,
            )
            if (response.ok) {
              await router.push(`/spot/detail/${spotId}#success`)
            } else {
              const json = await response.json()
              notifyError(json.error)
            }
          }}
        >
          更新
        </button>
      </main>
    </Layout>
  )
}
export default Edit

const update_ = async (
  spotId: number,
  spotName: string,
  coverImage: string,
  postalCode: string,
  prefecture: string,
  address: string,
  remarks: string,
) => {
  return await fetch('/api/user/spot/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      spotId: spotId,
      spotName: spotName,
      coverImage: coverImage,
      postalCode: postalCode.replace('-', ''),
      prefecture: prefecture,
      address: address,
      remarks: remarks,
    }),
  })
}

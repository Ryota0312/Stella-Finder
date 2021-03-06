import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Layout from '../../../components/layout'
import { useApi } from '../../../hooks/useApi'

import { PrefectureSelect } from '../../../components/search/PrefectureSelect'
import { InputField } from '../../../components/common/InputField'
import { useStateWithValidate } from '../../../hooks/useStateWithValidate'
import { TextField } from '../../../components/common/TextField'
import { ImageUploader } from '../../../components/common/ImageUploader'
import { Loading } from '../../../components/common/Loading'
import { AddressSearchByPostalCode } from '../../../components/common/AddressSearchByPostalCode'
import { AddressSearchByName } from '../../../components/common/AddressSearchByName'

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
  const [remarks, isRemarksValid, setRemarks] = useStateWithValidate(
    '',
    (v) => v.length <= 1000,
  )

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
  if (!data) return <Loading />

  return (
    <Layout>
      <Head>
        <title>???????????????????????? - {name} | Stella Finder</title>
      </Head>

      <main>
        <h2>????????????????????????</h2>
        <InputField
          label="???????????????"
          value={name}
          required={true}
          onChange={(v) => setName(v)}
          isValid={isNameValid}
          validateErrorMsg="????????????"
        />
        <AddressSearchByName
          name={name}
          onSearch={(name, postalCode, prefecture, address) => {
            // setName(name)
            setPostalCode(postalCode)
            setPrefecture(prefecture)
            setAddress(address)
          }}
        />
        <InputField
          label="????????????"
          value={postalCode}
          onChange={(v) => setPostalCode(v)}
          isValid={isPostalCodeValid}
          validateErrorMsg="????????????????????????????????????"
        />
        <AddressSearchByPostalCode
          postalCode={postalCode}
          onSearch={(pref, addr) => {
            setPrefecture(pref)
            setAddress(addr)
          }}
        />
        <PrefectureSelect
          label="????????????"
          required={true}
          value={prefecture}
          onChange={(v) => setPrefecture(v)}
          isValid={isPrefectureValid}
          validateErrorMsg="????????????"
        />
        <InputField
          label="??????"
          value={address}
          onChange={(v) => setAddress(v)}
        />
        <TextField
          label="?????????"
          value={remarks}
          onChange={(v) => setRemarks(v)}
          isValid={isRemarksValid}
          validateErrorMsg="1000???????????????????????????????????????"
        />
        <p>??????</p>
        <ImageUploader
          initialImageKey={coverImageKey}
          onSuccess={(res) => {
            setCoverImageKey(res.fileKey)
          }}
        />
        <button
          type={'button'}
          onClick={async () => {
            if (
              !isNameValid ||
              !isPostalCodeValid ||
              !isPrefectureValid ||
              !isRemarksValid
            ) {
              notifyError('???????????????????????????????????????')
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
              await router.push(`/spot/${spotId}/show#success`)
            } else {
              const json = await response.json()
              notifyError(json.error)
            }
          }}
        >
          ??????
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

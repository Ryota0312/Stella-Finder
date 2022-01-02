import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useApi } from '../../hooks/useApi'
import { SpotCard } from '../spot/SpotCard'
import { SpotSelectDialog } from '../report/SpotSelectDialog'

type InputSpotIdWithSearchByNameProps = {
  initialSpotId: number
  onSet: (v: number) => void
}

export const InputSpotIdWithSearchByName: React.FC<InputSpotIdWithSearchByNameProps> =
  (props: InputSpotIdWithSearchByNameProps) => {
    const { fetcher } = useApi()
    const router = useRouter()

    const [value, setValue] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [spotList, setSpotList] = useState([])
    const [linkedSpotId, setLinkedSpotId] = useState(0)
    const [isSearchResultNone, setIsSearchResultNone] = useState(false)

    const [isOpenSpotSelectDialog, setIsOpenSpotSelectDialog] = useState(false)

    const isFirstRender = useRef(false)

    useEffect(() => {
      isFirstRender.current = true
    }, [])

    useEffect(() => {
      if (props.initialSpotId) {
        setLinkedSpotId(props.initialSpotId)
      }
    }, [props.initialSpotId])

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false
      } else {
        if (spotList.length > 0) {
          setLinkedSpotId(spotList[0])
          setIsSearchResultNone(false)
        } else {
          setLinkedSpotId(0)
          setIsSearchResultNone(true)
        }
      }
    }, [spotList])

    useEffect(() => props.onSet(linkedSpotId), [linkedSpotId])

    return (
      <>
        <Label>
          <p>スポット名</p>
          <Required>必須</Required>
        </Label>
        <input
          list="spot-name"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <button
          onClick={() => {
            setSearchValue(value)
            fetcher('/api/spot/listByName?spotName=' + value, false).then(
              (res) => {
                setSpotList(res.map((r: any) => r.id))
              },
            )
          }}
        >
          検索して紐付け
        </button>
        {linkedSpotId == 0 && (
          <ValidateError>
            「検索して紐付け」からスポットを紐付けてください
          </ValidateError>
        )}
        <SpotCard
          onClick={() => router.push('/spot/' + linkedSpotId + '/show')}
          spotId={linkedSpotId}
        />
        {spotList.length > 1 && (
          <OtherSearchResult>
            <div>他{spotList.length - 1}件の候補があります</div>
            <button onClick={() => setIsOpenSpotSelectDialog(true)}>
              選択する
            </button>
          </OtherSearchResult>
        )}
        {isSearchResultNone && (
          <>
            <ValidateError>
              「{searchValue}」に一致するスポットはありません
            </ValidateError>
            <button onClick={() => router.push('/spot/register')}>
              <ButtonInnerWithImage>
                <Image
                  src={'/image/add.png'}
                  alt={'Add new spot'}
                  width={20}
                  height={20}
                />
                <div>スポットを登録する</div>
              </ButtonInnerWithImage>
            </button>
          </>
        )}
        <SpotSelectDialog
          isOpen={isOpenSpotSelectDialog}
          closeDialog={() => setIsOpenSpotSelectDialog(false)}
          spotIds={spotList}
          onSelect={(id) => setLinkedSpotId(id)}
        />
      </>
    )
  }

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Required = styled.div`
  background-color: #de2121;
  font-size: 8px;
  color: white;
  border-radius: 4px;
  padding: 2px 4px;
`

const ValidateError = styled.div`
  color: red;
  font-size: 12px;

  @media screen and (max-width: 600px) {
    margin-top: 8px;
  }
`

const OtherSearchResult = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const ButtonInnerWithImage = styled.div`
  display: flex;
  gap: 8px;
  color: gray;
`

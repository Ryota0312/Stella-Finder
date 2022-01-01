import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useApi } from '../../hooks/useApi'
import { SpotCard } from '../spot/SpotCard'
import { SpotSelectDialog } from '../report/SpotSelectDialog'

type InputSpotIdWithSearchByNameProps = {
  onSet: (v: number) => void
}

export const InputSpotIdWithSearchByName: React.FC<InputSpotIdWithSearchByNameProps> =
  (props: InputSpotIdWithSearchByNameProps) => {
    const { fetcher } = useApi()
    const router = useRouter()

    const [value, setValue] = useState('')
    const [spotList, setSpotList] = useState([])
    const [linkedSpotId, setLinkedSpotId] = useState(0)

    const [isOpenSpotSelectDialog, setIsOpenSpotSelectDialog] = useState(false)

    useEffect(() => {
      if (spotList.length > 0) {
        setLinkedSpotId(spotList[0])
      } else {
        setLinkedSpotId(0)
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

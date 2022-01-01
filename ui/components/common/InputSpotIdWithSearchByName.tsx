import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'
import { SpotCard } from '../spot/SpotCard'

type InputSpotIdWithSearchByNameProps = {
  onSet: (v: number) => void
}

export const InputSpotIdWithSearchByName: React.FC<InputSpotIdWithSearchByNameProps> =
  (props: InputSpotIdWithSearchByNameProps) => {
    const { fetcher } = useApi()

    const [value, setValue] = useState('')
    const [spotList, setSpotList] = useState([])
    const [linkedSpotId, setLinkedSpotId] = useState(0)

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
        <SpotCard spotId={linkedSpotId} />
        {spotList.length > 1 && <div>他にも候補があります</div>}
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

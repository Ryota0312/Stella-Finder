import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PrefectureButton } from '../common/PrefectureButton'
import { SpotOrderSelect } from '../common/SpotOrderSelect'

type SearchProps = {
  prefecture: string | null
  order: string
}

export const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const router = useRouter()

  const [prefectures, setPrefectures] = useState<Array<string>>(() => {
    if (!props.prefecture) {
      return []
    } else {
      return String(props.prefecture).split(' ')
    }
  })
  const [orderState, setOrderState] = useState<string>(
    !props.order ? '' : String(props.order),
  )

  useEffect(() => {
    setPrefectures(() => {
      if (!props.prefecture) {
        return []
      } else {
        return String(props.prefecture).split(' ')
      }
    })
  }, [props.prefecture])
  useEffect(() => {
    setOrderState(!props.order ? '' : String(props.order).replace(' ', '+'))
  }, [props.order])

  return (
    <SearchButtons>
      <p>検索条件</p>
      <PrefectureButtonList>
        {prefectures.map((p) => {
          return (
            <PrefectureButton
              key={p}
              prefecture={p}
              onDelete={() =>
                router.push(
                  buildUrl_(
                    prefectures
                      .filter((prefecture) => prefecture !== p)
                      .join('+'),
                    props.order,
                  ),
                )
              }
            />
          )
        })}
      </PrefectureButtonList>
      <SpotOrderSelect
        value={orderState}
        onChange={(e) =>
          router.push(buildUrl_(prefectures.join('+'), e.target.value))
        }
      />
    </SearchButtons>
  )
}

const SearchButtons = styled.div`
  display: grid;
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;

  p {
    margin: 0 0 16px 0;
  }
`

const PrefectureButtonList = styled.div`
  display: inline-block;
`

const buildUrl_ = (
  pref: string | string[] | undefined,
  order: string | string[] | undefined,
) => {
  const params = []
  if (pref) {
    params.push('pref=' + pref)
  }
  if (order) {
    params.push('order=' + order)
  }

  if (params.length === 0) {
    return '/spot/list'
  } else {
    return '/spot/list?' + params.join('&')
  }
}

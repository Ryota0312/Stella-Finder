import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PrefectureButton } from '../common/PrefectureButton'
import { SpotOrderSelect } from '../common/SpotOrderSelect'
import { PrefectureSelect } from '../common/PrefectureSelect'

type SearchProps = {
  prefecture: string | null
  order: string
}

export const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const router = useRouter()

  const [addPref, setAddPref] = useState(false)

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
      <Title>検索条件</Title>
      <PrefectureCondition>
        <p>都道府県</p>
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
        {addPref && (
          <PrefectureSelectWrapper>
            <PrefectureSelect
              label="都道府県を追加"
              onChange={(v) => {
                if (v != '') {
                  router.push(
                    buildUrl_(prefectures.concat(v).join('+'), props.order),
                  )
                }
              }}
            />
          </PrefectureSelectWrapper>
        )}
        <button onClick={() => setAddPref(true)}>+</button>
      </PrefectureCondition>
      <SortConditions>
        <SpotOrderSelect
          value={orderState}
          onChange={(e) =>
            router.push(buildUrl_(prefectures.join('+'), e.target.value))
          }
        />
      </SortConditions>
    </SearchButtons>
  )
}

const Title = styled.p`
  font-weight: bold;
`

const SearchButtons = styled.div`
  display: grid;
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;

  p {
    margin: 0 0 16px 0;
  }
`

const PrefectureCondition = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0 8px 8px 8px;
  margin-bottom: 16px;
`

const PrefectureButtonList = styled.div`
  display: inline-block;
`

const PrefectureSelectWrapper = styled.div`
  select {
    @media screen and (max-width: 600px) {
      width: 60vw;
    }
  }
`

const SortConditions = styled.div`
  padding: 0 8px;
  margin-bottom: 16px;
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

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PrefectureButton } from '../common/PrefectureButton'
import { SpotOrderSelect } from '../common/SpotOrderSelect'
import { PrefectureSelect } from '../common/PrefectureSelect'
import { StarEvaluator } from '../common/StarEvaluator'
import { InputField } from '../common/InputField'

export const Search: React.FC = () => {
  const router = useRouter()

  const [addPref, setAddPref] = useState(false)

  const [name, setName] = useState('')
  const [prefectures, setPrefectures] = useState<Array<string>>([])
  const [order, setOrder] = useState('')
  const [total, setTotal] = useState(0)
  const [darkness, setDarkness] = useState(0)
  const [view, setView] = useState(0)
  const [safety, setSafety] = useState(0)

  return (
    <SearchButtons>
      <Title>詳細検索</Title>
      <NameConditions>
        <InputField
          label="スポット名"
          value={name}
          onChange={(v) => setName(v)}
        />
      </NameConditions>
      <PrefectureCondition>
        <p>都道府県</p>
        <PrefectureButtonList>
          {prefectures.map((p) => {
            return (
              <PrefectureButton
                key={p}
                prefecture={p}
                onDelete={() =>
                  setPrefectures(prefectures.filter((pref) => p !== pref))
                }
              />
            )
          })}
          {prefectures.length === 0 && (
            <PrefectureEmptyMsg>すべての都道府県</PrefectureEmptyMsg>
          )}
        </PrefectureButtonList>
        {addPref && (
          <PrefectureSelectWrapper>
            <PrefectureSelect
              onChange={(v) => {
                setPrefectures(prefectures.concat(v))
                setAddPref(false)
              }}
            />
          </PrefectureSelectWrapper>
        )}
        <button onClick={() => setAddPref(true)}>+</button>
      </PrefectureCondition>
      <PointConditions>
        <StarEvaluator label="総合評価" onChange={(v) => setTotal(v)} />
        以上
      </PointConditions>
      <SortConditions>
        <SpotOrderSelect
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </SortConditions>
      <button
        onClick={() =>
          router.push(buildUrl_(name, prefectures.join('+'), total, order))
        }
      >
        検索
      </button>
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

const NameConditions = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0 8px 8px 8px;
  margin-bottom: 16px;

  input {
    @media screen and (max-width: 600px) {
      width: 60vw;
    }
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

const PrefectureEmptyMsg = styled.div`
  margin: 0 8px 8px 0;
`

const PrefectureSelectWrapper = styled.div`
  select {
    @media screen and (max-width: 600px) {
      width: 60vw;
    }
  }
`

const PointConditions = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0 8px 8px 8px;
  margin-bottom: 16px;
`

const SortConditions = styled.div`
  padding: 0 8px;
  margin-bottom: 16px;
`

const buildUrl_ = (
  name: string,
  pref: string,
  total: number,
  order: string,
) => {
  const params = []
  if (name) {
    params.push('name=' + name)
  }
  if (pref) {
    params.push('pref=' + pref)
  }
  if (total > 0) {
    params.push('total=' + total)
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

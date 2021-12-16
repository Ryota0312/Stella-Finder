import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PrefectureButton } from '../search/PrefectureButton'
import { SpotOrderSelect } from '../search/SpotOrderSelect'
import { PrefectureSelect } from '../search/PrefectureSelect'
import { StarEvaluator } from '../common/StarEvaluator'
import { InputField } from '../common/InputField'

type SearchProps = {
  name?: string
  prefectures?: Array<string>
  order?: string
  total?: number
  darkness?: number
  view?: number
  safety?: number
}

export const SearchWidget: React.FC<SearchProps> = (props) => {
  const router = useRouter()

  const [addPref, setAddPref] = useState(false)

  const [name, setName] = useState(props.name ? props.name : '')
  const [prefectures, setPrefectures] = useState<Array<string>>(
    props.prefectures ? props.prefectures : [],
  )
  const [order, setOrder] = useState(props.order ? props.order : '')
  const [total, setTotal] = useState(props.total ? props.total : 0)
  const [darkness, setDarkness] = useState(props.darkness ? props.darkness : 0)
  const [view, setView] = useState(props.view ? props.view : 0)
  const [safety, setSafety] = useState(props.safety ? props.safety : 0)

  return (
    <SearchButtons>
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
      <p style={{ marginLeft: '8px' }}>評価 (指定された値以上を検索)</p>
      <PointConditions>
        <PointInput>
          <StarEvaluator
            label="総合評価"
            value={total}
            size={24}
            onChange={(v) => setTotal(v)}
          />
          <button onClick={() => setTotal(0)}>リセット</button>
        </PointInput>
        <PointInput>
          <StarEvaluator
            label="空の暗さ"
            value={darkness}
            size={24}
            onChange={(v) => setDarkness(v)}
          />
          <button onClick={() => setDarkness(0)}>リセット</button>
        </PointInput>
        <PointInput>
          <StarEvaluator
            label="見晴らし"
            value={view}
            size={24}
            onChange={(v) => setView(v)}
          />
          <button onClick={() => setView(0)}>リセット</button>
        </PointInput>
        <PointInput>
          <StarEvaluator
            label="安全性"
            value={safety}
            size={24}
            onChange={(v) => setSafety(v)}
          />
          <button onClick={() => setSafety(0)}>リセット</button>
        </PointInput>
      </PointConditions>
      <SortConditions>
        <SpotOrderSelect
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
      </SortConditions>
      <button
        onClick={() =>
          router.push(
            buildUrl_(
              name,
              prefectures.join('+'),
              total,
              darkness,
              view,
              safety,
              order,
            ),
          )
        }
      >
        検索
      </button>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #ccc;
  padding: 0 8px 8px 8px;
  margin-bottom: 16px;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const PointInput = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  button {
    font-size: 10px;
  }
`

const SortConditions = styled.div`
  padding: 0 8px;
  margin-bottom: 16px;
`

const buildUrl_ = (
  name: string,
  pref: string,
  total: number,
  darkness: number,
  view: number,
  safety: number,
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
  if (darkness > 0) {
    params.push('darkness=' + darkness)
  }
  if (view > 0) {
    params.push('view=' + view)
  }
  if (safety > 0) {
    params.push('safety=' + safety)
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

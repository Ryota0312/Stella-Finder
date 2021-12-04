import React from 'react'
import styled from 'styled-components'

type PrefectureSelectProps = {
  label?: string
  required?: boolean
  onChange: (v: string) => void
  value?: string
  isValid?: boolean
  validateErrorMsg?: string
}

export const PrefectureSelect: React.FC<PrefectureSelectProps> = (
  props: PrefectureSelectProps,
) => {
  const prefectures = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ]
  return (
    <>
      <Label>
        {!!props.label && <p>{props.label}</p>}
        {props.required && <Required>必須</Required>}
      </Label>
      <SelectAndError>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          name="pref_name"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            props.onChange(e.target.value)
          }
          value={props.value}
        >
          <option value="">都道府県</option>
          {prefectures.map((prefecture) => (
            <option key={prefecture} value={prefecture}>
              {prefecture}
            </option>
          ))}
        </select>
        {!props.isValid && (
          <ValidateError>{props.validateErrorMsg}</ValidateError>
        )}
      </SelectAndError>
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

const SelectAndError = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media screen and (max-width: 600px) {
    display: inline-block;
  }
`

const ValidateError = styled.div`
  color: red;
  font-size: 12px;

  @media screen and (max-width: 600px) {
    margin-top: 8px;
  }
`

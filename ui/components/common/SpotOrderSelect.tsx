import React from 'react'
import styled from 'styled-components'

type SpotOrderSelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string
}

type OrderKey = {
  key: string
  displayValue: string
}

export const SpotOrderSelect: React.FC<SpotOrderSelectProps> = (
  props: SpotOrderSelectProps,
) => {
  const orders = [
    { key: 'avg_total_point+desc', displayValue: '総合評価が高い順' },
    { key: 'avg_total_point+asc', displayValue: '総合評価が低い順' },
    { key: 'review_count+desc', displayValue: '口コミが多い順' },
    { key: 'review_count+asc', displayValue: '口コミが少ない順' },
  ] as Array<OrderKey>

  return (
    // FIXME: eslint
    // eslint-disable-next-line jsx-a11y/no-onchange
    <StyledSpotOrderSelect
      name="spot_order"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => props.onChange(e)}
      value={props.value}
    >
      <option value="">並び替え</option>
      {orders.map((order) => (
        <option key={order.key} value={order.key}>
          {order.displayValue}
        </option>
      ))}
    </StyledSpotOrderSelect>
  )
}

const StyledSpotOrderSelect = styled.select`
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`

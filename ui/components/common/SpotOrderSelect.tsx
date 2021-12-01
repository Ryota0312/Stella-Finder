import React from 'react'

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
  ] as Array<OrderKey>

  return (
    // FIXME: eslint
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
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
    </select>
  )
}

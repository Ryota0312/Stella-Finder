import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

export type AddressSearchByNameProps = {
  name: string
  onSearch: (
    name: string,
    postalCode: string,
    prefecture: string,
    address: string,
  ) => void
}

export const AddressSearchByName: React.FC<AddressSearchByNameProps> = (
  props: AddressSearchByNameProps,
) => {
  const { fetcher } = useApi()

  return (
    <button
      onClick={() => {
        fetcher('/api/user/location/search?name=' + props.name, false).then(
          (res) => {
            props.onSearch(
              res.name,
              res.postalCode,
              res.prefecture,
              res.address,
            )
          },
        )
      }}
    >
      住所を検索
    </button>
  )
}

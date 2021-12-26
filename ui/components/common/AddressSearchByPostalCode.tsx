import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

export type AddressSearchByPostalCodeProps = {
  postalCode: string
  onSearch: (prefecture: string, address: string) => void
}

export const AddressSearchByPostalCode: React.FC<AddressSearchByPostalCodeProps> =
  (props: AddressSearchByPostalCodeProps) => {
    const { fetcher } = useApi()

    return (
      <button
        onClick={() => {
          fetcher(
            'https://zipcloud.ibsnet.co.jp/api/search?zipcode=' +
              props.postalCode,
            false,
          ).then((res) => {
            if (res.results) {
              props.onSearch(
                res.results[0].address1,
                res.results[0].address2 + res.results[0].address3,
              )
            }
          })
        }}
      >
        住所を検索
      </button>
    )
  }

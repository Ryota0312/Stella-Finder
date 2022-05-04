import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

type TwitterCardProps = {
  card?: string
  site?: string
  title: string
  description: string
  image: string
}

export const TwitterCard: React.FC<TwitterCardProps> = (
  props: TwitterCardProps,
) => {
  return (
    <>
      <meta name="twitter:card" content={props.card} />
      <meta name="twitter:site" content={props.site} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </>
  )
}

TwitterCard.defaultProps = {
  card: 'summary',
  site: '@stella_finder',
}

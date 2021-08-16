import React from 'react'
import styled from 'styled-components'

export interface GridListItemData {
  title: string
}

export const GridList: React.FC<{ data: GridListItemData[] }> = ({ data }) => {
  return (
    <GridLayout>
      {data.map((d: GridListItemData) => {
        return <li key={d.title}>{d.title}</li>
      })}
    </GridLayout>
  )
}

const GridLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

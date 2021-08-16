import React from 'react'
import styled from 'styled-components'

export interface GridListItemData {
  title: string
}

export const GridList: React.FC<{ data: GridListItemData[] }> = ({ data }) => {
  return (
    <GridLayout>
      {data.map((d: GridListItemData) => {
        return <GridItem key={d.title}>{d.title}</GridItem>
      })}
    </GridLayout>
  )
}

const GridLayout = styled.ul`
  display: grid;
  padding: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`

const GridItem = styled.li`
  list-style-type: none;
  border: solid 2px gray;
  border-radius: 8px;
  padding: 8px;
`

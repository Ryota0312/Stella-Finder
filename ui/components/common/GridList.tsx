import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { UnoptimizedImage } from './UnoptimizedImage'
import { StarEvaluate } from './StarEvaluate'

export interface GridListItemData {
  id: number
  title: string
  coverImage: string
  avgTotalPoint: number
  reviewCount: number
}

export const GridList: React.FC<{ data: GridListItemData[]; link: string }> = ({
  data,
  link,
}) => {
  return (
    <GridLayout>
      {data.map((d: GridListItemData) => {
        return (
          <GridItem key={d.title}>
            <Link href={'/' + link + '/' + d.id} passHref>
              <a>
                <UnoptimizedImage
                  fileKey={d.coverImage}
                  height={'200px'}
                  objectFit={'cover'}
                />
                {d.title}
                <StarEvaluate
                  point={d.avgTotalPoint}
                  showPoint={true}
                  reviewCount={d.reviewCount}
                />
              </a>
            </Link>
          </GridItem>
        )
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

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const GridItem = styled.li`
  list-style-type: none;
  border: solid 2px gray;
  border-radius: 8px;
  padding: 8px;

  &:hover,
  &:focus-within {
    cursor: pointer;
    border: solid 2px #ffa216;
  }
`

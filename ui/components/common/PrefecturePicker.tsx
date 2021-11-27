import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

export const PrefecturePicker: React.FC = () => {
  return (
    <Map>
      <Image
        src="/image/prefecture-selector-background.png"
        width={546}
        height={506}
        alt="Prefecture picker"
      />
      <HokkaidoTohokuButton>北海道・東北</HokkaidoTohokuButton>
      <KantoButton>関東</KantoButton>
      <ChubuButton>中部</ChubuButton>
      <KinkiButton>近畿</KinkiButton>
      <ChugokuShikokuButton>中国・四国</ChugokuShikokuButton>
      <KyusyuOkinawaButton>九州。沖縄</KyusyuOkinawaButton>
    </Map>
  )
}

const Map = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  display: table;

  img {
    max-width: 100%;
    height: auto;
    border: 0;
    -webkit-backface-visibility: hidden;
  }
`

const AreaButton = styled.button`
  position: absolute;
  z-index: 1;
  box-sizing: border-box;
  cursor: pointer;
  border: 3px solid #333333;
  border-radius: 5px;
  background-color: #fff;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: 480px) {
    font-size: 3vw;
  }
`

const HokkaidoTohokuButton = styled(AreaButton)`
  top: 30%;
  right: 0;
  width: 30%;
`

const KantoButton = styled(AreaButton)`
  top: 58%;
  right: 11%;
  width: 13%;
`

const ChubuButton = styled(AreaButton)`
  top: 56%;
  right: 27.5%;
  width: 13%;
`

const KinkiButton = styled(AreaButton)`
  top: 65%;
  right: 44%;
  width: 13%;
`

const ChugokuShikokuButton = styled(AreaButton)`
  top: 52%;
  left: 20%;
  width: 25%;
`

const KyusyuOkinawaButton = styled(AreaButton)`
  top: 70%;
  left: 0;
  width: 25%;
`

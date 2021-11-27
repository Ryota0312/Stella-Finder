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
      <HokkaidoButton>北海道</HokkaidoButton>
      <TohokuButton>東北</TohokuButton>
      <KantoButton>関東</KantoButton>
      <HokurikuButton>北陸</HokurikuButton>
      <ChubuButton>中部</ChubuButton>
      <KinkiButton>近畿</KinkiButton>
      <ChugokuButton>中国</ChugokuButton>
      <ShikokuButton>四国</ShikokuButton>
      <KyusyuButton>九州</KyusyuButton>
      <OkinawaButton>沖縄</OkinawaButton>
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
  height: 8%;
  line-height: 1em;

  @media screen and (max-width: 480px) {
    font-size: 3vw;
  }
`

const HokkaidoButton = styled(AreaButton)`
  top: 2%;
  right: 5%;
  width: 18%;
`

const TohokuButton = styled(AreaButton)`
  top: 31%;
  right: 11%;
  width: 13%;
`

const KantoButton = styled(AreaButton)`
  top: 58%;
  right: 11%;
  width: 13%;
`

const HokurikuButton = styled(AreaButton)`
  top: 43%;
  right: 36%;
  width: 13%;
`

const ChubuButton = styled(AreaButton)`
  top: 60%;
  right: 28%;
  width: 13%;
`

const KinkiButton = styled(AreaButton)`
  top: 65%;
  right: 44%;
  width: 13%;
`

const ChugokuButton = styled(AreaButton)`
  top: 52%;
  left: 26%;
  width: 13%;
`

const ShikokuButton = styled(AreaButton)`
  top: 74%;
  left: 27%;
  width: 13%;
`

const KyusyuButton = styled(AreaButton)`
  top: 65%;
  left: 6%;
  width: 13%;
`

const OkinawaButton = styled(AreaButton)`
  top: 89%;
  left: 0;
  width: 13%;
`

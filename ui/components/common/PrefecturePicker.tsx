import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export const PrefecturePicker: React.FC = () => {
  const router = useRouter()

  return (
    <Map>
      <Image
        src="/image/prefecture-selector-background.png"
        width={546}
        height={506}
        alt="Prefecture picker"
      />
      <HokkaidoButton onClick={() => router.push('/spot/list?pref=hokkaido')}>
        北海道
      </HokkaidoButton>
      <TohokuButton
        onClick={() =>
          router.push(
            '/spot/list?pref=aomori+iwate+akita+miyagi+yamagata+fukushima',
          )
        }
      >
        東北
      </TohokuButton>
      <KantoButton
        onClick={() =>
          router.push(
            'spot/list?pref=ibaraki+tochigi+gunma+saitama+chiba+kanagawa+tokyo',
          )
        }
      >
        関東
      </KantoButton>
      <HokurikuButton
        onClick={() =>
          router.push('spot/list?pref=nigata+toyama+ishikawa+fukui')
        }
      >
        北陸
      </HokurikuButton>
      <ChubuButton
        onClick={() =>
          router.push('spot/list?pref=yamanashi+nagano+gifu+shizuoka+aichi')
        }
      >
        中部
      </ChubuButton>
      <KinkiButton
        onClick={() =>
          router.push(
            'spot/list?pref=mie+shiga+kyoto+osaka+hyogo+nara+wakayama',
          )
        }
      >
        近畿
      </KinkiButton>
      <ChugokuButton
        onClick={() =>
          router.push(
            'spot/list?pref=tottori+shimane+okayama+hiroshima+yamaguchi',
          )
        }
      >
        中国
      </ChugokuButton>
      <ShikokuButton
        onClick={() =>
          router.push('spot/list?pref=tokushima+kagawa+ehime+kochi')
        }
      >
        四国
      </ShikokuButton>
      <KyusyuButton
        onClick={() =>
          router.push(
            'spot/list?pref=fukuoka+saga+nagasaki+kumamoto+oita+miyazaki+kagoshima',
          )
        }
      >
        九州
      </KyusyuButton>
      <OkinawaButton onClick={() => router.push('spot/list?pref=okinawa')}>
        沖縄
      </OkinawaButton>
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

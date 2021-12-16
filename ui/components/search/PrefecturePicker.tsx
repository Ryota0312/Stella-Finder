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
      <HokkaidoButton onClick={() => router.push('/spot/list?pref=北海道')}>
        北海道
      </HokkaidoButton>
      <TohokuButton
        onClick={() =>
          router.push(
            '/spot/list?pref=青森県+岩手県+秋田県+宮城県+山形県+福島県',
          )
        }
      >
        東北
      </TohokuButton>
      <KantoButton
        onClick={() =>
          router.push(
            '/spot/list?pref=茨城県+栃木県+群馬県+埼玉県+千葉県+神奈川県+東京都',
          )
        }
      >
        関東
      </KantoButton>
      <HokurikuButton
        onClick={() =>
          router.push('/spot/list?pref=新潟県+富山県+石川県+福井県')
        }
      >
        北陸
      </HokurikuButton>
      <ChubuButton
        onClick={() =>
          router.push('/spot/list?pref=山梨県+長野県+岐阜県+静岡県+愛知県')
        }
      >
        中部
      </ChubuButton>
      <KinkiButton
        onClick={() =>
          router.push(
            '/spot/list?pref=三重県+滋賀県+京都府+大阪府+兵庫県+奈良県+和歌山県',
          )
        }
      >
        近畿
      </KinkiButton>
      <ChugokuButton
        onClick={() =>
          router.push('/spot/list?pref=鳥取県+島根県+岡山県+広島県+山口県')
        }
      >
        中国
      </ChugokuButton>
      <ShikokuButton
        onClick={() =>
          router.push('/spot/list?pref=徳島県+香川県+愛媛県+高知県')
        }
      >
        四国
      </ShikokuButton>
      <KyusyuButton
        onClick={() =>
          router.push(
            '/spot/list?pref=福岡県+佐賀県+長崎県+熊本県+大分県+宮崎県+鹿児島県',
          )
        }
      >
        九州
      </KyusyuButton>
      <OkinawaButton onClick={() => router.push('/spot/list?pref=沖縄県')}>
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

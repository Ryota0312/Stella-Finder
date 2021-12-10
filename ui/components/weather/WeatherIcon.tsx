import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

type WeatherIconProps = {
  icon: string
}

export const WeatherIcon: React.FC<WeatherIconProps> = (
  props: WeatherIconProps,
) => {
  return (
    <>
      {props.icon.startsWith('01') && (
        <Icon>
          <Image
            src="/image/weather/sunny.png"
            alt="sunny"
            width={64}
            height={64}
          />
        </Icon>
      )}
      {props.icon.startsWith('02') && (
        <Icon>
          <IconBack>
            <Image
              src="/image/weather/sunny.png"
              alt="sunny"
              width={48}
              height={48}
            />
          </IconBack>
          <IconFront>
            <Image
              src="/image/weather/cloud.png"
              alt="sunny"
              width={48}
              height={48}
            />
          </IconFront>
        </Icon>
      )}
      {props.icon.startsWith('03') && (
        <Icon>
          <Image
            src="/image/weather/cloud.png"
            alt="sunny"
            width={64}
            height={64}
          />
        </Icon>
      )}
      {props.icon.startsWith('04') && (
        <Icon>
          <Image
            src="/image/weather/heavy_cloud.png"
            alt="sunny"
            width={64}
            height={64}
          />
        </Icon>
      )}
      {props.icon.startsWith('09') && (
        <Icon>
          <Image
            src="/image/weather/rain.png"
            alt="sunny"
            width={64}
            height={64}
          />
        </Icon>
      )}
      {props.icon.startsWith('10') && (
        <Icon>
          <IconBack>
            <Image
              src="/image/weather/sunny.png"
              alt="sunny"
              width={40}
              height={40}
            />
          </IconBack>
          <IconFront>
            <Image
              src="/image/weather/rain.png"
              alt="sunny"
              width={48}
              height={48}
            />
          </IconFront>
        </Icon>
      )}
      {props.icon.startsWith('11') && (
        <Icon>
          <Image
            src="/image/weather/thunder.png"
            alt="sunny"
            width={64}
            height={64}
          />
        </Icon>
      )}
      {props.icon.startsWith('13') && (
        <Icon>
          <Image
            src="/image/weather/snow.png"
            alt="sunny"
            width={64}
            height={64}
          />
        </Icon>
      )}
      {props.icon.startsWith('50') && (
        <Icon>
          <IconBack>
            <Image
              src="/image/weather/mist.png"
              alt="sunny"
              width={56}
              height={56}
            />
          </IconBack>
          <IconFront>
            <div style={{ color: 'gray', fontWeight: 'bold' }}>霧</div>
          </IconFront>
        </Icon>
      )}
    </>
  )
}

const Icon = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`

const IconBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const IconFront = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

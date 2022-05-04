import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

type WeatherIconProps = {
  icon: string
  scale?: number
}

export const WeatherIcon: React.FC<WeatherIconProps> = (
  props: WeatherIconProps,
) => {
  return (
    <>
      {props.icon.startsWith('01') && (
        <Icon scale={props.scale as number}>
          <Image
            src="/image/weather/sunny.png"
            alt="sunny"
            width={64 * (props.scale as number)}
            height={64 * (props.scale as number)}
          />
        </Icon>
      )}
      {props.icon.startsWith('02') && (
        <Icon scale={props.scale as number}>
          <IconBack>
            <Image
              src="/image/weather/sunny.png"
              alt="sunny"
              width={48 * (props.scale as number)}
              height={48 * (props.scale as number)}
            />
          </IconBack>
          <IconFront>
            <Image
              src="/image/weather/cloud.png"
              alt="sunny"
              width={48 * (props.scale as number)}
              height={48 * (props.scale as number)}
            />
          </IconFront>
        </Icon>
      )}
      {props.icon.startsWith('03') && (
        <Icon scale={props.scale as number}>
          <Image
            src="/image/weather/cloud.png"
            alt="sunny"
            width={64 * (props.scale as number)}
            height={64 * (props.scale as number)}
          />
        </Icon>
      )}
      {props.icon.startsWith('04') && (
        <Icon scale={props.scale as number}>
          <Image
            src="/image/weather/heavy_cloud.png"
            alt="sunny"
            width={64 * (props.scale as number)}
            height={64 * (props.scale as number)}
          />
        </Icon>
      )}
      {props.icon.startsWith('09') && (
        <Icon scale={props.scale as number}>
          <Image
            src="/image/weather/rain.png"
            alt="sunny"
            width={64 * (props.scale as number)}
            height={64 * (props.scale as number)}
          />
        </Icon>
      )}
      {props.icon.startsWith('10') && (
        <Icon scale={props.scale as number}>
          <IconBack>
            <Image
              src="/image/weather/sunny.png"
              alt="sunny"
              width={40 * (props.scale as number)}
              height={40 * (props.scale as number)}
            />
          </IconBack>
          <IconFront>
            <Image
              src="/image/weather/rain.png"
              alt="sunny"
              width={48 * (props.scale as number)}
              height={48 * (props.scale as number)}
            />
          </IconFront>
        </Icon>
      )}
      {props.icon.startsWith('11') && (
        <Icon scale={props.scale as number}>
          <Image
            src="/image/weather/thunder.png"
            alt="sunny"
            width={64 * (props.scale as number)}
            height={64 * (props.scale as number)}
          />
        </Icon>
      )}
      {props.icon.startsWith('13') && (
        <Icon scale={props.scale as number}>
          <Image
            src="/image/weather/snow.png"
            alt="sunny"
            width={64 * (props.scale as number)}
            height={64 * (props.scale as number)}
          />
        </Icon>
      )}
      {props.icon.startsWith('50') && (
        <Icon scale={props.scale as number}>
          <IconBack>
            <Image
              src="/image/weather/mist.png"
              alt="sunny"
              width={56 * (props.scale as number)}
              height={56 * (props.scale as number)}
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

WeatherIcon.defaultProps = {
  scale: 1,
}

interface IconScale {
  scale: number
}

const Icon = styled.div<IconScale>`
  position: relative;
  width: ${({ scale }) => 64 * scale}px;
  height: ${({ scale }) => 64 * scale}px;
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

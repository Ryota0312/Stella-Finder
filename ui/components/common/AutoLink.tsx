import React from 'react'
import Linkify from 'linkify-react'

export type AdminUserOnlyProps = {
  children: React.ReactNode
}

export const AutoLink: React.FC<AdminUserOnlyProps> = (
  props: AdminUserOnlyProps,
) => {
  const linkifyOptions = {
    target: {
      url: '_blank',
    },
  }

  return <Linkify options={linkifyOptions}>{props.children}</Linkify>
}

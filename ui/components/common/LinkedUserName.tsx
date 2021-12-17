import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export type LinkedUserNameProps = {
  userId: number
}

export const LinkedUserName: React.FC<LinkedUserNameProps> = (
  props: LinkedUserNameProps,
) => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getUserNameById_(props.userId).then((name) => setUserName(name))
  }, [props.userId])

  return <Link href={'/user/profile/' + props.userId}>{userName}</Link>
}

const getUserNameById_ = async (id: number) => {
  const response = await fetch('/api/profile?id=' + id)
  const json = await response.json()
  return json.name
}

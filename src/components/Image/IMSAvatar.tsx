import { ImgHTMLAttributes, SyntheticEvent } from 'react'
import styled from 'styled-components'

import { DefaultAvatar } from '@/assets'

interface IIMSAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt?: string
}

const Avatar = styled("img")({
  width: 40,
  height: 40,
  borderRadius: "50%",
  objectFit: "cover",
})

const IMSAvatar = ({ src, alt = "", ...props }: IIMSAvatarProps) => {
  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DefaultAvatar
  }

  return (
    <Avatar
      src={src || DefaultAvatar}
      alt={alt}
      onError={handleImgError}
      { ...props }
    />
  )
}

export default IMSAvatar

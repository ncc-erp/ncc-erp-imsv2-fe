import NoImageAvailable from "@/assets/images/no_image_available.svg"
import NoImageAvailableRectangle from "@/assets/images/no_image_available_rectangle.svg"
import { CardMedia, CardMediaProps } from "@mui/material"
import { useEffect, useMemo, useState } from "react"

interface IIMSImageProps extends CardMediaProps<"img"> {
  mode?: "circle" | "square" | "rectangle"
}

export const AlbumIMSImage = ({ src, mode, ...props }: IIMSImageProps) => {
  const noImageUrl = useMemo(() => {
    switch (mode) {
      case "circle":
        return NoImageAvailable
      case "square":
        return NoImageAvailable
      default:
        return NoImageAvailableRectangle
    }
  }, [mode])
  const [isFailed, setIsFailed] = useState(false)
  const [imageSrc, setImageSrc] = useState(() => src || noImageUrl)

  useEffect(() => {
    !!src && setImageSrc(src)
    setIsFailed(false)
  }, [src])

  const imageComponent = useMemo(() => {
    if (isFailed) {
      return <CardMedia {...props} component="img" src={noImageUrl} />
    }

    return (
      <CardMedia
        {...props}
        component="img"
        src={imageSrc}
        onError={() => setIsFailed(true)}
      />
    )
  }, [isFailed, imageSrc])

  return imageComponent
}

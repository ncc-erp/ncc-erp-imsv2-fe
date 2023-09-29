import { Typography, TypographyProps } from '@mui/material'

const NoItemFound = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      mt={2}
      mx={2}
      fontSize={16}
      { ...props }
    >
      No items found.
    </Typography>
  )
}

export default NoItemFound

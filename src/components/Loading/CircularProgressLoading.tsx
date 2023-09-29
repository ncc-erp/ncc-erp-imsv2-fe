import { Box, CircularProgress } from "@mui/material"

export interface ICircularProgressLoadingProps {
  size?: number
}

export function CircularProgressLoading({
  size = 40,
}: ICircularProgressLoadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: "12px",
      }}
    >
      <CircularProgress size={size} />
    </Box>
  )
}

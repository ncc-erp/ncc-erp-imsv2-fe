import { getTopUserUnlock } from "@/api/apiTimeSheet"
import { Box, Typography, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import gif from "@/assets/images/pngkey.com-money-emoji-png-142637.png"
export default function WidgetTotalUnlockTimeSheet() {
  const [totalAmount, setTotalAmount] = useState<number>(0)
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTopUserUnlock()
      setTotalAmount(res.totalAmount)
    }
    fetchData()
  }, [])
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={1}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={gif} width={"32"} height={"32"} alt="gif" />
        </Box>
        <Typography fontWeight={600} fontSize={24} color={"#b24747"}>
          {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
        </Typography>
      </Stack>
    </Box>
  )
}

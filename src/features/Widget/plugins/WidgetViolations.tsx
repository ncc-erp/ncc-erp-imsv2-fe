import React from "react"
import { styled } from "@mui/material/styles"
import { Box, BoxProps } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getDateByFormat } from "@/utils/time"
import { TimeFormat } from "@/enums/times";

const fakeViolationsCount = {
  count: 100
}

const ViolationsContent = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}))

const HightlightSpan = styled(Box)<BoxProps & {component: React.ElementType}>({
  color: 'red',
  fontWeight: 500
})

const Violations = () => {
  return (
      <ViolationsContent>
        <CalendarMonthIcon />
        <Box sx={{fontSize: '15px'}}>
          <Box>Ngày <HightlightSpan component='span'>{getDateByFormat(new Date(), TimeFormat.DDMMYYYY)}</HightlightSpan></Box>
          <Box><HightlightSpan component='span'>{fakeViolationsCount.count}</HightlightSpan> người vi phạm</Box>
        </Box>
      </ViolationsContent>
  )
}

export default Violations

import React from "react"
import { styled } from "@mui/system"
import { Box, Typography } from "@mui/material"
import { MedalGold, MedalSilver, MedalBronze } from "@/assets"
import { ITopUnlock } from "@/types/topUnlock"
import IMSImage from "@/components/Image/IMSImage"

const UserWrapper = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px"
})

const StyledBadge = styled(Box)({
  minWidth: "40px",
  height: "40px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  fontSize: "1rem"
})

const StyledIMSImage = styled(IMSImage)({
  objectFit: 'contain',
})

interface ITopUser {
  user: ITopUnlock
}

const calculateBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return <StyledIMSImage src={MedalGold} />
    case 2:
      return <StyledIMSImage src={MedalSilver} sx={{width: '85%'}}/>
    case 3:
      return <StyledIMSImage src={MedalBronze} sx={{width: '60%'}} />
    default:
      return rank
  }
}

export const TopUser = ({user: {fullName, rank, amount}}: ITopUser) => {
  const Badge = calculateBadge(rank)
  return (
    <UserWrapper>
      <StyledBadge>{Badge}</StyledBadge>
      <Box sx={{ width: '100%'}}>
        <Typography component="h2" 
          sx={{fontSize: '1rem', fontWeight: '500'}}>
            {fullName}
        </Typography>
        <Typography sx={{fontSize: '0.9rem'}}>
          {amount.toLocaleString("de-DE")}
        </Typography>
      </Box>
    </UserWrapper>
  )
}

import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/system"
import { timesheetApi } from "@/api"
import { ITopUnlock } from "@/types/topUnlock"
import { TopUser } from "@/features/TopUnlock/components/TopUser"

const TopUnlockWrapper = styled(Box)({
  display: "flex",
  flexDirection: 'column',
  gap: "3px"
})

const TopUnlock = (): JSX.Element | null => {
  const [topFiveUnlock, setTopFiveUnlock] = useState<ITopUnlock[]>([])

  useEffect(() => {
    const fetchTopUnblock = async () => {
      const data = await timesheetApi.getTopUserUnlock()
      setTopFiveUnlock(data.listUnlock?.slice(0, 5))
    }
    fetchTopUnblock()
  }, [])
  return topFiveUnlock.length ? (
    <TopUnlockWrapper>
      {topFiveUnlock.map((user) => (
        <TopUser key={user.rank} user={user} />
      ))}
    </TopUnlockWrapper>
  ) : null
}

export default TopUnlock

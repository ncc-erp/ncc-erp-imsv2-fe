/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  postUnlockApproveTimeSheet,
  postUnlockLogTimesheet,
  getLockedTimesheets
} from "@/api/apiTimeSheet"
import {
  Modal,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import toast from "@/utils/toast"
import { amber, green, red } from "@mui/material/colors"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import React, { useState, useEffect } from "react"
import { UserType } from "@/enums/unlockTimeSheet"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import theme from "@/themes"

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  modalContent: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderWidth: "1px 0",
  }
}))

interface ILockedTimesheet {
  startDate: string,
  endDate: string,
  day: string[]
}

interface ILockedTimesheetRespone {
  isPM: boolean,
  amount: number,
  amountPM: number,
  lockedEmployee: ILockedTimesheet[],
  firstDateCanLogIfUnlock: string,
  isUnlockApprove: boolean,
  isUnlockLog: boolean
}

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  firstDayOfLastWeek: string
}
export default function PenaltyFundModal(props: Props) {
  const { isStaff, isPm } = UserType
  const { open, setOpen, firstDayOfLastWeek } = props
  const [optionValue, setOptionValue] = useState<UserType>(isStaff)
  const [loading, setLoading] = useState<boolean>(false)
  const [lockedTimesheets, setLockedTimesheets] = useState<ILockedTimesheetRespone | null >(null)
  const [toggleReload, setToggleReload] = useState(false);

  useEffect(() => {
    const getLockedTimesheetsFunc = async () => {
      try {
        const lockedTimesheetsRespone = await getLockedTimesheets();
        setLockedTimesheets(lockedTimesheetsRespone)
      }
      catch(error: any) {
        toast.error(error?.detail?.message)
      }
    }

    getLockedTimesheetsFunc();
    
  }, [toggleReload])

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async () => {
    try {
      setLoading(true)

      const unLockEndpoint = ( optionValue === isPm ) ? postUnlockApproveTimeSheet : postUnlockLogTimesheet ;
      await unLockEndpoint();
      // reload locked timesheets
      setToggleReload((reload) => !reload)
      toast.success('Unlock successfully')
    } catch (err: any) {
      toast.error(err.detail.message)
    }

    setLoading(false)
    setOpen(false)
  }
  const classes = useStyles()
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 550,
          bgcolor: "background.paper",
          outline: 'none',
          borderRadius: 2
        }}
      > 
      <>
        <Box sx={{ p: 3, pb: 0 }}>
          <Typography variant="h3" mb={3}>
            You want to UNLOCK TIMESHEET?
          </Typography>
        </Box>
        <Box className={classes.modalContent} sx={{ p: 3}}>
          <RadioGroup
            value={optionValue}
            onChange={(e) =>
              setOptionValue(e.target.value as typeof isPm | typeof isStaff)
            }
            name="radio-buttons-group"
          >
            {/* only show for pm user */}
            {lockedTimesheets?.isPM && <FormControlLabel
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                m: 0,
                mb: 1
              }}
              value={isPm}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: red[500]
                    },
                    ":hover": {
                      backgroundColor: "rgba(255, 235, 238, 0.3)"
                    }
                  }}
                />
              }
              labelPlacement="start"
              label={
                <>
                  <Typography>
                    You are <strong style={{ color: red[700] }}>PM</strong>:</Typography>
                  {!lockedTimesheets.isUnlockApprove && 
                    <>
                      <Typography>You need to approve timesheet for your team&apos; members?</Typography>
                      <Typography>Unlock for you: {lockedTimesheets?.amountPM
                        ? (lockedTimesheets?.amountPM as number).toLocaleString()
                        : '50,000'} vnd</Typography>
                    </>
                  }
                  {lockedTimesheets.isUnlockApprove && <Typography>You have unlocked timesheet for PM</Typography>}
                </>
              }
            />
            }
            <FormControlLabel
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                m: 0,
                mb: 1
              }}
              value={isStaff}
              control={
                <Radio
                  sx={{
                    "&, &.Mui-checked": {
                      color: amber[500]
                    },
                    ":hover": {
                      backgroundColor: "rgba(255, 248, 225, 0.3)"
                    }
                  }}
                />
              }
              labelPlacement="start"
              label={
                <>
                  <Typography>You are <strong style={{ color: theme.palette.warning.main }}> Staff</strong>:</Typography>
                  {!lockedTimesheets?.isUnlockLog && 
                  <>
                    <Typography>Your timesheet is blocked? You need to unlock timesheet?</Typography>
                    <Typography>(After unlock, you can update from {lockedTimesheets?.firstDateCanLogIfUnlock} to now)
                    </Typography>
                    <Typography>Unlock for you: {lockedTimesheets?.amount
                    ? (lockedTimesheets?.amount as number).toLocaleString()
                    : '20,000'} vnd</Typography>
                  </>
                  }
                  {lockedTimesheets?.isUnlockLog && <Typography>You have unlocked timesheet for Staff</Typography>}
                </>
              }
            />
          </RadioGroup>
          {/* handle null and empty */}
          {(!lockedTimesheets?.lockedEmployee || lockedTimesheets?.lockedEmployee.length === 0) &&
          <>
            <Typography>Your timesheet has no errors!</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Are you sure you want to unlock timesheet?</Typography>
            <Typography>Your fees cannot be refunded!</Typography>
          </>
          }
          {(lockedTimesheets?.lockedEmployee && lockedTimesheets?.lockedEmployee?.length > 0 ) && 
          <>
            <Typography sx={{ mb: 1 }}>We have found your errors in {lockedTimesheets?.lockedEmployee?.length} {lockedTimesheets?.lockedEmployee?.length === 1 ? 'week' : 'weeks'}. Check below:</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: '300px', overflowY: 'scroll' }}>
              <Table aria-label="blocked timesheets table">
                <TableHead sx={{ background: '#f8f8f9' }}>
                  <TableRow>
                    <TableCell align="center" sx={{ width: '220px' }}>Week</TableCell>
                    <TableCell align="center">Day</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lockedTimesheets?.lockedEmployee?.map((row: ILockedTimesheet, index: number) => (
                    <TableRow
                      key={index}
                    >
                      <TableCell align="center">
                        {`${row.startDate} - ${row.endDate}`}
                      </TableCell>
                      <TableCell align="center">{row?.day?.map((day: string) => <Box key={day} sx={{ display: 'block' }}>{day}</Box>)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
          }
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} gap={1} mt={1} sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ fontWeight: '600'}}>
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
            sx={{ fontWeight: '600'}}
          >
            Unlock
          </LoadingButton>
        </Box>
      </>
      </Box>
    </Modal>
  )
}

import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Dollar, MoneyBag, UnlockTimesheet } from "@/assets"
import IMSImage from "@/components/Image/IMSImage"
import { useState, useEffect } from "react"
import { getFirstDayOfLastWeek } from "@/utils/time"
import { AppDispatch } from "@/store"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import PenaltyFundModal from "@/components/Modal/PenaltyFund"
import { hrmApi } from "@/api"
import toast from "@/utils/toast"
import { IToastError } from "@/types"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  fund: {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px"
  },

  fund_total: {
    margin: "0px 20px"
  }
})

const WidgetPenaltyFund = () => {
  const classes = useStyles()
  const firstDayOfLastWeek = getFirstDayOfLastWeek("DD/MM/YYYY")
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [fundCurrentBalance, setFundCurrentBalance] = useState<number>(0)

  const navigate = useNavigate()

  const handleClickFund = () => {
    navigate("/fund-amount-histories")
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await hrmApi.getFundCurrentBalance()
        setFundCurrentBalance(result)
      } catch (error) {
        const err = error as IToastError
        toast.error(err.detail.message)
      }
    })()
  }, [])

  return (
    <>
      <PenaltyFundModal
        firstDayOfLastWeek={firstDayOfLastWeek}
        open={openModal}
        setOpen={setOpenModal}
      />
      <Box className={classes.root}>
        <Box
          className={classes.fund}
          sx={{ cursor: "pointer" }}
          onClick={handleClickFund}
        >
          <IMSImage src={MoneyBag} sx={{ width: 32, height: 32 }} />
          <Box className={classes.fund_total}>
            <Box
              component="h2"
              sx={{ fontSize: 18, color: "#B24747", margin: 0 }}
            >
              {fundCurrentBalance.toLocaleString('vi-VN', {
                style : 'currency',
                currency : 'VND'
              })}
            </Box>
          </Box>
          <IMSImage src={Dollar} sx={{ width: 20, height: 20 }} />
        </Box>
        <Box onClick={() => setOpenModal(true)} sx={{ cursor: "pointer" }}>
          <IMSImage src={UnlockTimesheet} style={{}} />
        </Box>
      </Box>
    </>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

export default connect(null, mapDispatchToProps)(WidgetPenaltyFund)

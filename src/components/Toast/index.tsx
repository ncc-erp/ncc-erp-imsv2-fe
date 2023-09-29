import { FailAnimation, SuccessAnimation } from "@/assets"
import { TOAST_TYPE } from "@/types"
import { Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import Lottie from "react-lottie"
import IMSModal from "../Modal/IMSModal"

interface IIMSToast {
  type: TOAST_TYPE
  title: string
  message: string | React.ReactNode
  onCloseToast: () => void
  isShow: boolean
}

const useStyles = makeStyles({
  contentModal: {
    borderWidth: 0,
    marginBottom: 8
  },
  popup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 18
  },
  contentPopup: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
})

const IMSToast = ({
  message,
  isShow,
  onCloseToast,
  title,
  type
}: IIMSToast) => {
  const classes = useStyles()

  const renderIcon = () => {
    switch (type) {
      case TOAST_TYPE.SUCCESS:
        return SuccessAnimation
      case TOAST_TYPE.FAIL:
        return FailAnimation
      default:
        return SuccessAnimation
    }
  }

  const renderColor = () => {
    switch (type) {
      case TOAST_TYPE.SUCCESS:
        return "success"
      case TOAST_TYPE.FAIL:
        return "error"
      default:
        return "success"
    }
  }

  return (
    <IMSModal
      cancelButton={{
        onClick: onCloseToast,
        title: "Ok",
        color: renderColor()
      }}
      saveButton={{ isShow: false }}
      open={isShow}
      contentClassName={classes.contentModal}
      justifyContentButton="center"
    >
      <div className={classes.popup}>
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: renderIcon()
          }}
          height={180}
          width={180}
        />
        <div className={classes.contentPopup}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>{message}</Typography>
        </div>
      </div>
    </IMSModal>
  )
}

export default IMSToast

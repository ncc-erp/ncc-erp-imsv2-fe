import { IMSToast } from "@/components"
import { ContextType } from "@/layouts/MainLayout"
import { AppDispatch } from "@/store"
import { takeSelfie } from "@/store/common/thunkApi"
import { TOAST_TYPE } from "@/types"
import { ICheckIn } from "@/types/faceId"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import { Button, IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useOutletContext } from "react-router-dom"
import { WIDGET_PADDING, WIDGET_SPACING, WIDGET_WIDTH } from "../GridLayout"

const useStyles = makeStyles({
  cameraCard: {
    height: "100%",
    textAlign: "center",
    padding: "40px 70px"
  },
  cameraBtn: {
    "&.MuiButtonBase-root.MuiIconButton-root": {
      padding: 40,
      height: "100%",
      width: "100%"
    }
  },
  videoWrapper: {
    position: "relative"
  },
  captureVideoBtn: {
    "&.MuiButtonBase-root.MuiButton-root": {
      cursor: "pointer",
      minWidth: 36,
      height: 36,
      backgroundColor: "#fff",
      borderRadius: "50%",
      position: "absolute",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)"
    }
  },
  videoCaptured: {
    display: "none"
  }
})

interface IWidgetCheckinProps {
  pTakeSelfie: (imgBase64: string) => Promise<ICheckIn>
  cell?: number
}

function WidgetCheckin({ cell = 0, pTakeSelfie }: IWidgetCheckinProps) {
  const [camMode, setCamMode] = useState(false)
  const [captured, setCaptured] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const photoRef = useRef<HTMLCanvasElement>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState(false)
  const [toastData, setToastData] = useState<{
    type: TOAST_TYPE
    title: string
    message: string | React.ReactNode
  }>({
    message: "",
    title: "",
    type: TOAST_TYPE.SUCCESS
  })
  const classes = useStyles()
  const { isConfigWidget } = useOutletContext<ContextType>()

  const WIDTH = cell * WIDGET_WIDTH - WIDGET_PADDING * 2 - WIDGET_SPACING
  const HEIGHT = 200

  const getCameraStream = () => {
    if(camMode) {
      navigator.mediaDevices
        ?.getUserMedia({
          video: {
            width: WIDTH,
            height: HEIGHT
          }
        })
        .then((stream) => {
          const video = videoRef.current
          if (video) {
            video.srcObject = stream
            video.play()
          }
        })
        .catch((err) => {
          setToastData({
            message: <>To checkin, your device needs to have camera and allows browser to use it! <br />
              Also check that the link must be https to avoid your camera from being blocked!</>,
            title: "Check In Failed",
            type: TOAST_TYPE.FAIL
          })
          setShowPopup(true)
          setError(true);
        })
    }
  }

  const handleTakePhoto = () => {
    // camera's permission error
    if(error) {
      return;
    }
    const photo = photoRef.current
    const video = videoRef.current

    if (photo && video) {
      photo.width = WIDTH
      photo.height = HEIGHT
      const ctx = photo.getContext("2d")
      ctx?.drawImage(video, 0, 0, WIDTH, HEIGHT)
      const res = pTakeSelfie(photo.toDataURL("image/jpeg", 1.0))
      setCaptured(true)
      res
        .then((res) => {
          setToastData({
            message: `${res?.lastName || ""} ${res?.firstName || ""}`,
            title: "Check In Success",
            type: TOAST_TYPE.SUCCESS
          })
        })
        .catch((error) => {
          setToastData({
            message: error?.detail?.message,
            title: "Check In Failed",
            type: TOAST_TYPE.FAIL
          })
        })
      setShowPopup(true)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setCaptured(false)
  }

  useEffect(() => {
    getCameraStream()
  }, [videoRef, camMode])

  return !isConfigWidget ? (
    <div>
      {!camMode ? (
        <div className={classes.cameraCard}>
          <IconButton
            className={classes.cameraBtn}
            color="primary"
            onClick={() => {
              setCamMode(true)
            }}
            component="label"
          >
            <PhotoCamera sx={{
              fontSize: '40px'
            }}
            />
          </IconButton>
        </div>
      ) : (
        <>
          <div
            className={`${classes.videoWrapper} ${
              captured ? classes.videoCaptured : ""
            }`}
          >
            <video ref={videoRef} />
            <Button
              className={classes.captureVideoBtn}
              onClick={handleTakePhoto}
            />
          </div>
          <canvas
            ref={photoRef}
            className={`${!captured ? classes.videoCaptured : ""}`}
          ></canvas>
        </>
      )}
      <IMSToast
        isShow={showPopup}
        onCloseToast={handleClosePopup}
        {...toastData}
      />
    </div>
  ) : null
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pTakeSelfie: (imgBase64: string) => dispatch(takeSelfie(imgBase64)).unwrap()
})

export default connect(null, mapDispatchToProps)(WidgetCheckin)

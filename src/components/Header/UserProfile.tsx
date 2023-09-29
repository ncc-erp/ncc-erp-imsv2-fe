import {
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
  styled,
  Divider,
  Theme,
  IconButton
} from "@mui/material"
import { useState, useEffect, useRef } from "react"
import { connect, useDispatch } from "react-redux"
import {
  Male as MaleIcon,
  Female as FemaleIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material"
import { makeStyles } from "@mui/styles"
import { Crop } from "react-image-crop"

import { AppState } from "@/store"
import { IUserInfo, IUserProfileRes } from "@/types"
import toast from "@/utils/toast"
import { hrmApi, userApi } from "@/api"
import { USER_GENDER, USER_MESSAGE, ALLOWED_FILE_SIZE } from "@/enums/users"
import IMSImage from "@/components/Image/IMSImage"
import { RestIcon, MailIcon, PhoneIcon } from "@/assets"
import { IMSModal } from "@/components"
import { setAvatar } from "@/store/user"
import { FileSize } from "@/enums/size"
import UserOtherInfo from "@/features/Widget/components/userProfile/UserOtherInfo"
import ModalUploadAvatar from "@/features/Widget/components/userProfile/ModalUploadAvatar"
import { MAX_WIDTH_USER_MENU } from "./UserMenu"

interface IUserProfileProps {
  userProfile: IUserProfileRes
  backToUserMenu: () => void
  closeUserMenu: () => void
}

const CustomDivider = styled(Divider)({
  margin: "8px 0"
})

const CustomChip = styled(Chip)({
  color: "#fff"
})

const CustomStack = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  gap: theme.spacing(1),
  flexDirection: "row",
  flexWrap: "wrap"
}))

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  userAvatar: {
    flexDirection: "row",
    gap: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  userInfo: {
    flex: 1,
    gap: theme.spacing(1),
    "& > div": {
      display: "flex",
      gap: theme.spacing(1),
      "& > div": {
        width: 25,
        alignItems: "center"
      }
    }
  },
  textGrey: {
    fontSize: 13,
    color: theme.palette.grey[500]
  },
  userInfoWidget: {
    width: MAX_WIDTH_USER_MENU,
    maxWidth: MAX_WIDTH_USER_MENU,
    padding: 10
  }
}))

const UserProfile = (props: IUserProfileProps) => {
  const {
    userProfile,
    backToUserMenu,
    closeUserMenu
  } = props

  const classes = useStyles()
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState<IUserInfo>()
  const [isOpenModalChangeAvatar, setIsOpenModalChangeAvatar] = useState<boolean>(false)
  const [file, setFile] = useState<File>()
  const [imgSrc, setImgSrc] = useState("")
  const [crop, setCrop] = useState<Crop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const [error, setError] = useState<undefined | string>(undefined)

  useEffect(() => {
    if (!userProfile.emailAddress) return
    (async () => {
      try {
        const result = await hrmApi.getUserInfo(userProfile.emailAddress)
        setUserInfo(result);
      } catch (error: any) {
        toast.error(error.detail.message)
      }
    })()
  }, [userProfile?.emailAddress])

  const handleOpenModalChangeAvatar = () => {
    setIsOpenModalChangeAvatar(true)
  }

  const handleCloseModalChangeAvatar = () => {
    setFile(undefined)
    setImgSrc("")
    setCrop(undefined)
    setIsOpenModalChangeAvatar(false)
  }

  const getCroppedImg = () => {
    const img = imgRef.current;
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    if (crop && !!img) {
      const scaleX = img.naturalWidth / img.width
      const scaleY = img.naturalHeight / img.height
      const pixelRatio = window.devicePixelRatio

      canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
      canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

      ctx.scale(pixelRatio, pixelRatio)
      ctx.imageSmoothingQuality = "high"

      const cropX = crop.x * scaleX
      const cropY = crop.y * scaleY

      const centerX = img.naturalWidth / 2
      const centerY = img.naturalHeight / 2

      ctx.save()

      ctx.translate(-cropX, -cropY)
      ctx.translate(centerX, centerY)
      ctx.translate(-centerX, -centerY)
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
      )
      return new Promise((resolve) => {
        canvas.toBlob(file => {
          resolve(file)
      }, 'image/jpeg', 0.5)
      })
    }
  }

  const handleUploadAvatar = async () => {
    if (file) {
      const image = await getCroppedImg();
      const newFile = new File([image as any], file.name, {
        type: file?.type
      })

      if((newFile.size / FileSize.MB) >= ALLOWED_FILE_SIZE.AVATAR){
        setError(USER_MESSAGE.CROP_AVATAR_FAIL);
        return;
      }
      
      try {
        await userApi.uploadAvatar(newFile)
        dispatch(setAvatar(URL.createObjectURL(newFile)))
        handleCloseModalChangeAvatar()
      } catch (error: any) {
        toast.error(error.detail.message)
      }
    }
  }

  return userInfo ? (
    <>
      <Stack className={classes.userInfoWidget}>
        <Stack direction="row" justifyContent="space-between" marginBottom={1}>
          <IconButton onClick={backToUserMenu}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={closeUserMenu}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack className={classes.userAvatar}>
          <Avatar
            sx={{ width: 100, height: 100, cursor: "pointer" }}
            alt={userProfile.name}
            src={userProfile.avatar}
            onClick={handleOpenModalChangeAvatar}
          />
          <Stack className={classes.userInfo}>
            <Box>
              <Stack>
                {userInfo.sex === USER_GENDER.MALE
                  ? <MaleIcon color="primary" />
                  : <FemaleIcon color="error" />}
              </Stack>
              <Typography variant="h5">
                {userInfo.fullName}
              </Typography>
            </Box>
            <Box>
              <Stack>
                <IMSImage src={MailIcon} sx={{ width: 24, height: 24 }} />
              </Stack>
              <Typography>{userInfo.email} </Typography>
            </Box>
            <Box>
              <Stack>
                <IMSImage src={PhoneIcon} sx={{ width: 18, height: 18 }} />
              </Stack>
              <Typography>{userInfo.phone}</Typography>
            </Box>
            <Box>
              <Stack>
                <IMSImage src={RestIcon} sx={{ width: 20, height: 20 }} />
              </Stack>
              <Typography>
                <span className={classes.textGrey}>Remain leave day: </span>
                <span>{userInfo.remainLeaveDay}</span>
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <CustomDivider />
        <Stack spacing={2}>
          <CustomStack>
            <CustomChip
              size="small"
              color="warning"
              label={userInfo.branch}
              sx={{ background: "#e10e0e" }}
            />
            <CustomChip
              size="small"
              color="warning"
              label={userInfo.usertypeName}
              sx={{ background: "#e08b29" }}
            />
            <CustomChip
              size="small"
              color="warning"
              label={userInfo.jobPosition}
              sx={{ background: "#990000" }}
            />
            <CustomChip
              size="small"
              color="warning"
              label={userInfo.level}
              sx={{ background: "#000" }}
            />
          </CustomStack>
          {!!userInfo.skillNames.length && (
            <CustomStack>
              {userInfo.skillNames.map(skill => (
                <CustomChip
                  size="small"
                  label={skill}
                  key={skill}
                  sx={{ background: "#6c757d" }}
                />
              ))}
            </CustomStack>
          )}
          {!!userInfo.teams.length && (
            <CustomStack>
              {userInfo.teams.map(team => (
                <CustomChip
                  size="small"
                  label={team}
                  key={team}
                  sx={{ background: "#e08b29" }}
                />
              ))}
            </CustomStack>
          )}
        </Stack>
        <CustomDivider />
        <UserOtherInfo userInfo={userInfo} />
      </Stack>
      <IMSModal
        header={{
          title: "Upload avatar",
        }}
        position="CENTER"
        height="auto"
        open={isOpenModalChangeAvatar}
        saveButton={{
          color: "primary",
          onClick: handleUploadAvatar
        }}
        cancelButton={{
          onClick: handleCloseModalChangeAvatar,
          color: "primary",
          variant: "outlined"
        }}
      >
        <ModalUploadAvatar
          setFile={setFile}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          crop={crop}
          setCrop={setCrop}
          imgRef={imgRef}
          error={error}
          setError={setError}
        />
      </IMSModal>
    </>
  ) : <Box sx={{
    maxWidth: MAX_WIDTH_USER_MENU
  }}>

  </Box>
}

const mapStateToProps = (state: AppState) => ({
  userProfile: state.user.userProfile
})

export default connect(mapStateToProps, null)(UserProfile)

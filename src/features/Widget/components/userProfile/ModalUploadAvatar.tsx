import { useRef, SetStateAction, Dispatch, RefObject } from "react"
import { Button, Box, Typography, Theme, FormHelperText, styled } from "@mui/material"
import { makeStyles } from "@mui/styles"
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css";


const useStyles = makeStyles<Theme>((theme: Theme) => ({
  uploadAvatar: {
    width: 500,
    padding: "20px 0",
    textAlign: "center",
    "& img": {
      width: "100%",
    }
  },
  cropperBox: {
    minHeight: 325,
    marginTop: 20,
    "& p": {
      marginBottom: 15
    }
  }
}))

const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 500
}))

interface ModalUploadAvatarProps {
  setFile: Dispatch<SetStateAction<File | undefined>>
  imgSrc: string
  setImgSrc: Dispatch<SetStateAction<string>>
  crop?: Crop
  setCrop: Dispatch<SetStateAction<Crop | undefined>>
  imgRef: RefObject<HTMLImageElement>
  error?: string
  setError: Dispatch<SetStateAction<string | undefined>>
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 300,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ModalUploadAvatar = ({
  setFile,
  imgSrc,
  setImgSrc,
  crop,
  setCrop,
  imgRef,
  error,
  setError
}: ModalUploadAvatarProps) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined)
      setError(undefined)
      setFile(e.target.files[0])
      setImgSrc(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleSelectFile = () => {
    (inputRef.current as HTMLInputElement).click();
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1 / 1))
  }

  const handleOnCropChange = (crop: PixelCrop) => {
    setError(undefined);
    setCrop(crop);
  };

  return (
    <div className={classes.uploadAvatar}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onSelectFile}
      />
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleSelectFile}
      >
        Select image
      </Button>
        <Box className={classes.cropperBox}>
      {imgSrc && (
          <>
            <Typography>Crop image</Typography>
            <Box>
              {!!imgSrc && (
                <ReactCrop
                  style={{ maxHeight: 300 }}
                  crop={crop}
                  onChange={handleOnCropChange}
                  aspect={1}
                  keepSelection={true}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              )}
            </Box>
            {error && <StyledHelperText
              error={Boolean(error)}>
              {error}
            </StyledHelperText>}
          </>
      )}
        </Box>
    </div>
  )
}

export default ModalUploadAvatar

import { IAlbumSave } from "@/types"
import CropOriginalIcon from "@mui/icons-material/CropOriginal"
import UploadIcon from "@mui/icons-material/Upload"
import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  styled,
  Typography
} from "@mui/material"
import { blue, grey, red } from "@mui/material/colors"
import { useEffect, useState } from "react"
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn
} from "react-hook-form"

export interface IPictureFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
  initPreviewImg?: string | null
}

const Label = styled(FormLabel)(({ theme }) => ({
  display: "inline-block",
  marginBottom: theme.spacing(0.65),
  fontWeight: 500,
  color: theme.palette.grey[500],
  "& > span": {
    color: red[500],
    marginLeft: theme.spacing(0.5)
  },
  "&.MuiFormLabel-root.Mui-disabled": {
    color: theme.palette.grey[500]
  }
}))

const ButtonChange = styled("label")(({ theme }) => ({
  border: `2px solid ${theme.palette.grey[300]}`,
  padding: theme.spacing(1, 2),
  color: "#000",
  borderRadius: theme.spacing(0.75),
  cursor: "pointer"
}))

const ButtonRemove = styled(Button)(({ theme }) => ({
  color: red[500],
  marginLeft: theme.spacing(1),
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  "&:hover": {
    backgroundColor: theme.palette.grey[200]
  }
}))

const BoxPreviewContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontWeight: 600
})

const BoxPreviewImg = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(2),
  "& img": {
    width: 150,
    height: 80,
    objectFit: "cover",
    borderRadius: theme.spacing(0.75)
  }
}))

const ButtonsPreviewContainer = styled(Box)({
  display: "flex",
  alignItems: "center"
})

export function AlbumPictureField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = "",
  disabled,
  initPreviewImg = null,
  required = false
}: IPictureFieldProps<TFormValues>) {
  const [previewImg, setPreviewImg] = useState<string | null>(initPreviewImg)
  const { control, formState, setValue, trigger } = form
  const { errors } = formState
  const error = errors[name]

  useEffect(() => {
    if (initPreviewImg) {
      setPreviewImg(initPreviewImg)
    }
  }, [initPreviewImg])

  const handleCreateImg = (file: File) => {
    if (!file.type) return null
    return URL.createObjectURL(file)
  }

  const handleRemoveImg = () => {
    setPreviewImg(null)
    setValue('thumbnailImage' as Path<TFormValues>, "" as PathValue<TFormValues, Path<TFormValues>>);
    setValue(name, undefined as PathValue<TFormValues, Path<TFormValues>>)
    trigger(name)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Box m="12px 0" color={red[700]}>
          <Label error={!!error} disabled={disabled}>
            {label}
            {required && <Box component="span">*</Box>}
          </Label>
          <input
            type="file"
            id={label}
            hidden
            disabled={disabled}
            accept="image/jpg, image/png, image/jpeg"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => {
              const file = e.target.files?.[0]
              onChange(file)
              if (file) {
                setPreviewImg(handleCreateImg(file))
              }
            }}
          />
          {!previewImg && (
            <>
              <Box
                component="label"
                htmlFor={label}
                sx={{
                  display: "block",
                  border: `2px dashed ${error ? red[700] : grey[500]}`,
                  borderRadius: "6px",
                  p: "12px 14px 14px",
                  cursor: "pointer",

                  "&:hover": {
                    borderColor: error ? red[700] : grey[800]
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "24px"
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",

                      color: grey[500]
                    }}
                  >
                    <CropOriginalIcon
                      sx={{
                        p: "10px 12px 12px 8px",
                        fontSize: "45px"
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: grey[500]
                      }}
                    >
                      {placeholder}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    type="button"
                    size="small"
                    startIcon={<UploadIcon />}
                    disabled={disabled}
                    sx={{
                      minWidth: "100px",
                      backgroundColor: error ? red[700] : blue[700],
                      pointerEvents: "none"
                    }}
                  >
                    Browser
                  </Button>
                </Box>
              </Box>
            </>
          )}
          {previewImg && (
            <BoxPreviewContainer>
              <BoxPreviewImg>
                <img src={previewImg} alt="" />
              </BoxPreviewImg>
              <ButtonsPreviewContainer>
                {!disabled && (
                  <>
                    <ButtonChange htmlFor={label}>Change</ButtonChange>
                    <ButtonRemove onClick={handleRemoveImg}>
                      Remove
                    </ButtonRemove>
                  </>
                )}
              </ButtonsPreviewContainer>
            </BoxPreviewContainer>
          )}

          <FormHelperText
            error={!!error}
            sx={{
              pl: "16px",
              fontSize: "12px",
              fontWeight: 400
            }}
          >
            {error?.message?.toString()}
          </FormHelperText>
        </Box>
      )}
    />
  )
}

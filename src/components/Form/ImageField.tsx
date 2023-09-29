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
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

const ImageFieldInner = styled("label")<{ error: boolean }>(
  ({ theme, error }) => ({
    display: "block",
    border: `2px dashed ${error ? red[700] : grey[500]}`,
    borderRadius: "6px",
    padding: theme.spacing(2),
    cursor: "pointer",

    "&:hover": {
      borderColor: error ? red[700] : grey[800]
    }
  })
)

const ImageLabelField = styled(FormLabel)(({ theme }) => ({
  display: "inline-block",
  marginBottom: theme.spacing(0.5),
  fontWeight: 400,
  color: theme.palette.grey[700],
  "& > span": {
    color: red[500],
    marginLeft: theme.spacing(0.5)
  }
}))

const ImageContentField = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& > div": {
    display: "flex",
    alignItems: "center",
    color: theme.palette.grey[500]
  },
  "& svg": {
    padding: theme.spacing(1.5, 1.5, 1.5, 1),
    fontSize: "45px",
    marginRight: theme.spacing(0.5)
  },
  "& p": {
    fontSize: "15px"
  }
}))

const ImageHelperTextField = styled(FormHelperText)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  fontSize: theme.typography.h6.fontSize,
  fontWeight: 500
}))

export type IImageFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
}

export function ImageField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = "",
  required = false,
  disabled
}: IImageFieldProps<TFormValues>) {
  const { control, formState } = form
  const { errors } = formState
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box m="16px 0" color={red[700]}>
          <ImageLabelField error={Boolean(error)} disabled={disabled}>
            {label}
            {required && <Box component="span">*</Box>}
          </ImageLabelField>

          <ImageFieldInner error={!!error} htmlFor={label}>
            <input
              type="file"
              id={label}
              hidden
              accept="image/jpg, image/png, image/jpeg"
              onChange={(e: any) => onChange(e.target.files[0])}
            />
            <ImageContentField>
              <Box>
                <CropOriginalIcon />

                {!value ? (
                  <Typography>{placeholder}</Typography>
                ) : (
                  <Typography>{(value as File)?.name}</Typography>
                )}
              </Box>
              <Button
                variant="contained"
                type="button"
                size="small"
                startIcon={<UploadIcon />}
                disabled={disabled}
                sx={{
                  backgroundColor: error ? red[700] : blue[700],
                  pointerEvents: "none"
                }}
              >
                Browser
              </Button>
            </ImageContentField>
          </ImageFieldInner>

          <ImageHelperTextField error={Boolean(error)}>
            {error?.message?.toString()}
          </ImageHelperTextField>
        </Box>
      )}
    />
  )
}

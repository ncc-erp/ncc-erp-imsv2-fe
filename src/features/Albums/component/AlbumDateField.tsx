import { Box, styled, TextField } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export interface IDateFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
  disableFuture?: boolean
}

const DateFieldContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: "100%"
}))

const DateInputField = styled(TextField)(({ theme }) => ({
  ".MuiFormLabel-root": {
    "&.Mui-disabled": {
      color: theme.palette.grey[500]
    }
  },
  ".MuiIconButton-root": {
    color: theme.palette.grey[500],
    "&.Mui-disabled": {
      color: theme.palette.grey[500]
    }
  },
  ".MuiInputBase-input": {
    "&.Mui-disabled": {
      WebkitTextFillColor: theme.palette.grey[500]
    }
  },
  ".MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[500]
  }
}))

export function AlbumDateField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled,
  required,
  disableFuture
}: IDateFieldProps<TFormValues>) {
  const { control, formState } = form
  const { errors } = formState
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <DateFieldContainer>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              value={value}
              onChange={(e: any) => e && onChange(e)}
              disabled={disabled}
              inputFormat={"dd/MM/yyyy"}
              disableFuture={disableFuture}
              renderInput={(params) => (
                <DateInputField
                  {...params}
                  label={label}
                  inputProps={{
                    ...params.inputProps,
                    readOnly: disabled
                  }}
                  error={!!error}
                  helperText={error?.message?.toString()}
                  required={required}
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
        </DateFieldContainer>
      )}
    />
  )
}

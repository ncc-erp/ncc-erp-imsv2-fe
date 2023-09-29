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
}

const DateFieldContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: "100%"
}))

const DateInputField = styled(TextField)(({ theme }) => ({
  ".MuiFormLabel-root": {
    color: theme.palette.grey[500],
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
  },
  "& fieldset": {
    borderColor: theme.palette.grey[500]
  },
  [theme.breakpoints.down("lg")]: {
    "& .MuiFormLabel-root": {
      fontSize: '0.7rem'
    }
  }
}))

export function DateField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled,
  required
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
              onChange={(e) => e && onChange(e)}
              disabled={disabled}
              inputFormat={"dd/MM/yyyy"}
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

import { Box, styled, TextField } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import React, { SetStateAction } from "react"

export interface IDateFieldProps {
  value: Date | null,
  setPage?: React.Dispatch<SetStateAction<number>>,
  setValue: React.Dispatch<SetStateAction<Date | null>>,
  label: string
  disabled: boolean
  placeholder?: string
  disableFuture?: boolean
  maxDate?: Date,
  minDate?: Date
}

const DateFieldContainer = styled(Box)({
  width: "100%",
  maxWidth: "180px"
})

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

export function AuditDateFiled({
  value,
  setValue,
  setPage,
  label,
  disabled,
  disableFuture,
  maxDate,
  minDate
}: IDateFieldProps) {
  return (
    <DateFieldContainer>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        value={value}
        minDate={minDate}
        maxDate={maxDate}
        onChange={(e: null | Date) => {
          setValue(e as Date)
          setPage?.(1)
        }}
        disabled={disabled}
        inputFormat={"dd/MM/yyyy"}
        disableFuture={disableFuture}
        renderInput={(params) => (
          <DateInputField 
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              readOnly: true
            }}
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  </DateFieldContainer>
  )
}

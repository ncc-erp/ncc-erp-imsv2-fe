import * as React from "react"
import { alpha, styled } from "@mui/system"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { DatePicker } from "@mui/x-date-pickers"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import { TimePickerType, TIME_PICKER_OPTIONS } from "@/enums/times"

export interface IMomentDatePickerProps {
  date: Date
  handleChangeDate: (date: Date | null) => void,
  pickerType?: string
}

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({theme}) => ({
  "& .MuiInputBase-root": {
    height: '50px',
    width: '155px',
    borderRadius: 0
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: '1px 0',
    borderColor: alpha(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.1)
    }
  }
}))

export const MomentDatePicker = ({ date, handleChangeDate, pickerType = TimePickerType.DAY }: IMomentDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        inputFormat={pickerType === TimePickerType.DAY ? "DD/MM/YYYY" : "MM/YYYY"}
        value={date}
        views={pickerType === TimePickerType.DAY ? TIME_PICKER_OPTIONS.slice(0, 1) : TIME_PICKER_OPTIONS.slice(1) }
        onChange={handleChangeDate}
        renderInput={(params: TextFieldProps) => (
          // disable keyboad input
          <CustomTextField {...params} onKeyDown={(e) => e.preventDefault()} />
        )}
      />
    </LocalizationProvider>
  )
}

export default DatePicker

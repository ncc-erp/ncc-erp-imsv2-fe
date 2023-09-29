import React, { useState } from "react"
import moment from "moment"
import { alpha, styled } from "@mui/system"
import { Button, ButtonProps } from "@mui/material"
import ButtonGroup from "@mui/material/ButtonGroup"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { MomentDatePicker } from "../MomentDatePicker/MomentDatePicker"
import { TimePickerType } from "@/enums/times"
import { NavigateType } from "@/enums/navigate"
import { ClassesType } from "@/enums/classes"

interface IDateNavigateProps {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  pickerType?: string
}

const CustomButton = styled((props: ButtonProps) => <Button {...props} />)(({theme}) => ({
  height: '50px',
  borderColor: `${alpha(theme.palette.common.black, 0.15)}!important`,
  "&.active": {
    backgroundColor: 'rgba(22, 119, 255, 0.04)'
  }
}))

export const DateNavigate = ({ date, setDate, pickerType = TimePickerType.DAY }: IDateNavigateProps) => {
  const [selected, setSelected] = useState<null | string>(null)

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDate(date)
    }
  }

  const handleNavigate = (navigate: string) => {
    setSelected(navigate);
    const momentDateType = pickerType === TimePickerType.DAY ? 'days' : 'months';
    navigate === NavigateType.PREVIOUS ? setDate((date) => moment(date).subtract(1, momentDateType).toDate()) : setDate((date) => moment(date).add(1, momentDateType).toDate());
  }

  return (
    <ButtonGroup color="secondary" aria-label="Date navigate">
      <CustomButton
        onClick={() => handleNavigate(NavigateType.PREVIOUS)}
        className={selected === NavigateType.PREVIOUS ? ClassesType.ACTIVE : undefined}
      >
        <ChevronLeftIcon />
      </CustomButton>
      <MomentDatePicker date={date} handleChangeDate={handleChangeDate} pickerType={pickerType}/>
      <CustomButton
        onClick={() => handleNavigate(NavigateType.NEXT)}
        className={selected === NavigateType.NEXT ? ClassesType.ACTIVE : undefined}
      >
        <ChevronRightIcon />
      </CustomButton>
    </ButtonGroup>
  )
}

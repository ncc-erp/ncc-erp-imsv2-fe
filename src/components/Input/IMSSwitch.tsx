import Switch, { SwitchProps } from "@mui/material/Switch"
import React from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface IIMSSwitch<T extends FieldValues> {
  control: Control<T>
  name: string
}

function IMSSwitch<T extends FieldValues>(props: IIMSSwitch<T> & SwitchProps) {
  const { control, name, ...otherProps } = props
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field: { value, onChange } }) => {
        return <Switch {...otherProps} checked={value} onChange={onChange} />
      }}
    />
  )
}

export default IMSSwitch

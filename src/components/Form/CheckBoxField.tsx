import { Box, Checkbox, FormControlLabel } from "@mui/material"
import { Controller, UseFormReturn } from "react-hook-form"
import { DataUserForm, DataUserName } from "@/types"

export interface ICheckBoxFieldProps {
  form: UseFormReturn<DataUserForm, unknown>
  label: string
  name: DataUserName
  disabled: boolean
}

export function CheckBoxField({
  form,
  label,
  name,
  disabled,
}: ICheckBoxFieldProps): JSX.Element {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box m="8px 0">
          <FormControlLabel
            disabled={disabled}
            control={<Checkbox onChange={onChange} checked={!!value} />}
            label={label}
          />
        </Box>
      )}
    />
  )
}

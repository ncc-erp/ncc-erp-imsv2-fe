import { TextField } from "@mui/material"
import { Controller, UseFormReturn } from "react-hook-form"
import { DataUserForm, DataUserName } from "@/types"

export interface IInputFieldProps {
  form: UseFormReturn<DataUserForm, unknown>
  label: string
  name: DataUserName
  disabled: boolean
  placeholder?: string
}

export function InputField({
  form,
  label,
  name,
  disabled,
  placeholder,
}: IInputFieldProps): JSX.Element {
  const { control, formState } = form
  const { errors } = formState

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          fullWidth
          margin="dense"
          label={label}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          error={Boolean(errors[name as keyof DataUserForm])}
          helperText={
            errors[name as keyof DataUserForm] &&
            errors[name as keyof DataUserForm]?.message
          }
        />
      )}
    />
  )
}

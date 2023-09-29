import { Box, TextField } from "@mui/material"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export type INumberFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues, any>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
}

export function NumberField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled,
  placeholder = "",
  required = false
}: INumberFieldProps<TFormValues>) {
  const { control, formState } = form
  const { errors } = formState
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box m="16px 0">
          <TextField
            fullWidth
            required={required}
            type="number"
            label={label}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message?.toString()}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
          />
        </Box>
      )}
    />
  )
}

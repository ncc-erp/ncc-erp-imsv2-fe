import { Box, TextField } from "@mui/material"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export type IInputWidgetFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues, any>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
}

export function InputWidgetField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled,
  placeholder,
  required
}: IInputWidgetFieldProps<TFormValues>) {
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
            value={value || ""}
            required={required}
            label={label}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message?.toString()}
            disabled={disabled}
            placeholder={placeholder}
          />
        </Box>
      )}
    />
  )
}

import { Box, TextField } from "@mui/material"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export type IDescriptionFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
}

export function DescriptionField<TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled,
  placeholder,
  required
}: IDescriptionFieldProps<TFormValues>) {
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
            label={label}
            multiline
            maxRows={6}
            minRows={4}
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

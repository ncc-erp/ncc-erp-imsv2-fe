import { Box, Checkbox, FormControlLabel } from "@mui/material"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export type ICheckBoxWidgetFieldProps<TFormValues extends FieldValues> = {
  form: UseFormReturn<TFormValues, unknown>
  label: string
  name: Path<TFormValues>
  disabled: boolean
}

export function CheckBoxWidgetField<TFormValues extends FieldValues>({
  form,
  label,
  name,
  disabled
}: ICheckBoxWidgetFieldProps<TFormValues>): JSX.Element {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box m="16px 0">
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

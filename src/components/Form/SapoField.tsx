import { Box, styled, TextField } from "@mui/material"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export interface ISapoFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  placeholder?: string
  required?: boolean
  disabled: boolean
}

const SapoInputField = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-input": {
    "&.Mui-disabled": {
      WebkitTextFillColor: theme.palette.grey[700]
    }
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused": {
      boxShadow: "none",
      "&.Mui-error": {
        boxShadow: "none"
      },
      "& input": {
        border: "none",
        outline: "none",
        "&::placeholder": {
          color: "green"
        }
      },
      "& fieldset": {
        border: "none !important",
        outline: "none"
      }
    },

    "& textarea": {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: 700,
      padding: theme.spacing(1, 0),
      color: theme.palette.grey[700],
      lineHeight: 1.5
    },

    "& fieldset": {
      border: "none",
      outline: "none"
    },

    [theme.breakpoints.down("lg")]: {
      "& textarea": {
        fontSize: theme.typography.h4.fontSize,
      }
    }
  }
}))

export function SapoField<TFormValues extends FieldValues>({
  form,
  name,
  disabled,
  placeholder = ""
}: ISapoFieldProps<TFormValues>) {
  const { control, formState } = form
  const { errors } = formState
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box m="12px 0" p="0 24px">
          <SapoInputField
            fullWidth
            rows={2}
            multiline
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error?.message?.toString()}
            placeholder={placeholder}
            disabled={disabled}
          />
        </Box>
      )}
    />
  )
}

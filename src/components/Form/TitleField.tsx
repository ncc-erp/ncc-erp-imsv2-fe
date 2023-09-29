import { Box, styled, TextField } from "@mui/material"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"

export interface ITitleFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
}

const TitleInputField = styled(TextField)(({ theme }) => ({
  "&::placeholder": {
    color: theme.palette.grey[700]
  },
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
        outline: "none"
      },
      "& fieldset": {
        border: "none !important",
        outline: "none"
      }
    },

    "& input": {
      fontSize: theme.typography.h1.fontSize,
      fontWeight: 700,
      color: theme.palette.grey[700],
      textOverflow: "ellipsis"
    },

    "& fieldset": {
      border: "none",
      outline: "none"
    },

    [theme.breakpoints.down("lg")]: {
      "& input": {
        fontSize: theme.typography.h3.fontSize, 
      }
    }
  }
}))

export function TitleField<TFormValues extends FieldValues>({
  form,
  name,
  placeholder = "",
  disabled
}: ITitleFieldProps<TFormValues>) {
  const { control, formState } = form
  const { errors } = formState
  const error = errors[name]

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Box m="12px 0" p="0 24px">
          <TitleInputField
            fullWidth
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

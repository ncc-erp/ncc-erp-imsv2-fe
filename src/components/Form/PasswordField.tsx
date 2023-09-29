import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import { useState } from "react"
import { Controller, FieldError, Merge, UseFormReturn } from "react-hook-form"
import { DataUserForm, DataUserName } from "@/types"

export interface IPasswordFieldProps {
  form: UseFormReturn<DataUserForm, unknown>
  label: string
  name: DataUserName
  disabled: boolean
}

export function PasswordField({
  form,
  label,
  name,
  disabled,
}: IPasswordFieldProps): JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { control, formState } = form
  const { errors } = formState

  const handleShowPassword = () => {
    setShowPassword((prev: boolean) => !prev)
  }

  const checkError = (
    value:
      | FieldError
      | Merge<FieldError, (FieldError | undefined)[]>
      | undefined,
  ): boolean => Boolean(value)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl
          fullWidth
          margin="dense"
          disabled={disabled}
          variant="outlined"
        >
          <InputLabel error={checkError(errors[name as keyof DataUserForm])}>
            {label}
          </InputLabel>
          <OutlinedInput
            fullWidth
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            onChange={onChange}
            value={value}
            error={checkError(errors[name as keyof DataUserForm])}
          />
          <FormHelperText
            error={checkError(errors[name as keyof DataUserForm])}
          >
            {errors[name as keyof DataUserForm] &&
              errors[name as keyof DataUserForm]?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  )
}

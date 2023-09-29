import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import React, { useState } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface IIMSTextField<T extends FieldValues> {
  secureTextEntry?: boolean
  control: Control<T>
  name: string
}

const useStyles = makeStyles({
  input: {
    width: 300,
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      padding: "8px 0 8px 12px",
    },
  },
})

function IMSTextField<T extends FieldValues>(
  props: IIMSTextField<T> & TextFieldProps,
) {
  const classes = useStyles()
  const { secureTextEntry = false, control, name, ...otherProps } = props
  const [showPassword, setShowPassword] = useState(!secureTextEntry)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          className={classes.input}
          type={showPassword ? "text" : "password"}
          {...otherProps}
          value={value}
          onChange={onChange}
          error={!!error?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {secureTextEntry && (
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default IMSTextField

import { useEffect } from "react"
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled
} from "@mui/material"
import { SELECT } from "@/enums/widget"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ICategory } from "@/types"
import { Align } from "@/enums/news"

export interface ISelectFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  required?: boolean
  selectList: ICategory[] | null
  selectLine?: Align.HORIZONTAL | Align.VERTICAL
}

const SelectFieldContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  width: "100%"
}))

const LabelSelect = styled(InputLabel)(({ theme }) => ({
  "&.Mui-disabled": {
    color: theme.palette.grey[500]
  }
}))

const SelectForm = styled(Select)(({ theme }) => ({
  ".MuiOutlinedInput-input": {
    WebkitTextFillColor: theme.palette.grey[500]
  },
  "&.Mui-disabled": {
    color: theme.palette.grey[500],
    "& .MuiOutlinedInput-input": {
      WebkitTextFillColor: theme.palette.grey[500]
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[500]
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.grey[500]
    }
  },
}))

export function AlbumSelectField<TFormValues extends FieldValues>({
  form,
  label,
  name,
  disabled,
  required,
  selectList,
  selectLine = Align.VERTICAL
}: ISelectFieldProps<TFormValues>) {
  const { control, formState, getValues, resetField } = form
  const { errors } = formState
  const error = errors[name]

  useEffect(() => {
    if (selectList && !selectList.find((item) => item?.id === getValues(name)))
      resetField(name)
  }, [selectList])

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <SelectFieldContainer>
          <FormControl fullWidth error={Boolean(error)} disabled={disabled}>
            <LabelSelect
              error={Boolean(error)}
              required={required}
              sx={{
                height: "20px"
              }}
            >
              {label}
            </LabelSelect>
            <SelectForm
              value={value ? value : ""}
              label={label}
              onChange={(e: any) => onChange(e)}
              MenuProps={{ PaperProps: { sx: { maxHeight: SELECT.MAX_HEIGHT } } }}
            >
              {selectList && selectList.map((select: ICategory) => (
                <MenuItem key={select.id} value={select.id}>
                  {select.displayName}
                </MenuItem>
              ))}
            </SelectForm>
            {selectLine === Align.VERTICAL && (
              <FormHelperText error={Boolean(error)}>
                {error?.message?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        </SelectFieldContainer>
      )}
    />
  )
}

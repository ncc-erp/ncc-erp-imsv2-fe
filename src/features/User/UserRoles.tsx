import { Box, Checkbox, FormControlLabel } from "@mui/material"
import { ChangeEvent, Dispatch } from "react"
import { DataUserChecked } from "@/types"

export interface IUserRolesProps {
  checkedList: DataUserChecked[]
  setCheckedList: Dispatch<React.SetStateAction<DataUserChecked[]>>
}

export function UserRoles({
  checkedList,
  setCheckedList,
}: IUserRolesProps): JSX.Element {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked: checked } = e.target
    const index: number = checkedList.findIndex(
      (check: DataUserChecked) => check.name === name,
    )
    if (index >= 0) {
      const newCheckedList: DataUserChecked[] = [...checkedList]
      newCheckedList[index] = { ...newCheckedList[index], isChecked: checked }
      setCheckedList(newCheckedList)
    }
  }

  return (
    <Box>
      {checkedList.map((checked: DataUserChecked) => (
        <Box key={checked.value}>
          <FormControlLabel
            control={
              <Checkbox
                name={checked.name}
                checked={checked.isChecked}
                onChange={handleChange}
              />
            }
            label={checked.name}
          />
        </Box>
      ))}
    </Box>
  )
}

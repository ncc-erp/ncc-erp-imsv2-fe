import React from "react"
import { styled, alpha } from "@mui/material/styles"
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import { ClassesType } from "@/enums/classes"

const ToggleButtonWrapper = styled(Box)(({ theme }) => ({
  "& .MuiButtonBase-root:nth-of-type(1)": {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius
  },
  "& .MuiButtonBase-root:nth-last-of-type(1)": {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
  }
}))

const StyledButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.common.black, 0.15)}`,
  borderRadius: 0,
  height: "50px",
  color: theme.palette.common.black,
  "&.active": {
    backgroundColor: "rgba(22, 119, 255, 0.04)"
  },
  "&:hover": {
    borderColor: alpha(theme.palette.common.black, 0.15)
  }
}))

interface IToggleButtonProps {
  items: { title: string; value: string }[]
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>
}

export const ToggleButton = ({
  items,
  selectedValue,
  setSelectedValue
}: IToggleButtonProps) => {
  return (
    <ToggleButtonWrapper>
      {items.map((item) => (
        <StyledButton
          key={item.title}
          onClick={() => setSelectedValue(item.value)}
          className={
            item.value === selectedValue ? ClassesType.ACTIVE : undefined
          }
        >
          {item.title}
        </StyledButton>
      ))}
    </ToggleButtonWrapper>
  )
}

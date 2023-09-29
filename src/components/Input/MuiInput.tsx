import { Input, SvgIconTypeMap } from "@mui/material"
import { styled as muiStyled } from "@mui/material/styles"
import styled from "styled-components"
import React, { ForwardedRef, useCallback } from "react"
import { ChangeHandler } from "react-hook-form"
import { SvgIconComponent } from "@mui/icons-material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface InputBaseProps {
  icon?: SvgIconComponent
  border: string
}

const InputBase = muiStyled(Input)<InputBaseProps>(({ icon, border }) => ({
  "&.MuiInputBase-root": {
    borderRadius: 4,
    backgroundColor: "#fff",
    border: border,
    fontSize: 14,
    height: "36px",
    padding: "7px 7px",
    paddingRight: "0px",
    paddingLeft: icon ? "32px" : "7px",
    transition: "all .3s ease",
    marginBottom: "15px",
    "&.Mui-focused": {
      borderColor: "#57a3f3",
      outline: "0",
      webkitBoxShadow: "0 0 0 2px rgb(45 140 240 / 20%)",
      boxShadow: "0 0 0 2px rgb(45 140 240 / 20%)",
    },
  },
}))

const WrapperStyle = styled.div`
  position: relative;
  width: 100%;
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    z-index: 2;
    margin-top: -7px;
    color: #515a6e;
  }
`
interface MuiInputProps {
  type?: string
  icon?: SvgIconComponent
  placeholder?: string
  onChange?: ChangeHandler
  border: string
  [key: string]: any
}

const MuiInput = (
  {
    type = "text",
    icon,
    placeholder,
    border = "1px solid #fff",
    onChange,
    ...props
  }: MuiInputProps,
  ref: ForwardedRef<JSX.Element>,
) => {
  const fncOnChange = useCallback(() => onChange, [])
  const Icon = icon as OverridableComponent<SvgIconTypeMap>

  return (
    <WrapperStyle>
      {icon && <Icon className="icon" />}
      <InputBase
        icon={icon}
        placeholder={placeholder}
        fullWidth
        border={border}
        disableUnderline
        onChange={fncOnChange}
        type={type}
        {...props}
        ref={ref}
      />
    </WrapperStyle>
  )
}
export default React.forwardRef(MuiInput)

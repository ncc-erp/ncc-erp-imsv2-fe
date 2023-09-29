import Tooltip, { TooltipProps } from "@mui/material/Tooltip"
import * as React from "react"

interface IBasicTooltipProps extends Omit<TooltipProps, "title" | "content" > {
  content: React.ReactNode
}

export function BasicTooltip({
  content,
  placement = "top",
  children,
  ...rest
}: IBasicTooltipProps) {
  return (
    <Tooltip title={content} placement={placement} {...rest}>
      {children}
    </Tooltip>
  )
}

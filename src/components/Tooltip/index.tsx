import { Fade, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import { styled } from "@mui/styles"
import React from "react"

export default function IMSTooltip({
  title,
  children
}: {
  title: React.ReactNode
  children: React.ReactElement
}) {
  return (
    <CustomWidthTooltip
      title={title}
      enterDelay={300}
      leaveDelay={200}
      TransitionComponent={Fade}
      arrow
    >
      {children}
    </CustomWidthTooltip>
  )
}

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 400,
    margin: "0 !important"
  }
})

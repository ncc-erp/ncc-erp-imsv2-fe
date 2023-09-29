import LaunchIcon from "@mui/icons-material/Launch"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import SettingsIcon from "@mui/icons-material/Settings"
import { Box, IconButton, Stack } from "@mui/material"
import WidgetLayout from "./WidgetCard"

export interface IWidgetTemplateProps {
  title: string
  onRemove: () => void
  onSettings: () => void
  widgetPageUrl: string
  isEditing?: boolean
  bodyContent: JSX.Element
  quickActions?: JSX.Element
}

export function WidgetTemplate({
  title,

  bodyContent,
  quickActions,
}: IWidgetTemplateProps) {
  return <></>
}

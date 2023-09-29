import WidgetBlank from "@/features/Widget/plugins/WidgetBlank"
import WidgetCheckin from "@/features/Widget/plugins/WidgetCheckin"
import WidgetNews from "@/features/Widget/plugins/WidgetNews"
import WidgetQuickNews from "@/features/Widget/plugins/WidgetQuickNews"
import WidgetTasksForToday from "@/features/Widget/plugins/WidgetTasksForToday"
import WidgetViolations from "@/features/Widget/plugins/WidgetViolations"
import WidgetTopUnlock from "@/features/Widget/plugins/WidgetTopUnlock";
import WidgetPenaltyFund from "@/features/Widget/plugins/WidgetPenaltyFund"
import WidgetTraditionalRoom from "@/features/Widget/plugins/WidgetTraditionalRoom"
import WidgetPolicyInformation from "@/features/Widget/plugins/WidgetPolicyInformation"
import WidgetEventInformations from "@/features/Widget/plugins/WidgetEventInformations"
import WidgetGuidelineInformations from "@/features/Widget/plugins/WidgetGuidelineInformations"
import WidgetNewsInformations from "@/features/Widget/plugins/WidgetNewsInformations"
import WidgetTotalUnlockTimeSheet from "@/features/Widget/plugins/WidgetTotalUnlockTimesheet"
import WidgetUserProfile from "@/features/Widget/plugins/WidgetUserProfile"
import WidgetLinks from "@/features/Widget/plugins/WidgetLinks"
import { WidgetURL, WIDGET_TYPE } from "@/types"
import { Settings } from "@mui/icons-material"
import LaunchIcon from "@mui/icons-material/Launch"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import {
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useNavigate } from "react-router-dom"
import WidgetFaces from "./plugins/WidgetFaces"

export interface IWidgetLayoutProps {
  title: string
  isEdit: boolean
  widgetType: WIDGET_TYPE
  onRemove: () => void
  onSettings?: () => void
  currentWidth?: number
  currentHeight?: number
}

const useStyles = makeStyles({
  cardContent: {
    // card header
    height: 'calc(100% - 34px)',
    flex: 1,
    "&.MuiCardContent-root:last-child": {
      paddingBottom: 0,
      padding: 0
    }
  },
  cardHeader: {
    "&.MuiCardHeader-root": {
      padding: 0,
      paddingBottom: 6
    }
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  iconConfig: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

const widgetBody = (type: WIDGET_TYPE, width?: number, height?: number) => {
  switch (type) {
    case WIDGET_TYPE.CHECK_IN:
      return <WidgetCheckin cell={width} />
    case WIDGET_TYPE.NEWS:
      return <WidgetNews row={height} />
    case WIDGET_TYPE.QUICK_NEWS:
      return <WidgetQuickNews row={height} />
    case WIDGET_TYPE.FACE:
      return <WidgetFaces />
    case WIDGET_TYPE.TASKS_FOR_TODAY:
      return <WidgetTasksForToday />
    case WIDGET_TYPE.PENALTY_FUND:
      return <WidgetPenaltyFund />
    case WIDGET_TYPE.VIOLATION_LIST:
      return <WidgetViolations />
    case WIDGET_TYPE.TOP_UNLOCK:
      return <WidgetTopUnlock />
    case WIDGET_TYPE.TRADITIONAL_ROOM:
      return <WidgetTraditionalRoom />
    case WIDGET_TYPE.TOTAL_UNLOCK_TIMESHEET:
      return <WidgetTotalUnlockTimeSheet />
    case WIDGET_TYPE.USER_PROFILE:
      return <WidgetUserProfile row={height} />
    case WIDGET_TYPE.POLICY_INFORMATIONS:
      return <WidgetPolicyInformation />
    case WIDGET_TYPE.EVENT_INFORMATIONS:
      return <WidgetEventInformations />
    case WIDGET_TYPE.GUIDELINE_INFORMATIONS:
      return <WidgetGuidelineInformations />
    case WIDGET_TYPE.NEWS_INFORMATIONS:
      return <WidgetNewsInformations />
    case WIDGET_TYPE.LINKS: 
      return <WidgetLinks />
    default:
      return <WidgetBlank />
  }
}

export function WidgetCard({
  title,
  onRemove,
  isEdit = false,
  widgetType,
  currentWidth,
  currentHeight
}: IWidgetLayoutProps) {
  const classes = useStyles()
  const navigate = useNavigate()

  const currentUrl = WidgetURL.get(widgetType)
  return (
    <div className={classes.root}>
      <CardHeader
        title={title}
        className={classes.cardHeader}
        action={
          <Stack direction={"row"}>
            {/* <IconButton color="primary" onClick={onRemove}>
              <SettingsIcon />
            </IconButton> */}
            {isEdit ? (
              <IconButton color="primary" onClick={onRemove}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            ) : (
              currentUrl && (
                <a href={`${currentUrl}`}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      navigate(`${currentUrl}`)
                    }}
                  >
                    <LaunchIcon />
                  </IconButton>
                </a>
              )
            )}
          </Stack>
        }
      />

      <CardContent className={classes.cardContent}>
        {isEdit ? (
          <div className={classes.iconConfig}>
            <Typography color="GrayText" fontSize={20} variant="body1">
              Configure Widget
            </Typography>
            <Settings color="disabled" sx={{ fontSize: 40 }} />
          </div>
        ) : (
          widgetBody(widgetType, currentWidth, currentHeight)
        )}
      </CardContent>
    </div>
  )
}

export default WidgetCard

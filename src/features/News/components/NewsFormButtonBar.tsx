import { LabelButton, StatusType } from "@/enums/news"
import { AppState } from "@/store"
import { ILabelButton, USER_ROLES_NAME } from "@/types"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import PublishIcon from "@mui/icons-material/Publish"
import SaveIcon from "@mui/icons-material/Save"
import UnpublishedIcon from "@mui/icons-material/Unpublished"
import PreviewIcon from "@mui/icons-material/Preview";
import { LoadingButton } from "@mui/lab"
import { Box, SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/types"
import { connect } from "react-redux"

interface INewsFormButtonBarProps {
  isSubmitting: boolean
  isUpdate: boolean
  onSubmit: (label: ILabelButton) => void
  status: StatusType
  roles: USER_ROLES_NAME[]
  pIsLoading: number
  labelLoading: string
  id?: number
}

interface IButton {
  label: ILabelButton
  condition: boolean
  roles?: USER_ROLES_NAME[]
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "info" | "error" | "inherit"
  type?: "submit"
  icon: OverridableComponent<SvgIconTypeMap<unknown, "svg">> & {
    muiName: string
  }
}

function buttonArray(args: INewsFormButtonBarProps): IButton[] {
  return [
    {
      label: LabelButton.SAVE_PUBLISH,
      condition: args.status === StatusType.DRAFT,
      roles: [USER_ROLES_NAME.ADMIN],
      type: "submit",
      icon: SaveIcon
    },
    {
      label: LabelButton.SAVE_SUBMIT,
      condition: args.status === StatusType.DRAFT,
      roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR],
      type: "submit",
      icon: SaveIcon
    },
    {
      label: LabelButton.SAVE_DRAFT,
      condition: args.status === StatusType.DRAFT,
      roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR],
      variant: "outlined",
      type: "submit",
      color: "inherit",
      icon: SaveIcon
    },
    {
      label: LabelButton.PUBLISH,
      condition:
        args.status === StatusType.WAITING || args.status === StatusType.HIDDEN,
      roles: [USER_ROLES_NAME.ADMIN],
      icon: PublishIcon
    },
    {
      label: LabelButton.RETURN,
      condition: args.status === StatusType.HIDDEN,
      variant: "outlined",
      color: "inherit",
      roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR],
      icon: KeyboardReturnIcon
    },
    {
      label: LabelButton.UNPUBLISH,
      condition: args.status === StatusType.APPROVED,
      roles: [USER_ROLES_NAME.ADMIN],
      color: "secondary",
      icon: UnpublishedIcon
    },
    {
      label: LabelButton.REJECT,
      condition: args.status === StatusType.WAITING,
      roles: [USER_ROLES_NAME.ADMIN],
      color: "error",
      icon: UnpublishedIcon
    },
    {
      label: LabelButton.PREVIEW,
      condition: !!args.id,
      roles: [USER_ROLES_NAME.ADMIN, USER_ROLES_NAME.HR],
      variant: "outlined",
      color: "primary",
      icon: PreviewIcon
    }
  ]
}

function NewsFormButtonBar(props: INewsFormButtonBarProps) {
  const buttons: IButton[] = buttonArray(props)

  const isSatisfiedCondition = (button: IButton) => {
    const roleCondition = button.roles?.filter((role) =>
      props.roles.includes(role)
    )

    const satisfiedCondition = button.condition
    const satisfiedRoleCondition =
      !button.roles?.length || !!roleCondition?.length

    return satisfiedCondition && satisfiedRoleCondition
  }

  return (
    <Box display="flex" flexDirection="row" gap="0.5rem">
      {buttons.map((button, index) => {
        const satisfiedCondition = isSatisfiedCondition(button)
        const Icon = button.icon

        if (satisfiedCondition) {
          return (
            <LoadingButton
              key={index}
              loading={
                !!(props.pIsLoading && props.labelLoading === button.label)
              }
              variant={button.variant ?? "contained"}
              disabled={props.isSubmitting}
              onClick={(e) => {
                e.preventDefault()
                props.onSubmit(button.label)
              }}
              color={button.color}
              type="submit"
              startIcon={<Icon />}
              loadingPosition="start"
              sx={{
                fontWeight: 500
              }}
            >
              {button.label}
            </LoadingButton>
          )
        }
      })}
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  pIsLoading: state.global.isLoading
})

export default connect(mapStateToProps)(NewsFormButtonBar)

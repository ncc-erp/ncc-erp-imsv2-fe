import React, { useMemo } from "react"
import {
  Button,
  IconButton,
  Modal,
  ModalProps,
  ButtonProps,
  CardContent,
  CardHeader,
  CardActions
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { ResponsiveStyleValue, StyledEngineProvider } from "@mui/system"
import { Theme } from "@mui/material/styles"

const POSITION = {
  CENTER: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  LEFT: {
    left: 0
  },
  RIGHT: {
    right: 0
  }
}

interface IButton {
  title?: string
  isShow?: boolean
}

interface IModal {
  iconHeader?: React.ReactNode
  header?: {
    title: string
    style?: React.CSSProperties
    className?: string
  }
  position?: keyof typeof POSITION
  minWidth?: number | string
  height?: number | string
  contentClassName?: string
  saveButton?: IButton & ButtonProps
  cancelButton?: IButton & ButtonProps
  extraButton?: (IButton & ButtonProps)[]
  justifyContentButton?: ResponsiveStyleValue<
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-around"
    | "space-between"
    | "space-evenly"
  >
  directionButton?: ResponsiveStyleValue<
    "column" | "column-reverse" | "row" | "row-reverse"
  >
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    margin: theme.spacing(1)
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    flexDirection: "column",
    overflowWrap: "break-word",
    maxWidth: "100%",
    maxHeight: "80%"
  },
  content: {
    flex: 1,
    overflowX: "hidden",
    overflowY: "auto",
    "&.MuiCardContent-root": {
      padding: "0 20px"
    },
    border: `1px solid ${theme.palette.grey[300]}`,
    borderWidth: "1px 0"
  },
  button: {
    fontWeight: theme.typography.fontWeightBold,
    "&:disabled": {
      opacity: 0.5
    }
  }
}))
function IMSModal(props: IModal & ModalProps) {
  const classes = useStyles()
  const {
    children,
    header,
    iconHeader,
    position = "CENTER",
    minWidth = 420,
    height,
    title,
    open,
    style,
    saveButton,
    cancelButton,
    extraButton,
    directionButton = "row",
    justifyContentButton = "flex-end",
    contentClassName,
    ...prop
  } = props

  const ButtonList = useMemo(() => {
    const saveBtn = {
      title: saveButton?.title || "Save",
      isShow: saveButton?.isShow || true,
      className: classes.save_button,
      ...saveButton
    }
    const cancelBtn = {
      title: cancelButton?.title || "Cancel",
      isShow: cancelButton?.isShow || true,
      className: classes.cancel_button,
      ...cancelButton
    }
    return [
      cancelBtn,
      saveBtn,
      ...(extraButton?.map((button) => ({
        isShow: button?.isShow || true,
        ...button
      })) || [])
    ]
  }, [saveButton, cancelButton, extraButton])
  return (
    <StyledEngineProvider injectFirst>
      <Modal
        className={classes.root}
        {...prop}
        onClose={cancelButton?.onClick}
        open={open}
      >
        <div
          style={{
            ...POSITION[position],
            ...style,
            minWidth: minWidth,
            height: height
          }}
          className={classes.container}
        >
          {header && (
            <CardHeader
              style={header?.style}
              className={header.className}
              avatar={iconHeader}
              titleTypographyProps={{ variant: "h4" }}
              title={header?.title}
              action={
                <IconButton onClick={cancelButton?.onClick}>
                  <CloseOutlinedIcon />
                </IconButton>
              }
            />
          )}
          <CardContent
            className={`${classes.content} ${contentClassName || ""}`}
          >
            {children}
          </CardContent>
          <CardActions
            sx={{
              justifyContent: justifyContentButton,
              flexDirection: directionButton,
              flexWrap: "wrap",
              padding: "16px"
            }}
          >
            {ButtonList?.map((button, index) => {
              const { title, className, isShow, ...props } = button
              return (
                isShow && (
                  <Button
                    key={index}
                    variant="contained"
                    className={`${classes.button} ${className} `}
                    {...props}
                  >
                    {title || ""}
                  </Button>
                )
              )
            })}
          </CardActions>
        </div>
      </Modal>
    </StyledEngineProvider>
  )
}

export default IMSModal

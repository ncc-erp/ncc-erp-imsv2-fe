import {
  CardHeader,
  Button,
  CardContent,
  TextField,
  Typography,
  Theme
} from "@mui/material"
import React, { useMemo } from "react"
import { makeStyles } from "@mui/styles"
import { ISubmitWidgetsPayload, IWidgetRes } from "@/types"
import { useOutletContext } from "react-router-dom"
import { ContextType } from "@/layouts/MainLayout"
import { connect } from "react-redux"
import { AppDispatch, AppState } from "@/store"
import {
  getCurrentWidgets,
  submitCurrentWidgets
} from "@/store/widget/thunkApi"
import { sWidgetLayout, sWidgets } from "@/store/widget/selector"
import IMSImage from "@/components/Image/IMSImage"

const useStyles = makeStyles<Theme>((theme) => ({
  col_widget: {
    backgroundColor: theme.palette.common.white,
    width: 460,
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  containerAction: {
    "& :nth-child(1)": {
      marginRight: theme.spacing(2)
    },
    "& button": {
      fontWeight: "bold"
    }
  },
  list_widget: {
    overflowY: "scroll",
    flex: 1
  },
  widget: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    height: 120,
    margin: 5,
    display: "flex",
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    "&:hover": {
      backgroundColor: theme.palette.grey[200]
    }
  },
  widget_content: {
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    textAlign: "start"
  },
  item_image: {
    border: `1px solid ${theme.palette.grey[500]}`
  }
}))

interface IWidgetResConfigLayoutProps {
  dataSubmit: ISubmitWidgetsPayload[]
  pWidgetLayout: ReactGridLayout.Layout[]
  pWidgets: IWidgetRes[]
  layoutState: {
    layouts: ReactGridLayout.Layout[]
    setLayouts: React.Dispatch<React.SetStateAction<ReactGridLayout.Layout[]>>
  }
  setWidgetDropped: React.Dispatch<React.SetStateAction<IWidgetRes>>
  pSubmitCurrentWidgets: (payload: ISubmitWidgetsPayload[]) => Promise<unknown>
  pFetchCurrentWidgets: () => Promise<unknown>
}

function WidgetConfigLayout(props: IWidgetResConfigLayoutProps) {
  const {
    dataSubmit,
    pWidgetLayout,
    pWidgets,
    layoutState: { layouts, setLayouts },
    setWidgetDropped,
    pSubmitCurrentWidgets,
    pFetchCurrentWidgets
  } = props
  const classes = useStyles()
  const { setConfigWidget } = useOutletContext<ContextType>()

  const widgetOps = useMemo(() => {
    return pWidgets.filter((widget) =>
      layouts.every((currentWidget) => +currentWidget?.i !== widget.code)
    )
  }, [layouts])

  const onDrag = (
    e: React.DragEvent<HTMLDivElement>,
    widget: IWidgetRes
  ): void => {
    setWidgetDropped(widget)
  }
  const handleSave = async () => {
    await pSubmitCurrentWidgets(dataSubmit)
    pFetchCurrentWidgets()
    setConfigWidget(false)
  }

  const handleCancel = () => {
    setLayouts(pWidgetLayout)
    setConfigWidget(false)
  }

  return (
    <div className={classes.col_widget}>
      <CardHeader
        title="Add Widget"
        titleTypographyProps={{ variant: "h4" }}
        action={
          <div className={classes.containerAction}>
            <Button variant="outlined" color="dark" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        }
      />
      <CardContent>
        <TextField
          size="medium"
          fullWidth={true}
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
      </CardContent>
      <div className={classes.list_widget}>
        {widgetOps.map((widget) => (
          <div
            key={widget.id}
            className={classes.widget}
            onDragStart={(e) => {
              onDrag(e, widget)
            }}
            onDragEnd={(e) => {
              e.preventDefault()
            }}
            draggable={true}
            data-grid={widget}
          >
            <IMSImage
              mode="square"
              alt={widget.title}
              className={classes.item_image}
              src={widget.thumbnailImage}
              sx={{ width: 100, height: 100 }}
            />
            <div className={classes.widget_content}>
              <Typography variant="h5">{widget.title}</Typography>
              <Typography variant="body2">{widget.description}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  pWidgetLayout: sWidgetLayout(state),
  pWidgets: sWidgets(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pSubmitCurrentWidgets: (payload: ISubmitWidgetsPayload[]) =>
    dispatch(submitCurrentWidgets(payload)),
  pFetchCurrentWidgets: () => dispatch(getCurrentWidgets())
})

export default connect(mapStateToProps, mapDispatchToProps)(WidgetConfigLayout)

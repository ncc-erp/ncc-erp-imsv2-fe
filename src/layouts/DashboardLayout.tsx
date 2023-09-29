import "@/assets/css/react-grid-layout.css"
import "@/assets/css/react-resizable.css"
import { HEADER_HEIGHT } from "@/enums/layout"
import IMSModal from "@/components/Modal"
import { WidgetConfigLayout, WidgetGridLayout } from "@/features/Widget"
import { ContextType } from "@/layouts/MainLayout"
import { ISubmitWidgetsPayload, IWidgetRes } from "@/types"
import { makeStyles } from "@mui/styles"
import React, { useMemo, useState } from "react"
import ReactGridLayout from "react-grid-layout"
import { useOutletContext } from "react-router-dom"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    height: `calc(100vh - ${HEADER_HEIGHT}px) !important`
  }
})

export interface IGridWidgetLayoutProps {
  widgetList: IWidgetRes[]
  layoutState: {
    layouts: ReactGridLayout.Layout[]
    setLayouts: React.Dispatch<React.SetStateAction<ReactGridLayout.Layout[]>>
  }
}

export default function GridWidgetLayout(props: IGridWidgetLayoutProps) {
  const {
    widgetList,
    layoutState: { layouts }
  } = props

  const classes = useStyles()

  const { isConfigWidget } = useOutletContext<ContextType>()

  const [openConfig, setOpenConfig] = useState(false)
  const [widgetDropped, setWidgetDropped] = useState<IWidgetRes>(
    {} as IWidgetRes
  )

  const handleClose = () => setOpenConfig(false)

  const dataSubmit = useMemo((): ISubmitWidgetsPayload[] => {
    return layouts.map((layout) => {
      const widget = widgetList.find((widget) => +layout.i === widget.code)
      return {
        posX: layout.x,
        posY: layout.y,
        width: layout.w,
        height: layout.h,
        widgetCode: widget?.code || 0,
        title: widget?.title || "",
        maxHeight: widget?.maxHeight,
        maxWidth: widget?.maxWidth,
        widgetId: widget?.id
      }
    })
  }, [widgetList, layouts])

  return (
    <div className={classes.root}>
      <WidgetGridLayout
        isConfigWidget={isConfigWidget}
        layoutState={props.layoutState}
        setOpenConfig={setOpenConfig}
        widgetList={widgetList}
        widgetDropped={widgetDropped}
      />
      {isConfigWidget && (
        <WidgetConfigLayout
          layoutState={props.layoutState}
          dataSubmit={dataSubmit}
          setWidgetDropped={setWidgetDropped}
        />
      )}
      <IMSModal
        header={{ title: "Config" }}
        position="RIGHT"
        height="100%"
        open={openConfig}
        saveButton={{
          color: "dark"
        }}
        cancelButton={{
          onClick: handleClose,
          color: "dark",
          variant: "outlined"
        }}
      >
        <div style={{ flex: 1 }}>Content</div>
      </IMSModal>
    </div>
  )
}

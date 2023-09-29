import { HEADER_HEIGHT } from "@/enums/layout"
import { WidgetCard } from "@/features/Widget"
import { IWidgetRes, WIDGET_TYPE } from "@/types"
import { makeStyles } from "@mui/styles"
import React, { useEffect, useMemo, useRef, useState } from "react"
import ReactGridLayout from "react-grid-layout"
import styled from "styled-components"
import "@/assets/css/react-grid-layout.css"
import "@/assets/css/react-resizable.css"
import { IGridWidgetLayoutProps } from "@/layouts/DashboardLayout"
import { Theme } from "@mui/material"

const WidgetStyle = styled.div`
  .react-grid-item.react-grid-placeholder {
    background-color: #d7e2f1;
    opacity: 1;
    border: 2px dashed #a0c2f1;
  }
`

const EDIT_MODE_SPACING = 24

export const WIDGET_WIDTH = 160

const DASHBOARD_COL = 90

export const WIDGET_SPACING = 10

export const WIDGET_PADDING = 18

const useStyles = makeStyles<Theme>((theme) => ({
  layout: {
    minWidth: "100%",
    backgroundColor: theme.palette.grey[50],
    overflow: "hidden",
    backgroundSize: ` ${WIDGET_WIDTH}.1px ${WIDGET_WIDTH}px`,
    backgroundPosition: `-${WIDGET_SPACING}px -${WIDGET_SPACING}px`,
    backgroundAttachment: "local",
    padding: EDIT_MODE_SPACING
  },
  showStripped: {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, .7) ${WIDGET_SPACING}px, transparent .1em), linear-gradient(90deg, rgba(255, 255, 255, .7) ${WIDGET_SPACING}px, transparent .1em)`,
    padding: 0,
    margin: EDIT_MODE_SPACING,
    backgroundColor: theme.palette.grey[200]
  },
  item_layout: {
    borderRadius: 8,
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    padding: WIDGET_PADDING,
    textAlign: "left",
    boxShadow: `4px 4px 16px 2px ${theme.palette.grey[200]}`
  },
  item_layout_edit: {
    "&:hover": {
      cursor: "move"
    }
  }
}))

interface IGridLayout extends IGridWidgetLayoutProps {
  isConfigWidget: boolean
  widgetDropped: IWidgetRes
  setOpenConfig: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WidgetGridLayout(props: IGridLayout) {
  const {
    widgetList,
    layoutState: { layouts, setLayouts },
    isConfigWidget,
    widgetDropped,
    setOpenConfig
  } = props
  const classes = useStyles()
  const gridLayoutRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  let pos = {
    top: 0,
    left: 0,
    x: 0,
    y: 0
  }

  const layoutList = useMemo(() => {
    return layouts.map((layout) => ({
      ...layout,
      data: widgetList.find((widget) => widget.code === +layout.i)
    }))
  }, [layouts, widgetList])

  const onDrag = (
    layout: ReactGridLayout.Layout[],
    oldItem: ReactGridLayout.Layout,
    newItem: ReactGridLayout.Layout,
    placeholder: ReactGridLayout.Layout,
    event: MouseEvent,
    element: HTMLElement
  ) => {
    const scrollLeft = element.offsetParent?.parentElement?.scrollLeft || 0
    const scrollTop = element.offsetParent?.parentElement?.scrollTop || 0
    setWidth(width + scrollLeft)
    setHeight(height + scrollTop)
  }

  const onDrop = (
    layout: ReactGridLayout.Layout[],
    item: ReactGridLayout.Layout
  ) => {
    setLayouts(layout)
  }
  const onRemove = (widget: IWidgetRes) => {
    setLayouts((layouts) =>
      layouts.filter(
        (layout: ReactGridLayout.Layout) => +layout.i !== widget?.code
      )
    )
  }
  const onLayoutChange = (layout: ReactGridLayout.Layout[]) => {
    setLayouts(layout)
  }

  const mouseDownHandler = (e: MouseEvent) => {
    if ((e.target as Element).className.includes(classes.layout)) {
      pos = {
        left: gridLayoutRef?.current?.scrollLeft || 0,
        top: gridLayoutRef?.current?.scrollTop || 0,
        x: e?.clientX || 0,
        y: e?.clientY || 0
      }
      if (gridLayoutRef.current) {
        gridLayoutRef.current.style.cursor = "grabbing"
      }

      document.addEventListener("mousemove", mouseMoveHandler)
      document.addEventListener("mouseup", mouseUpHandler)
    }
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    const dx = e.clientX - pos.x
    const dy = e.clientY - pos.y
    if (gridLayoutRef.current) {
      gridLayoutRef.current.scrollTop = pos.top - dy
      gridLayoutRef.current.scrollLeft = pos.left - dx
    }
  }

  const mouseUpHandler = () => {
    document.removeEventListener("mousemove", mouseMoveHandler)
    document.removeEventListener("mouseup", mouseUpHandler)
    if (gridLayoutRef.current) {
      gridLayoutRef.current.style.cursor = "default"
    }
  }

  useEffect(() => {
    gridLayoutRef?.current?.addEventListener("mousedown", mouseDownHandler)

    return () => {
      gridLayoutRef?.current?.removeEventListener("mousedown", mouseDownHandler)
    }
  }, [gridLayoutRef])

  useEffect(() => {
    setHeight(
      Math.max(...layoutList.map((layout) => layout.y + layout.h)) *
        WIDGET_WIDTH
    )
    setWidth(
      Math.max(...layoutList.map((layout) => layout.x + layout.w)) *
        WIDGET_WIDTH
    )
  }, [layoutList])

  return (
    <WidgetStyle ref={gridLayoutRef} style={{ flex: 1, overflow: "auto" }}>
      <ReactGridLayout
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${
            EDIT_MODE_SPACING * (isConfigWidget ? 2 : 0)
          }px) `,
          height: `${height + WIDGET_WIDTH / 2}px`,
          width: `${width + WIDGET_WIDTH / 2}px`
        }}
        className={`${classes.layout} ${
          isConfigWidget ? classes.showStripped : ""
        }`}
        layout={layouts}
        rowHeight={WIDGET_WIDTH - WIDGET_SPACING}
        onDrag={onDrag}
        isDroppable={isConfigWidget}
        onDrop={onDrop}
        verticalCompact
        compactType={null}
        onLayoutChange={onLayoutChange}
        droppingItem={{
          h: widgetDropped.defaultHeight || 0,
          w: widgetDropped.defaultWidth || 0,
          i: widgetDropped?.code?.toString() || ""
        }}
        isResizable={false}
        isDraggable={isConfigWidget}
        cols={DASHBOARD_COL}
        width={DASHBOARD_COL * WIDGET_WIDTH}
        containerPadding={[0, 0]}
        margin={[WIDGET_SPACING, WIDGET_SPACING]}
        preventCollision
      >
        {layoutList.map(({ data, ...layout }) => (
          <div
            key={layout.i}
            data-grid={layout}
            className={`${isConfigWidget ? classes.item_layout_edit : ""} ${
              classes.item_layout
            }`}
          >
            <WidgetCard
              title={data?.title || ""}
              isEdit={isConfigWidget}
              widgetType={data?.code as WIDGET_TYPE}
              onRemove={() => {
                onRemove(data as IWidgetRes)
              }}
              onSettings={() => {
                setOpenConfig(true)
              }}
              currentWidth={layout?.w || 0}
              currentHeight={layout?.h || 0}
            />
          </div>
        ))}
      </ReactGridLayout>
    </WidgetStyle>
  )
}

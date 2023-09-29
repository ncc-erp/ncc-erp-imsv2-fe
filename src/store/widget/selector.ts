import RGL from "react-grid-layout"
import { createSelector } from "reselect"
import { AppState } from ".."

const getWidgets = (state: AppState) => state.widget.widgets
export const sWidgets = createSelector(getWidgets, (state) => state)

const getWidgetLayout = (state: AppState) => state.widget.currentWidgets
export const sWidgetLayout = createSelector(
  getWidgetLayout,
  (state): RGL.Layout[] =>
    state?.map((widget) => {
      return {
        x: widget.posX,
        y: widget.posY,
        w: widget.width,
        h: widget.height,
        i: widget?.widgetCode?.toString() || "",
        maxW: widget?.maxWidth,
        maxH: widget?.maxHeight,
      }
    }),
)

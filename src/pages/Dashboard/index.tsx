import DashboardLayout from "@/layouts/DashboardLayout"
import { AppDispatch, AppState } from "@/store"
import { sWidgetLayout, sWidgets } from "@/store/widget/selector"
import { getAllWidgets, getCurrentWidgets } from "@/store/widget/thunkApi"
import { IWidgetRes } from "@/types"
import { useEffect, useState } from "react"
import ReactGridLayout from "react-grid-layout"
import { connect } from "react-redux"
import "/node_modules/react-grid-layout/css/styles.css"
import "/node_modules/react-resizable/css/styles.css"

interface IGridWidgetPageProps {
  pWidgetList: IWidgetRes[]
  pWidgetLayout: ReactGridLayout.Layout[]
  pFetchWidgetList: () => Promise<unknown>
  pFetchCurrentWidgets: () => Promise<unknown>
}

function DashboardPage(props: IGridWidgetPageProps) {
  const { pFetchWidgetList, pWidgetList, pFetchCurrentWidgets, pWidgetLayout } =
    props

  const [layouts, setLayouts] = useState<ReactGridLayout.Layout[]>([])

  useEffect(() => {
    pFetchWidgetList()
    pFetchCurrentWidgets()
  }, [])

  useEffect(() => {
    setLayouts(pWidgetLayout)
  }, [pWidgetLayout])

  return (
    <DashboardLayout
      widgetList={pWidgetList}
      layoutState={{ layouts, setLayouts }}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  pWidgetList: sWidgets(state),
  pWidgetLayout: sWidgetLayout(state),
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pFetchWidgetList: () => dispatch(getAllWidgets()),
  pFetchCurrentWidgets: () => dispatch(getCurrentWidgets()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)

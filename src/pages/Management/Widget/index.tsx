import { IMSModal } from "@/components"
import { ColumnWidgetId } from "@/enums/widget"
import { TableWidget, WidgetForm } from "@/pages/Management/Widget/components"
import { AppDispatch, AppState } from "@/store"
import { getAllWidgetsAdmin, updateWidget } from "@/store/widget/thunkApi"
import { IWidgetColumn, IWidgetForm, IWidgetRes } from "@/types"
import { Box } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
export interface IWidgetProps {
  pWidgets: IWidgetRes[]
  pGetAllAdminWidgets: () => Promise<unknown>
  pUpdateWidget: (widget: FormData) => Promise<unknown>
}

const columns: IWidgetColumn[] = [
  {
    id: ColumnWidgetId.THUMBNAIL_IMAGE,
    label: "Thumbnail"
  },
  {
    id: ColumnWidgetId.TITLE,
    label: "Title"
  },
  {
    id: ColumnWidgetId.ACTIVE,
    label: "Active"
  },
  {
    id: ColumnWidgetId.DEFAULT_WIDTH,
    label: "Default Width"
  },
  {
    id: ColumnWidgetId.DEFAULT_HEIGHT,
    label: "Default Height"
  },
  {
    id: ColumnWidgetId.MAX_WIDTH,
    label: "Max Width"
  },
  {
    id: ColumnWidgetId.MAX_HEIGHT,
    label: "Max Height"
  }
]

const initValuesForm: IWidgetForm = {
  id: 0,
  title: "",
  description: "",
  defaultHeight: 0,
  defaultWidth: 0,
  thumbnailImageFile: undefined,
  url: "",
  maxHeight: 0,
  maxWidth: 0,
  isEnabled: true,
  entityTypeId: 0
}
const schema = yup.object().shape({
  title: yup.string().required("Please enter title."),
  description: yup.string().required("Please enter description"),
  code: yup.number().min(1, "Please enter code greater than 0."),
  defaultHeight: yup
    .number()
    .min(1, "Please enter default height greater than 0."),
  defaultWidth: yup
    .number()
    .min(1, "Please enter default width greater than 0."),
  maxHeight: yup.number().required("Please enter max height greater than 0."),
  maxWidth: yup.number().required("Please enter max width greater than 0."),
  isEnabled: yup.boolean()
})

function ManageWidget({
  pWidgets,
  pGetAllAdminWidgets,
  pUpdateWidget
}: IWidgetProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [initValues, setInitValues] = useState<IWidgetForm>(initValuesForm)

  useEffect(() => {
    pGetAllAdminWidgets()
  }, [])

  const newWidgets = useMemo(() => {
    return pWidgets.length > 0 ? pWidgets : []
  }, [pWidgets])

  const defaultValues = useMemo(() => {
    return initValues
  }, [initValues])

  const form = useForm<IWidgetForm>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    form.reset(initValues)
  }, [initValues.id, initValues])

  const handleConvertFormData = (values: IWidgetForm) => {
    const formData = new FormData()
    Object.keys(values).forEach((key) => {
      const field = key as keyof IWidgetForm
      const value = values[field]
      if (value instanceof File) {
        formData.append(field, value as File)
      } else if (typeof value === "string") {
        formData.append(field, value)
      } else {
        formData.append(field, JSON.stringify(value))
      }
    })
    return formData
  }

  const handleSubmitValues = async (values: IWidgetForm) => {
    values.thumbnailImage = values.thumbnailImageFile
      ? values.thumbnailImage
      : ""
    const newValues = handleConvertFormData(values)
    await pUpdateWidget(newValues)
  }

  const handleSubmit = async (values: IWidgetForm) => {
    await handleSubmitValues({ ...values, id: initValues.id })
    await pGetAllAdminWidgets()
    handleClose()
  }
  const handleClose = () => {
    setOpen(false)
    form.reset()
  }

  return (
    <Box>
      <Box>
        <TableWidget
          columns={columns}
          widgets={newWidgets}
          setOpen={setOpen}
          setInitValues={setInitValues}
        />
      </Box>
      <IMSModal
        header={{ title: "Update Widget" }}
        position="CENTER"
        height={"100%"}
        open={open}
        saveButton={{
          color: "primary",
          onClick: form.handleSubmit(handleSubmit)
        }}
        cancelButton={{
          onClick: handleClose,
          color: "primary",
          variant: "outlined"
        }}
      >
        <WidgetForm initValues={initValues} form={form} />
      </IMSModal>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    pWidgets: state.widget.widgets
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    pGetAllAdminWidgets: () => dispatch(getAllWidgetsAdmin()),
    pUpdateWidget: (widget: FormData) => dispatch(updateWidget(widget))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageWidget)

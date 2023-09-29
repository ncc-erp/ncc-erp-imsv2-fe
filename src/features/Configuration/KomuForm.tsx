import IMSSwitch from "@/components/Input/IMSSwitch"
import { AppDispatch } from "@/store"
import { updateKomuConfig } from "@/store/config/thunkApi"
import { IKomu } from "@/types"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { connect } from "react-redux"
import FormConfig from "./components/FormConfig"
import LabelConfig from "./components/LabelConfig"

export interface IKomuForm {
  initValues: IKomu
  pUpdateKomuConfig: (data: IKomu) => Promise<unknown>
}

function KomuForm({ initValues, pUpdateKomuConfig }: IKomuForm) {
  const [isEdit, setEdit] = useState(false)

  const { control, reset, handleSubmit } = useForm<IKomu>({
    defaultValues: initValues
  })

  const handleEdit = () => {
    setEdit(true)
  }

  const handleCancel = () => {
    reset(initValues)
    setEdit(false)
  }

  const onSubmit = (data: IKomu) => {
    pUpdateKomuConfig(data)
    setEdit(false)
  }

  useEffect(() => {
    reset(initValues)
  }, [initValues])

  return (
    <FormConfig
      handleEdit={handleEdit}
      isEdit={isEdit}
      onCancel={handleCancel}
      onSubmit={handleSubmit(onSubmit)}
      title="Komu"
    >
      <LabelConfig label="Enable To Notice Komu">
        <IMSSwitch
          disabled={!isEdit}
          control={control}
          name="enableToNoticeKomu"
        />
      </LabelConfig>
      <LabelConfig label="Enable Allow Check In IMS For All">
        <IMSSwitch
          disabled={!isEdit}
          control={control}
          name="enableAllowCheckInIMSForAll"
        />
      </LabelConfig>
    </FormConfig>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pUpdateKomuConfig: (data: IKomu) => dispatch(updateKomuConfig(data))
})

export default connect(null, mapDispatchToProps)(KomuForm)

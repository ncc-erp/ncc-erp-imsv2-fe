import IMSSwitch from "@/components/Input/IMSSwitch"
import IMSTextField from "@/components/Input/IMSTextField"
import { AppDispatch } from "@/store"
import { updateEmailConfig } from "@/store/config/thunkApi"
import { IEmailSetting } from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { connect } from "react-redux"
import * as yup from "yup"
import FormConfig from "./components/FormConfig"
import LabelConfig from "./components/LabelConfig"

export interface IEmailForm {
  initValues: IEmailSetting
  pUpdateEmailConfig: (data: IEmailSetting) => Promise<unknown>
}

function EmailForm({ initValues, pUpdateEmailConfig }: IEmailForm) {
  const schema = yup.object().shape({
    host: yup.string().required("Please enter host."),
    port: yup.string().required("Please enter port."),
    defaultFromDisplayName: yup.string().required("Please enter display name."),
    userName: yup.string().required("Please enter user name."),
    password: yup.string().required("Please enter password."),
    defaultFromAddress: yup
      .string()
      .required("Please enter default from address.")
  })

  const [isEdit, setEdit] = useState(false)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<IEmailSetting>({
    defaultValues: initValues,
    resolver: yupResolver(schema)
  })

  const handleEdit = () => {
    setEdit(true)
  }

  const handleCancel = () => {
    reset(initValues)
    setEdit(false)
  }

  const onSubmit = (data: IEmailSetting) => {
    pUpdateEmailConfig(data)
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
      title="Email Setting"
    >
      <LabelConfig error={errors.host?.message} label="Host">
        <IMSTextField disabled={!isEdit} control={control} name="host" />
      </LabelConfig>
      <LabelConfig error={errors.port?.message} label="Port">
        <IMSTextField disabled={!isEdit} control={control} name="port" />
      </LabelConfig>
      <LabelConfig
        error={errors.defaultFromDisplayName?.message}
        label="Display Name"
      >
        <IMSTextField
          disabled={!isEdit}
          control={control}
          name="defaultFromDisplayName"
        />
      </LabelConfig>
      <LabelConfig error={errors.userName?.message} label="User Name">
        <IMSTextField disabled={!isEdit} control={control} name="userName" />
      </LabelConfig>
      <LabelConfig error={errors.password?.message} label="Password">
        <IMSTextField
          disabled={!isEdit}
          secureTextEntry
          control={control}
          name="password"
        />
      </LabelConfig>
      <LabelConfig label="Enable Ssl">
        <IMSSwitch disabled={!isEdit} control={control} name="enableSsl" />
      </LabelConfig>
      <LabelConfig
        error={errors.defaultFromAddress?.message}
        label="Default From Address"
      >
        <IMSTextField
          disabled={!isEdit}
          control={control}
          name="defaultFromAddress"
        />
      </LabelConfig>
    </FormConfig>
  )
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pUpdateEmailConfig: (data: IEmailSetting) => dispatch(updateEmailConfig(data))
})

export default connect(null, mapDispatchToProps)(EmailForm)

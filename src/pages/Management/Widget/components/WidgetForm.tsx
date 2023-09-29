import {
  CheckBoxWidgetField,
  DescriptionField,
  InputWidgetField,
  NumberField,
  PictureField
} from "@/components/Form"
import { IWidgetForm } from "@/types"
import { Box, styled } from "@mui/material"
import { UseFormReturn } from "react-hook-form"
import { makeStyles } from "@mui/styles"

export interface IWidgetFormProps {
  initValues: IWidgetForm
  form: UseFormReturn<IWidgetForm, any>
}

const WidgetModalForm = styled("form")({
  position: "relative",
  width: "100%"
})
const WidgetModalFormField = styled(Box)(({ theme }) => ({
  width: "100%",

  overflow: "auto",
  padding: theme.spacing(1, 2.5)
}))
const useStyles = makeStyles({
  widthHeightSection: {
    display: "flex",
    gap: 30
  }
})
export function WidgetForm({ initValues, form }: IWidgetFormProps) {
  const { isSubmitting } = form.formState
  const styles = useStyles()

  return (
    <WidgetModalForm noValidate>
      <WidgetModalFormField>
        <InputWidgetField
          form={form}
          name="title"
          label="Title"
          disabled={isSubmitting}
        />
        <DescriptionField
          form={form}
          name="description"
          label="Description"
          disabled={isSubmitting}
          required={true}
        />
        <NumberField
          form={form}
          name="code"
          label="Code"
          disabled={isSubmitting || Boolean(initValues?.id)}
          required={true}
        />
        <InputWidgetField
          form={form}
          name="url"
          label="Url"
          disabled={isSubmitting}
        />
        <div className={styles.widthHeightSection}>
          <NumberField
            form={form}
            name="defaultWidth"
            label="Default Width"
            disabled={isSubmitting}
            required={true}
          />
          <NumberField
            form={form}
            name="defaultHeight"
            label="Default Height"
            disabled={isSubmitting}
            required={true}
          />
        </div>
        <div className={styles.widthHeightSection}>
          <NumberField
            form={form}
            name="maxWidth"
            label="Max Width"
            disabled={isSubmitting}
            required={true}
          />
          <NumberField
            form={form}
            name="maxHeight"
            label="Max Height"
            disabled={isSubmitting}
            required={true}
          />
        </div>
        <PictureField
          form={form}
          name="thumbnailImageFile"
          label="Thumbnail Image"
          disabled={isSubmitting}
          placeholder="Choose a image"
          initPreviewImg={initValues.thumbnailImage}
        />

        <CheckBoxWidgetField
          form={form}
          name="isEnabled"
          label="Enabled"
          disabled={isSubmitting}
        />
      </WidgetModalFormField>
    </WidgetModalForm>
  )
}

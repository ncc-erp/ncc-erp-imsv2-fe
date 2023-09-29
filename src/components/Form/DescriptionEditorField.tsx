import { useRef } from "react"
import { Box, FormHelperText } from "@mui/material"
import { fileApi } from "@/api"
import { Editor } from "@tinymce/tinymce-react"
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Editor as TinyMCEEditor } from "tinymce"
import toast from "@/utils/toast"

import { editorToolbars, editorPlugins } from "@/api/__mocks__/data/news"

export interface IDescriptionEditorFieldProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues, unknown>
  name: Path<TFormValues>
  label: string
  disabled: boolean
  placeholder?: string
  required?: boolean
}

export function DescriptionEditorField<TFormValues extends FieldValues>({
  form,
  name,
  placeholder = "",
  disabled
}: IDescriptionEditorFieldProps<TFormValues>) {
  const { control, formState } = form
  const { errors } = formState
  const error = errors[name]
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const filePickerCallback = (cb: (
    value: string,
    meta?: Record<string, any> | undefined
  ) => void) => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/jpg, image/png, image/jpeg")
    input.onchange = function () {
      if (!input.files) return
      const file = input.files[0]
      const reader = new FileReader()
      reader.onload = async () => {
        if (editorRef.current) {
          try {
            const result = await fileApi.postFile({file: file});
            if(result.url) {
              cb(result.url, { title: file.name })
            }
          }
          catch (err: any) {
            toast.error(err?.detail?.message ?? 'File is too large')
          }
        }
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Box m="12px 0" p="0 12px" width="100%">
            <Editor
              onInit={(_, editor) => editorRef.current = editor}
              init={{
                placeholder,
                height: 600,
                menubar: true,
                plugins: editorPlugins,
                toolbar_mode: "wrap",
                toolbar: editorToolbars,
                file_picker_types: "image",
                file_picker_callback: filePickerCallback,
              }}
              value={value}
              disabled={disabled}
              onEditorChange={(content: any) => onChange(content)}
            />

            <FormHelperText
              error={Boolean(error)}
              sx={{
                pl: "32px",
                fontSize: "12px",
                fontWeight: 400
              }}
            >
              {error?.message?.toString()}
            </FormHelperText>
          </Box>
        )
      }}
    />
  )
}

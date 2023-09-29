import React from "react"
import { UseFormReturn } from "react-hook-form"
import { Box, styled } from "@mui/material"
import { PictureFieldV2, InputWidgetField, CheckBoxField , DescriptionField } from "@/components/Form"
import { AlbumSelectField } from "./AlbumSelectField"
import { AlbumDateField } from "./AlbumDateField"
import { IAlbumSave, ICategory } from "@/types"
import { Align } from "@/enums/news"

const AddAlbumWrapper = styled(Box)({
  padding: "12px",
  "& > :not(:nth-of-type(1))": {
    marginTop: "20px"
  },
  "& > :last-child": {
    marginTop: "10px"
  }
})

interface IAddAlbum {
  categories: ICategory[] | null
  form: UseFormReturn<IAlbumSave, unknown>
}

export const AddAlbum = ({ categories, form }: IAddAlbum) => {
  return (
    <AddAlbumWrapper>
      <InputWidgetField
        form={form}
        name="title"
        label="Album name"
        disabled={false}
        required
      />
      <AlbumSelectField
        form={form}
        name="categoryId"
        label="Category"
        disabled={false}
        required
        selectList={categories}
        selectLine={Align.VERTICAL}
      />
      <DescriptionField
        form={form}
        name="description"
        label="Description"
        disabled={false}
        required={false}
      />
      <AlbumDateField
        form={form}
        name="albumTime"
        label="Album time"
        disabled={false}
        disableFuture
        required
      />
      <InputWidgetField
        form={form}
        name="albumUrl"
        label="Album Url"
        disabled={false}
        required
      />
      <PictureFieldV2
        form={form}
        localFile="thumbnailImageFile"
        remoteFile="thumbnailImage"
        label="Thumbnail Image"
        placeholder="Upload a thumbnail image."
        disabled={false}
        initPreviewImg={null}
        required
      />
      <CheckBoxField
        form={form as any}
        label="Enabled"
        name="isActive"
        disabled={false}
      />
    </AddAlbumWrapper>
  )
}

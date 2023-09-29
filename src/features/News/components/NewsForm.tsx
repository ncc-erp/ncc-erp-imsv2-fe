import {
  DateField,
  DescriptionEditorField,
  SapoField,
  SelectField,
  TitleField,
  PictureFieldV2
} from "@/components/Form"
import { AlbumDateField } from "@/features/Albums/component/AlbumDateField"
import {
  Align,
  LabelButton,
  MainCategoriesId,
  PriorityValues,
  StatusType
} from "@/enums/news"
import { NewsFormButtonBar, NewsRelation } from "@/features/News/components"
import { AppDispatch, AppState } from "@/store"
import { sMainCategoryOpt, sSubCategoryOpt } from "@/store/news/selector"
import { getCategories } from "@/store/news/thunkApi"
import { ILabelButton, INewsForm, INewsRes, USER_ROLES_NAME } from "@/types"
import { ISelectData } from "@/types/common"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Checkbox, FormControlLabel, styled, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { isUndefined } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { connect } from "react-redux"
import * as yup from "yup"
import { FileSize } from "@/enums/size"
import { ModalNewsRelationList } from "@/components/Modal"
import moment from "moment"

export interface INewsFormProps {
  initValues: INewsForm
  onSubmit: (values: INewsForm | number, label: ILabelButton) => Promise<void>
  roles: USER_ROLES_NAME[]
  pMainCategories: ISelectData[]
  pSubCategories: (ISelectData & { entityName: string })[]
  pGetCategories: () => Promise<unknown>
  news: INewsRes[]
}

const NewsFormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  columnGap: theme.spacing(3),
  height: "100%",
  overflowY: "auto"
}))

const NewsFormMain = styled(Box)(({ theme }) => ({
  position: "relative",
  flex: "2.5 1",
  borderRadius: theme.spacing(0.75),
  overflow: "hidden",
  border: `2px solid ${theme.palette.grey[300]}`
}))

const NewsFormHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  backgroundColor: "#ffffff",
  borderRadius: theme.spacing(0.75, 0.75, 0, 0),
  borderBottom: `2px solid ${theme.palette.grey[300]}`,
  zIndex: 10,
  
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
    alignItems: "flex-start"
  }
}))

const NewsFormSidebarWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    maxWidth: '190px'
  }
}))

const NewsFormInputContainer = styled(Box)(
  ({ theme }) => ({
    width: "100%",
    // form header position absolute => relative
    overflow: "auto",
    height: "100%",
    backgroundColor: theme.palette.background.paper
  })
)

const NewsFormImageField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(0.75),
  border: `2px solid ${theme.palette.grey[300]}`
}))

const NewsLine = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0, 3),
  borderBottom: `1px solid ${theme.palette.grey[300]}`
}))

const NewsFormGroup = styled(Box)<{
  align?: Align.HORIZONTAL | Align.VERTICAL
}>(({ theme, align = Align.HORIZONTAL }) => ({
  width: "100%",
  display: "flex",
  flexDirection: align === Align.HORIZONTAL ? "row" : "column",
  columnGap: theme.spacing(1)
}))

const CheckboxLabel = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  fontWeight: 500,
  color: theme.palette.grey[500]
}))

export const priorityList: ISelectData[] = [
  {
    id: 1,
    name: "Important",
    value: PriorityValues.IMPORTANT
  },
  {
    id: 2,
    name: "High",
    value: PriorityValues.HIGH
  },
  {
    id: 3,
    name: "Low",
    value: PriorityValues.LOW
  }
]

const IMAGE_MINE_TYPE = ["image/png", "image/jpg", "image/jpeg"]

const schema = yup.object().shape({
  title: yup.string().required("Please enter title of page."),
  sapo: yup.string(),
  description: yup
    .string()
    .required("Please enter description.")
    .test(
      "description-empty",
      "Please enter description.",
      (value: string) => value.replace(/<(.|\n)*?>/g, "").trim().length > 0
    ),
  mainCategory: yup.string().required("Please select main category."),
  subCategory: yup.string().required("Please select sub category."),
  priority: yup.string().required("Please select priority."),
  publishedTime: yup
    .date()
    .label("Publish time")
    .required("Please choose publish time")
    .typeError("Please input a valid date")
    .max(moment().endOf('day'), "Publish time can't be greater than today")
    .min("01/01/1900", "Publish time must start from 01/01/1900"),
  effectiveStartTime: yup
    .date()
    .nullable()
    .when("mainCategory", {
      is: (value: string) => value === MainCategoriesId.EVENTS,
      then: (schema) =>
        schema.test("check-null-date", "Please choose start date.", (value) => {
          return value !== null
        })
    }),
  effectiveEndTime: yup
    .date()
    .nullable()
    .when("mainCategory", {
      is: (value: string) => value === MainCategoriesId.EVENTS,
      then: (schema) =>
        schema
          .test("check-null-date", "Please choose end date.", (value) => {
            return value !== null
          })
          .min(
            yup.ref("effectiveStartTime"),
            "Please choose end date greater than start date."
          )
    }),
  isNotify: yup.boolean(),
  relationNews: yup.array()
})

const createNewSchema = schema.shape({
  thumbnailImageFile: yup
    .mixed<File>()
    .required("Please choose thumbnail image.")
    .test(
      "check-type-thumbnail",
      "Type of thumbnail image is invalid.",
      (file) => (!file || IMAGE_MINE_TYPE.includes(file.type))
    )
    .test("check-size-thumbnail", "Maximum 2MB.", (value) => (!value || (value.size <= 2 * FileSize.MB)))
})

const editNewSchema = schema.shape({
  thumbnailImageFile: yup
    .mixed<File>()
    .when("thumbnailImage", {
      is: "" || undefined,
      then: (schema) =>
        schema
        .required("Please choose thumbnail image.")
        .test(
          "check-type-thumbnail",
          "Type of thumbnail image is invalid.",
          (file) => (!file || IMAGE_MINE_TYPE.includes(file.type))
        )
        .test("check-size-thumbnail", "Maximum 2MB.", (value) => (!value || value.size <= 2 * FileSize.MB)),
      otherwise: (schema) => schema
    })
})

export function NewsForm({
  initValues,
  pMainCategories,
  pSubCategories,
  onSubmit,
  roles,
  news,
  pGetCategories
}: INewsFormProps) {
  const [labelLoading, setLabelLoading] = useState<string>("")
  const [showModalAddNewsRelation, setShowModalAddNewsRelation] =
    useState<boolean>(false)

  const form = useForm<INewsForm>({
    defaultValues: initValues,
    resolver: yupResolver(initValues.id ? editNewSchema : createNewSchema )
  })
  const {
    formState: { isSubmitting },
    getValues,
    watch
  } = form

  const checkDisabled = (status: number | undefined) => {
    if (!status) return

    const statusCheckList = [
      StatusType.APPROVED,
      StatusType.HIDDEN,
      StatusType.WAITING,
      StatusType.DISABLE,
      StatusType.RETURN
    ]
    return statusCheckList.includes(status) || isSubmitting
  }

  const isShowNewsFormHeader = useMemo(() => {
    if (!initValues.status) return false
    const statusList = [
      StatusType.DRAFT,
      StatusType.APPROVED,
      StatusType.HIDDEN,
      StatusType.WAITING
    ]

    return statusList.includes(initValues.status)
  }, [initValues])

  useEffect(() => {
    form.reset(initValues)
    // only reset form values when id is changed
  }, [initValues.id])

  const mainWatch = watch("mainCategory")

  const subCategoryOpt: ISelectData[] = useMemo(() => {
    return pSubCategories
      .filter((sub) => sub.entityName === mainWatch)
      .map((sub) => ({
        id: sub?.id,
        name: sub?.name,
        value: sub?.value
      }))
  }, [mainWatch])

  const handleSetNewsUpdate = (values: INewsForm) => {
    const {
      thumbnailImage,
      thumbnailImageFile,
      ...rest
    } = values
    const newsValues: INewsForm = { ...rest }

    const keyThumbnails: string[] = []
    if (thumbnailImageFile) {
      newsValues["thumbnailImageFile"] = thumbnailImageFile
      keyThumbnails.push("thumbnailImageFile")
    }

    if (keyThumbnails.length === 2) return newsValues

    return { ...newsValues, thumbnailImage }
  }

  const handleSaveSubmit = async (values: INewsForm) => {
    setLabelLoading(LabelButton.SAVE_SUBMIT)
    const newsValues: INewsForm = handleSetNewsUpdate(values)
    await onSubmit(newsValues, LabelButton.SAVE_SUBMIT)
  }

  const handleSaveDraft = async (values: INewsForm) => {
    setLabelLoading(LabelButton.SAVE_DRAFT)
    const newsValues = handleSetNewsUpdate(values)
    await onSubmit(newsValues, LabelButton.SAVE_DRAFT)
  }

  const handleSavePublish = async (values: INewsForm) => {
    setLabelLoading(LabelButton.SAVE_PUBLISH)
    const newsValues: INewsForm = handleSetNewsUpdate(values)
    await onSubmit(newsValues, LabelButton.SAVE_PUBLISH)
  }

  const handlePublish = async (values: INewsForm) => {
    if (!isUndefined(initValues.id)) {
      setLabelLoading(LabelButton.PUBLISH)
      await onSubmit(values, LabelButton.PUBLISH)
    }
  }

  const handleUnpublish = async () => {
    if (!isUndefined(initValues.id)) {
      setLabelLoading(LabelButton.UNPUBLISH)
      await onSubmit(initValues.id, LabelButton.UNPUBLISH)
    }
  }

  const handleReject = async () => {
    if (!isUndefined(initValues.id)) {
      setLabelLoading(LabelButton.REJECT)
      await onSubmit(initValues.id, LabelButton.REJECT)
    }
  }

  const handlePreview = () => {
    const { id } = initValues
    if (!isUndefined(id)) {
      window.open(
        `${window.location.origin}/admin/manage-news/${id}/preview`,
        "_blank"
      )
    }
  }

  const handleDraftReturnNews = async () => {
    if (!isUndefined(initValues.id)) {
      setLabelLoading(LabelButton.RETURN)
      await onSubmit(initValues.id, LabelButton.RETURN)
    }
  }

  const handleSubmit = (label: ILabelButton) => {
    switch (label) {
      case LabelButton.SAVE_PUBLISH:
        form.handleSubmit(handleSavePublish)()
        break
      case LabelButton.SAVE_SUBMIT:
        form.handleSubmit(handleSaveSubmit)()
        break
      case LabelButton.SAVE_DRAFT:
        form.handleSubmit(handleSaveDraft)()
        break
      case LabelButton.PUBLISH:
        form.handleSubmit(handlePublish)()
        break
      case LabelButton.RETURN:
        handleDraftReturnNews()
        break
      case LabelButton.UNPUBLISH:
        handleUnpublish()
        break
      case LabelButton.REJECT:
        handleReject()
        break
      case LabelButton.PREVIEW:
        handlePreview()
        break
      default:
        break
    }
  }

  useEffect(() => {
    pGetCategories()
  }, [])

  const watchRelationNews = form.watch("relationNews")

  const relationNewsList = useMemo(
    () => form.getValues("relationNews"),
    [watchRelationNews]
  )

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        sx={{
          borderRadius: "4px",
          overflow: "hidden",
          height: "100%"
        }}
      >
        <NewsFormContainer>
          <NewsFormMain>
            {isShowNewsFormHeader && (
              <NewsFormHeader>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    color: grey[800]
                  }}
                >
                  {!initValues.id && "Create"}
                  {initValues.id &&
                    initValues.status === StatusType.DRAFT &&
                    "Update"}
                </Typography>
                <Box>
                  <NewsFormButtonBar
                    labelLoading={labelLoading}
                    isUpdate={!!initValues.id}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    roles={roles}
                    status={initValues?.status || StatusType.DRAFT}
                    id={initValues.id}
                  />
                </Box>
              </NewsFormHeader>
            )}
            <NewsFormInputContainer>
              <TitleField
                form={form}
                name="title"
                label="Title"
                placeholder="News title here..."
                required={true}
                disabled={!!checkDisabled(initValues.status)}
              />
              <NewsLine />
              <SapoField
                form={form}
                name="sapo"
                label="Sapo"
                placeholder="News sapo here..."
                required={true}
                disabled={!!checkDisabled(initValues.status)}
              />
              <DescriptionEditorField
                form={form}
                name="description"
                label="Description"
                placeholder="Write your news content here..."
                required={true}
                disabled={!!checkDisabled(initValues.status)}
              />
            </NewsFormInputContainer>
          </NewsFormMain>
          <NewsFormSidebarWrapper
            sx={{
              flex: "1 1"
            }}
          >
            <NewsFormImageField>
              <PictureFieldV2
                form={form}
                localFile="thumbnailImageFile"
                remoteFile="thumbnailImage"
                label="Thumbnail Image"
                placeholder="Upload a thumbnail image."
                disabled={!!checkDisabled(initValues.status)}
                initPreviewImg={initValues.thumbnailImage || null}
              />
              <NewsFormGroup align={Align.VERTICAL}>
                <SelectField
                  form={form}
                  name="mainCategory"
                  label="Main Category"
                  disabled={!!checkDisabled(initValues.status)}
                  required={true}
                  selectList={pMainCategories}
                  selectLine={Align.VERTICAL}
                />
                <SelectField
                  form={form}
                  name="subCategory"
                  label="Sub Category"
                  disabled={!!checkDisabled(initValues.status)}
                  required={true}
                  selectList={subCategoryOpt}
                  selectLine={Align.VERTICAL}
                />
                <SelectField
                  form={form}
                  name="priority"
                  label="Priority"
                  disabled={!!checkDisabled(initValues.status)}
                  required={true}
                  selectList={priorityList}
                  selectLine={Align.VERTICAL}
                />
                <AlbumDateField
                  form={form}
                  name="publishedTime"
                  label="Publish time"
                  disabled={!!checkDisabled(initValues.status)}
                  disableFuture
                  required
                />
              </NewsFormGroup>
              {getValues("mainCategory") === MainCategoriesId.EVENTS && (
                <NewsFormGroup align={Align.VERTICAL}>
                  <DateField
                    form={form}
                    name="effectiveStartTime"
                    label="Effective Start Date"
                    disabled={!!checkDisabled(initValues.status)}
                    required={true}
                  />
                  <DateField
                    form={form}
                    name="effectiveEndTime"
                    label="Effective End Date"
                    disabled={!!checkDisabled(initValues.status)}
                    required={true}
                  />
                </NewsFormGroup>
              )}
              {initValues.status !== StatusType.APPROVED && (
                <Controller
                  control={form.control}
                  name="isNotify"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          onChange={onChange}
                        />
                      }
                      label={(
                        <CheckboxLabel>Enable To Notice Komu</CheckboxLabel>
                      )}
                    />
                  )}
                />
              )}
            </NewsFormImageField>
            <NewsRelation
              setOpen={setShowModalAddNewsRelation}
              relationNewsList={relationNewsList}
              status={initValues.status || StatusType.DRAFT}
            />
          </NewsFormSidebarWrapper>
        </NewsFormContainer>
      </Box>
      <ModalNewsRelationList
        newsList={news}
        open={showModalAddNewsRelation}
        setOpen={setShowModalAddNewsRelation}
      />
    </FormProvider>
  )
}

const mapStateToProps = (state: AppState) => ({
  news: state.news.newsList,
  pMainCategories: sMainCategoryOpt(state),
  pSubCategories: sSubCategoryOpt(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsForm)

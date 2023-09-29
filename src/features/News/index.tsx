import { newsFormValues } from "@/api/__mocks__/data/news"
import { LabelButton } from "@/enums/news"
import NewsForm from "@/features/News/components/NewsForm"
import { AppDispatch, AppState } from "@/store"
import { resetNewsUpdate } from "@/store/news"
import {
  draftReturnNews,
  getAdminNewsDetail,
  getNews,
  publishNews,
  rejectNews,
  savePublishNews,
  saveSubmitODraftNews,
  unpublishNews
} from "@/store/news/thunkApi"
import {
  ILabelButton,
  INewsForm,
  INewsRes,
  INewsValues,
  UserRoles
} from "@/types"
import { IRequestParams, SORT_ENUM } from "@/types/common"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

function CreateNews({
  saveDraftNews,
  saveSubmitNews,
  savePublishNews,
  roles,
  getNews,
  newsUpdate,
  pPublishNews,
  pResetNewsUpdate,
  pUnpublishNews,
  pRejectNews,
  pDraftReturnNews,
  getAdminNewsDetail
}: PropsFromRedux) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initValues, setInitValues] = useState<INewsForm>(newsFormValues)

  useEffect(() => {
    ;(async () => {
      await getNews({
        page: 1,
        size: 50,
        order: SORT_ENUM.DESC,
        orderBy: "publishedTime"
      })
      if (id) {
        await getAdminNewsDetail(Number(id))
      }
    })()
  }, [])

  useEffect(() => {
    setInitValues(newsUpdate as INewsForm)
  }, [newsUpdate])

  useEffect(() => () => {
    pResetNewsUpdate()
  }, [])

  function getNewsToAdd(values: INewsValues): INewsValues {
    let relationNewsIds = ""
    if (values.relationNews) {
      relationNewsIds = values.relationNews.map((news: INewsRes) => news.id).join(",")
    }
    delete values.relationNews
    return {
      ...values,
      teamIds: [],
      relationNewsIds
    }
  }

  const handleResetAndNavigate = () => {
    navigate("/admin/manage-news")
    pResetNewsUpdate()
  }

  const handleSaveSubmitNews = async (values: INewsForm) => {
    const news = getNewsToAdd({
      ...values,
      submit: true
    })

    await saveSubmitNews(news)
    // keep navigate when creating new news
    if(!initValues.id){
      handleResetAndNavigate()
    }
  }

  const handleSaveDraftNews = async (values: INewsForm) => {
    const news: INewsValues = getNewsToAdd({
      ...values,
      submit: false
    })
    await saveDraftNews(news)
    // keep navigate when creating new news
    if(!initValues.id){
      handleResetAndNavigate()
    }
  }

  const handleSavePublishNews = async (values: INewsForm) => {
    const newNews: INewsValues = getNewsToAdd(values)
    await savePublishNews(newNews)
    // keep navigate when creating new news
    if(!initValues.id){
      handleResetAndNavigate()
    }
  }

  const handlePublishNews = async (values: INewsForm) => {
    const { id, isNotify = true } = values
    if (id) {
      await pPublishNews(id, isNotify)
    }
  }

  const handleUnpublishNews = async (id: number) => {
    if (id) {
      await pUnpublishNews(id)
    }
  }

  const handleRejectNews = async (id: number) => {
    if (id) {
      await pRejectNews(id)
    }
  }

  const handleDraftReturnNews = async (id: number) => {
    if (id) {
      await pDraftReturnNews(id)
    }
  }

  const handleValuesSubmit = async (
    values: INewsForm | number,
    label: ILabelButton
  ) => {
    switch (label) {
      case LabelButton.SAVE_PUBLISH:
        await handleSavePublishNews(values as INewsForm)
        break
      case LabelButton.SAVE_SUBMIT:
        await handleSaveSubmitNews(values as INewsForm)
        break
      case LabelButton.SAVE_DRAFT:
        await handleSaveDraftNews(values as INewsForm)
        break
      case LabelButton.PUBLISH:
        await handlePublishNews(values as INewsForm)
        break
      case LabelButton.RETURN:
        await handleDraftReturnNews(values as number)
        break
      case LabelButton.UNPUBLISH:
        await handleUnpublishNews(values as number)
        break
      case LabelButton.REJECT:
        await handleRejectNews(values as number)
        break
      default:
        break
    }
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <NewsForm
        initValues={initValues}
        onSubmit={handleValuesSubmit}
        roles={roles.map((role: UserRoles) => role.name)}
      />
    </Box>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    roles: state.user.userProfile.roles,
    newsUpdate: state.news.newsUpdate
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getAdminNewsDetail: (id: number) => dispatch(getAdminNewsDetail(id)),
    saveSubmitNews: (values: INewsValues) =>
      dispatch(saveSubmitODraftNews(values)),
    saveDraftNews: (values: INewsValues) =>
      dispatch(saveSubmitODraftNews(values)),
    savePublishNews: (values: INewsValues) => dispatch(savePublishNews(values)),
    pPublishNews: (id: number, isNotify: boolean) => dispatch(publishNews({ id, isNotify })),
    pUnpublishNews: (id: number) => dispatch(unpublishNews(id)),
    pRejectNews: (id: number) => dispatch(rejectNews(id)),
    getNews: (params: IRequestParams) => dispatch(getNews(params)),
    pDraftReturnNews: (id: number) => dispatch(draftReturnNews(id)),
    pResetNewsUpdate: () => dispatch(resetNewsUpdate()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CreateNews)

import { IMSTooltip, CircularProgressLoading } from "@/components"
import QuickNewsItem from "@/features/News/QuickNewsItem"
import { AppDispatch, AppState } from "@/store"
import { sIsLoading } from "@/store/global/selectors"
import { getListQuickNews } from "@/store/news/thunkApi"
import theme from "@/themes"
import { IQuickNewsRes, IRequestParams } from "@/types"
import { useEffect, useRef, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import styled from "styled-components"
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll"
import { WIDGET_PADDING, WIDGET_SPACING, WIDGET_WIDTH } from "../GridLayout"

export interface IWidgetQuickNews extends PropsFromStore {
  row?: number
}

function WidgetQuickNews({
  pIsLoading,
  pGetQuickNews,
  row = 0
}: IWidgetQuickNews) {
  const [quickNews, setQuickNews] = useState<IQuickNewsRes[]>([])
  const hasNextPage = useRef<boolean>(true)
  const pageIndex = useRef<number>(1)
  const fetchData = async (page: number) => {
    if (hasNextPage.current) {
      const res = await pGetQuickNews({ page, size: 10 })
      const quickNewRes = res.data as IQuickNewsRes[]
      setQuickNews([...quickNews, ...quickNewRes])
      hasNextPage.current = res.hasNextPage
    }
  }

  useEffect(() => {
    fetchData(pageIndex.current)
  }, [])

  return (
    <StyleQuickNews
      style={{
        height: row * (WIDGET_WIDTH - WIDGET_SPACING) - WIDGET_PADDING * 2
      }}
    >
      <InfiniteScroll
        onEndScroll={() => {
          fetchData(++pageIndex.current)
        }}
        className="quick-news-box"
      >
        {quickNews.map(({ id, content, hover }) => (
          <div className="quick-new" key={id}>
            <IMSTooltip title={hover}>
              <QuickNewsItem content={content} />
            </IMSTooltip>
          </div>
        ))}
        {pIsLoading && <CircularProgressLoading />}
      </InfiniteScroll>
    </StyleQuickNews>
  )
}

const mapStateToProps = (state: AppState) => ({
  pIsLoading: sIsLoading(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pGetQuickNews: (params?: IRequestParams) =>
    dispatch(getListQuickNews(params)).unwrap()
})

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromStore = ConnectedProps<typeof connector>

export default connector(WidgetQuickNews)

const StyleQuickNews = styled.div`
  .quick-news-box {
    height: 100%;
  }
  .quick-new {
    word-wrap: break-word;
    white-space: pre-line;
    font-size: ${theme.typography.h6.fontSize};
    font-weight: ${theme.typography.h6.fontWeight};
    padding: 5px 0;
    border-bottom: 1px solid #8a3434;
  }
  .more-text {
    display: inline-block;
    position: relative;
    font-size: ${theme.typography.h6.fontSize};
    color: #b24747;
    font-weight: ${theme.typography.h6.fontWeight};
    cursor: pointer;
    &:hover {
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        border-bottom: 1px solid #8a3434;
        width: -webkit-fill-available;
        height: 1px;
      }
    }
  }
  .load-more__btn {
    text-align: center;
    font-size: ${theme.typography.h4.fontSize};
    font-weight: ${theme.typography.h4.fontWeight};
    cursor: pointer;
  }
`

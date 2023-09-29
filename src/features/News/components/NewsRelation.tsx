import { CircularProgressLoading } from "@/components/Loading"
import { StatusType } from "@/enums/news"
import { NewsRelationItem } from "@/features/News/components"
import { AppState } from "@/store"
import { sIsLoading } from "@/store/global/selectors"
import { INewsRes } from "@/types"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, IconButton, styled, Typography } from "@mui/material"
import { Dispatch, useMemo } from "react"
import { connect } from "react-redux"

export interface INewsRelationProps {
  relationNewsList?: INewsRes[]
  setOpen: Dispatch<React.SetStateAction<boolean>>
  pLoading: boolean
  status: number
}

const NewsRelationContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(0.75),
  overflow: "hidden",
  width: "100%",
  border: `2px solid ${theme.palette.grey[300]}`
}))

const NewsRelationHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  color: theme.palette.grey[800],
  borderBottom: `2px solid ${theme.palette.grey[300]}`
}))

const AddCircleIcon = styled(AddCircleOutlineIcon)(({ theme }) => ({
  color: theme.palette.grey[800]
}))

const NewsRelationList = styled(Box)(({ theme }) => ({
  overflow: "auto",
  backgroundColor: theme.palette.background.paper,
  maxHeight: 430
}))

const TypographyNoNewsRelation = styled(Typography)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  color: theme.palette.text.disabled,
  padding: theme.spacing(2, 0)
}))

function NewsRelation({
  pLoading,
  relationNewsList = [],
  setOpen,
  status
}: INewsRelationProps) {
  const renderNewsList = useMemo(() => {
    if (pLoading) return <CircularProgressLoading size={30} />

    return relationNewsList?.length ? (
      relationNewsList.map((news: INewsRes) => (
        <NewsRelationItem key={news.id} news={news} status={status} />
      ))
    ) : (
      <TypographyNoNewsRelation>No news relation here</TypographyNoNewsRelation>
    )
  }, [relationNewsList, pLoading])

  const handleShowModal = () => {
    setOpen(true)
  }

  return (
    <Box>
      <NewsRelationContainer>
        <NewsRelationHeader>
          <Typography variant="h5">Relation News</Typography>
          {status === StatusType.DRAFT && (
            <IconButton onClick={handleShowModal}>
              <AddCircleIcon />
            </IconButton>
          )}
        </NewsRelationHeader>
        <NewsRelationList>{renderNewsList}</NewsRelationList>
      </NewsRelationContainer>
    </Box>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    pLoading: sIsLoading(state)
  }
}

export default connect(mapStateToProps)(NewsRelation)

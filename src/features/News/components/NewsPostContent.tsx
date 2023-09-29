import React, { useState } from "react"
import { Typography, Link, Breadcrumbs, Button, ButtonProps } from "@mui/material"
import { Edit as EditIcon } from "@mui/icons-material"
import { alpha, styled } from "@mui/system"
import parse from "html-react-parser"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { makeStyles } from "@mui/styles"
import { INewsDetail } from "@/types"
import { longDateTimeFormat } from "@/utils/time"
import { BasicTooltip } from "@/components/Tooltip/Tooltip"
import { capitalizeFirstLetter } from "@/utils"
import IMSImage from "@/components/Image/IMSImage"

interface INewsPostContentProps {
  item: INewsDetail,
  isAdmin: boolean,
  isHR: boolean,
  onEdit?: () => void,
  previewMode?: boolean,
  mainCategory: string
}

const EditNewsButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: 'transparent',
  border: 0,
  padding: 0,
  minWidth: 'unset',
  color: alpha(theme.palette.common.white, 0.9),
  marginLeft: theme.spacing(0.5),
  ":hover": {
    border: 0,
    color: alpha(theme.palette.common.white, 1)
  }
}))

export default function NewsPostContent(props: INewsPostContentProps) {
  const styles = useStyles()
  const { item, isAdmin, onEdit, previewMode = false, mainCategory, isHR } = props

  const [showToolTip, setShowToolTip] = useState(false);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/dashboard">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href={`/information/${mainCategory}`}
    >
      { capitalizeFirstLetter(mainCategory) }
    </Link>
  ]
  return (
    <>
      <div className={styles.postHeader}>
        <div className={styles.thumbnailImageContainer}>
          <IMSImage
            src={item.thumbnailImage}
            className={styles.thumnail}
          />
        </div>
        <div className={styles.headerDetails}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Typography className={styles.title} variant="h4">
            {item.title}
          </Typography>
          <div className={styles.postDate}>
            <AccessTimeIcon
              fontSize="small"
              sx={{ verticalAlign: "middle", color: "white" }}
            />
            <Typography>{longDateTimeFormat(item.publishedTime)}</Typography>
            {/* fix tool tip still display when navigate away */}
            {(isAdmin) && !previewMode && (
              (
              <BasicTooltip
                  placement="right"
                  enterDelay={200}
                  content='Edit news'
                  aria-label="Edit news"
                  disableHoverListener
                  onMouseEnter={() => setShowToolTip(true)}
                  onMouseLeave={() => setShowToolTip(false)}
                  open={showToolTip}
                >
                  <EditNewsButton
                    variant="outlined"
                    onClick={onEdit}
                    size="small"
                  >
                  <EditIcon fontSize="small"
                    onClick={() => setShowToolTip(false)}
                    />
                  </EditNewsButton>
                </BasicTooltip>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.postContent}>
        <div>{item.sapo}</div>
        {parse(item.description)}
      </div>
    </>
  )
}
const useStyles = makeStyles({
  thumbnailImageContainer: {
    width: "100%",
    height: "100%",
    "&::after": {
      background:
        "linear-gradient( to bottom,rgba(50, 50, 50, 0) 0,rgba(16, 15, 15, 0.91) 89%, rgba(16, 15, 15, 0.93) 93%)",
      bottom: 0,
      display: "block",
      opacity: 0.93,
      position: "absolute",
      top: "15%",
      transition: " 0.2s all ease-in-out",
      width: "100%",
      content: "''"
    }
  },
  thumnail: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: 10,
    backgroundSize: "cover",
    transition: "width 2s",
    display: "block",
    height: "100%"
  },
  headerDetails: {
    bottom: 0,
    left: 0,
    padding: 28,
    position: "absolute",
    right: 0,
    color: "#fff",
    textAlign: "left",
    "& .MuiBreadcrumbs-root": {
      cursor: "revert",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: 20,
      color: "#fff"
    }
  },
  title: {
    fontWeight: 700
  },
  postDate: {
    marginTop: 10,
    display: "flex",
    gap: 5,
    alignItems: "center"
  },
  postHeader: {
    height: "40vh",
    width: "100%",
    position: "relative",
    marginBottom: 20
  },
  postContent: {
    marginBottom: 20,
    padding: "0 20px",
    "& img": {
      maxWidth: "100%",
      height: "100%"
    },
    "& table": {
      tableLayout: 'fixed'
    },
    "& p": {
      margin: 0
    }
  }
})

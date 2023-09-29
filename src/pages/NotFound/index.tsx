import { Button, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Background from "@/assets/images/notFoundBg.png"
import { useNavigate } from "react-router"
import { styled } from "@mui/material/styles"

const ButtonStyled = styled(Button)(() => ({
  "&.MuiButton-root": {
    padding: "2vh 5vh",
    borderRadius: 41,
    fontSize: "calc(1vh + 9px)",
    backgroundColor: "#D8504F",
    "&:hover": {
      backgroundColor: "#c64c4b"
    }
  }
}))
const useStyles = makeStyles({
  container: {
    background: `url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // height: "calc(100vh - 64px)",
    height: "calc(100vh)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 5px"
  },
  wrapper: {
    maxWidth: 1430
  }
})
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.fontSizeNotFoundTitle,
  lineHeight: 1
}))
const Subtitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.fontSizeNotFoundSubtitle,
  lineHeight: 1.2
}))
const Subtitle2 = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.fontSizeNotFoundSubtitle2,
  margin: "10px 0 10vh 0"
}))
export default function NotFoundPage() {
  const styles = useStyles()
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Title> 404 </Title>
        <Subtitle>Sorry, this page couldn&apos;t be found.</Subtitle>
        <Subtitle2>
          The page you&apos;re looking for may have been deleted, renamed, or temporary
          unavailable.
        </Subtitle2>
        <ButtonStyled
          variant="contained"
          onClick={() => {
            navigate("/dashboard")
          }}
        >
          Back to Dashboard
        </ButtonStyled>
      </div>
    </div>
  )
}

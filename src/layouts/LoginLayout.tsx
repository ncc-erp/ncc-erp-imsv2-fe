import { CoverLogin, LogoNcc } from "@/assets"
import { Button, styled, Typography } from "@mui/material"
import { OverridableTokenClientConfig } from "@react-oauth/google"

export interface ILoginLayoutProps {
  onGoogleLogin: (overrideConfig?: OverridableTokenClientConfig) => void
}

const LoginStyle = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: "100vh",
  position: "relative",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  overflow: "hidden"
}))

const LogoStyle = styled("img")(({ theme }) => ({
  paddingTop: theme.spacing(5)
}))

const TitleStyle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: `${theme.spacing(6)} 0`,
  "& :first-of-type": {
    color: "#303030"
  },
  "& :nth-of-type(2)": {
    color: "#D62015"
  }
}))

const TextStyle = styled(Typography)(({ theme }) => ({
  fontFamily: "Darker Grotesque",
  fontWeight: 800,
  fontSize: 106,
  [theme.breakpoints.down("sm")]: {
    fontSize: 60
  }
}))

const ButtonStyle = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  color: theme.palette.common.black,
  fontSize: 24,
  backgroundColor: "#fce9e8",
  borderColor: "#D62015",
  padding: `${theme.spacing(1)} ${theme.spacing(5)}`,
  textTransform: "none",
  zIndex :theme.zIndex.appBar,
}))

const ImageStyle = styled("img")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  height: "40%"
}))

export default function LoginLayout(props: ILoginLayoutProps) {
  const { onGoogleLogin } = props
  return (
    <LoginStyle>
      <div>
        <LogoStyle src={LogoNcc} />
        <TitleStyle>
          <TextStyle>Welcome to&nbsp;</TextStyle>
          <TextStyle> IMS</TextStyle>
        </TitleStyle>
        <ButtonStyle
          onClick={() => onGoogleLogin()}
          style={{ borderWidth: 4 }}
          variant="outlined"
          color="error"
        >
          Log in with Google
        </ButtonStyle>
      </div>
      <ImageStyle src={CoverLogin} />
    </LoginStyle>
  )
}

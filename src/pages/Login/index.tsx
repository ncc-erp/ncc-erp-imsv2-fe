import LoginLayout from "@/layouts/LoginLayout"
import { AppDispatch } from "@/store"
import { DESTROY_ACTION } from "@/store/rootReducer"
import { loginUser } from "@/store/user/thunkApi"
import { IUserLogin } from "@/types"
import toast from "@/utils/toast"
import { useGoogleLogin } from "@react-oauth/google"
import { useEffect } from "react"
import { connect } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

const LoginPage = ({
  pLogin,
  pDestroyStore
}: {
  pLogin: (params: IUserLogin) => Promise<unknown>
  pDestroyStore: () => void
}) => {
  const token = localStorage.getItem("accessToken")

  if (token) return <Navigate to={"/dashboard"} />

  const nagivate = useNavigate()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await pLogin({
        googleAuthToken: `${tokenResponse["token_type"]} ${tokenResponse["access_token"]}`
      }).then(() => {
        nagivate("/dashboard")
      })
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })

  useEffect(() => {
    pDestroyStore()
  }, [])

  return <LoginLayout onGoogleLogin={handleGoogleLogin} />
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    pLogin: (params: IUserLogin) => dispatch(loginUser(params)),
    pDestroyStore: () => dispatch({ type: DESTROY_ACTION })
  }
}

export default connect(null, mapDispatchToProps)(LoginPage)

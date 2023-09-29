import { worker } from "@/api/__mocks__/browser"
import App from "@/App"
import "@/index.css"
import { store } from "@/store"
import themes from "@/themes"
import { ThemeProvider } from "@mui/material/styles"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { SnackbarProvider } from "notistack"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import StyleGlobal from "@/components/style/global"
import toast, { SnackbarUtilsConfigurator } from "@/utils/toast"
import Button from "@mui/material/Button"
import { CloseToastOverlay } from "./components/Toast/CloseToastOverlay"
export default store
if (import.meta.env.VITE_USE_MOCK) {
  worker.start()
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StyleGlobal />
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={themes}>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_CLIENT_GOOGLE_OAUTH}
          >
            <SnackbarProvider
              maxSnack={3}
              action={(e) => <CloseToastOverlay snackbarKey={e} />}
              autoHideDuration={3000}
              preventDuplicate
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <SnackbarUtilsConfigurator />
              <App />
            </SnackbarProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

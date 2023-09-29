import { AppDispatch, AppState } from "@/store"
import { Grid } from "@mui/material"
import { getConfigData } from "@/store/config/thunkApi"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { IEmailSetting, IKomu } from "@/types"
import { sConfigEmail, sConfigKomu } from "@/store/config/selector"
import theme from "@/themes"
import { EmailForm, KomuForm } from "@/features/Configuration"

interface IConfiguration {
  pConfigEmail: IEmailSetting
  pConfigKomu: IKomu
  pFetchConfigData: () => Promise<unknown>
}

function ConfigurationPage(props: IConfiguration) {
  const { pConfigEmail, pConfigKomu, pFetchConfigData } = props

  useEffect(() => {
    pFetchConfigData()
  }, [])

  return (
    <Grid
      container
      spacing={{ xl: 10 }}
      rowSpacing={8}
      sx={{
        height: '100%',
        overflowY: 'auto',
        marginTop: 0
      }}
    >
      <Grid item xl={6} md={12} xs={12} mb={6} sx={{ paddingTop: '0px!important'}}>
        <EmailForm initValues={pConfigEmail} />
      </Grid>
      {/* task 50637: hidden in Release UAT M1 Sprint */}
      {/* <Grid item xl={6} md={12} xs={12}  sx={{ paddingTop: '0px!important'}}>
        <KomuForm initValues={pConfigKomu} />
      </Grid> */}
    </Grid>
  )
}

const mapStateToProps = (state: AppState) => ({
  pConfigEmail: sConfigEmail(state),
  pConfigKomu: sConfigKomu(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  pFetchConfigData: () => dispatch(getConfigData())
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage)

export interface IEmailSetting {
  host: string
  port: string
  password: string
  userName: string
  enableSsl: boolean
  defaultFromAddress: string
  defaultFromDisplayName: string
}

export interface IKomu {
  enableAllowCheckInIMSForAll: boolean
  enableToNoticeKomu: boolean
}

export interface IConfigData {
  email: IEmailSetting
  komu: IKomu
}

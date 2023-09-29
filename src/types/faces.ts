export interface IFacesRes {
  img: string
  checkInAt: string
  fullName: string
  emailAddress: string
  type: string
  branch: string
  projectUsers: {
    projectId: number
    projectName: string
    pms: string[]
  }[]
}
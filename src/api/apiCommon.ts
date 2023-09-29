import AxiosClient from "."

export const takeSelfie = (params: { img: string }) => {
  return AxiosClient.post("face-id/check-in", params).then((res) => {
    return res.data
  })
}

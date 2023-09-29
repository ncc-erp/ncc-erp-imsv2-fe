import AxiosClient from "."

const url = "/file"

export const postFile = async ({ file }: { file: File }) => {
  const res = await AxiosClient.post(url, {file}, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return res.data
}

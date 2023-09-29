import AxiosClient from '.'

const url = '/face-id'
export const getFacesImage = async () => {
    const res = await AxiosClient.get(`${url}/getListImage`)
    return res.data
}
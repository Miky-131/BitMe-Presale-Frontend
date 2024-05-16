import { getRequest, postRequest, putRequest, deleteRequest, postRequest2, getRequest2, putRequest2, postRequestFormData } from "./helper";


export const authenticateUserAction = (data) => {
  return postRequest('authenticate', data).then(res => { return res.data })
}


export const getTrxHistoryAction = (data) => {
  return getRequest('getTrxHistory', data).then(res => { return res.data })
}

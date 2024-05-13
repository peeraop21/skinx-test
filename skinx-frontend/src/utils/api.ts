import axios from 'axios'



const HOSTNAME = import.meta.env.VITE_SKINX_API_URL

const getToken = function () {
    let token = window.localStorage.getItem('tk')
    if (token == null || token == undefined) {
        return null
    } else {
        return `Bearer ${token}`
    }
}

export async function request(method: string, url: string, data: any, auth: boolean = false, contentType: string = 'application/json', responseType: any = null) {
    // const dispatch = useDispatch();
    console.log(data)
    let headers = {}

    if (auth) {
        headers = { Authorization: getToken(), 'Content-Type': contentType }
    } else {
        headers = { 'Content-Type': contentType }
    }
    url = HOSTNAME + url

    try {
        let response
        if (responseType != null) {
            response = await axios({ method, url, data, headers, responseType: responseType })
        } else {
            response = await axios({ method, url, data, headers })
        }
        return response
    } catch (error: any) {
        console.log('API error:', error)
        // if (error?.response?.status === 401 && !error?.response?.data.statusCode) {
        //     // AuthService.logout()
        //     // dispatch(loginFailure("Session expired, please login again"))
        //     window.location.href = '/'
        //     return
        // }
        throw error
    }
}
import axios from 'axios'
import { Modal, message } from 'antd';
import { logout } from '@/services/authService';

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
        console.log('API error:', error);
        if (error.response?.status === 401 && error.response.data.message.includes('Token expired')) {
            Modal.error({
                title: 'Session expired, please login again',
                afterClose: () => {
                    logout();
                    window.location.href = '/login'
                }
              });
            return;
        }else{
            throw error;
        }
    }
}
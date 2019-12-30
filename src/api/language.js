import axios from 'axios'
import { baseUrl } from './'

export default {
    getLanguages: () => axios.get(`${baseUrl}/language`),
    createLanguage: data => axios.post(`${baseUrl}/language`, data)
}
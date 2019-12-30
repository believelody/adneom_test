import axios from 'axios'
import { baseUrl } from './'

export default {
    submitQuizz: data => axios.post(``, data),
    addTrial: data => axios.post(`${baseUrl}/validate`, data)
}
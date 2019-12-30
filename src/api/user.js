import axios from 'axios'
import { baseUrl } from './'

export default {
    createUser: data => axios.post(`${baseUrl}/user`, data)
}
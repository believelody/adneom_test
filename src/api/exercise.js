import axios from 'axios'
import { baseUrl } from './'

export default {
    getExercises: () => axios.get(`${baseUrl}/exercises`),
    createExercice: data => axios.post(`${baseUrl}/exercises`, data),
    getRandomExercise: language => axios.get(`${baseUrl}/exercises/random?language=${language}`)
}
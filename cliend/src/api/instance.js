import axios from 'axios'

const instance = axios.create({
    baseURL:"https://a-redux.herokuapp.com/api"
})
export default instance
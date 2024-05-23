import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode'

export const signupHandler = async ({login, first_name, last_name, password}) => {
    const {data} = await $host.post('api/user/registration', {login, first_name,last_name, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const signinHandler = async ({login, password}) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const checkHandler = async () => {
    try{
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }catch(e){
        return 401
    }

}
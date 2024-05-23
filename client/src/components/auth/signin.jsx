import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { signinHandler } from '../../http/userAPI'
import { SIGNUP_ROUTE } from '../../utils/consts'
import './auth.scss'
import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignIn = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [authForm, setAuthForm] = useState({
        login: '',
        password: '',
    })
    const [message, setMessage] = useState('')

    const random = async () => {
        try{
            const token = await signinHandler(authForm)
            user.setUser(token)
            user.setIsAuth(true)
            navigate('/')
        }catch(e){
            setMessage(e.response.data.message)
        }
    }

    const changeHandler = (event) => {
        setAuthForm({ ...authForm, [event.target.name]: event.target.value })
    }
    
    return (
        <div className='auth'>
            <h1>Вход</h1>
            <input
                type="text"
                name='login'
                placeholder='Логин'
                onChange={changeHandler}
            />
            <input
                type="password"
                name='password'
                placeholder='Пароль'
                onChange={changeHandler}
            />
            <div className='auth__buttons'>
                <h3>{message.length ? message : null}</h3>
                <button onClick={() => random()}>Войти</button>
                <Link to={SIGNUP_ROUTE}>Не зарегестрированны?</Link>
            </div>
        </div>
    )
})

export default SignIn
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { signupHandler } from '../../http/userAPI'
import { SIGNIN_ROUTE } from '../../utils/consts'
import './auth.scss'
import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignUp = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const [authForm, setAuthForm] = useState({
        login: '',
        last_name: '',
        firts_name: '',
        password: '',
    })
    const [message, setMessage] = useState('')

    const random = async () => {
        try{
            const token = await signupHandler(authForm)
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
            <h1>Регистрация</h1>
            <input
                type="text"
                name='login'
                placeholder='Логин'
                onChange={changeHandler}
            />
            <input
                type="text"
                name='first_name'
                placeholder='Имя'
                onChange={changeHandler}
            />
            <input
                type="text"
                name='last_name'
                placeholder='Фамилия'
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
                <button onClick={() => random()}>Регистрация</button>
                <Link to={SIGNIN_ROUTE}>Уже есть аккаунт?</Link>
            </div>
        </div>
    )
})

export default SignUp
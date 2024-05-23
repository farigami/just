import './header.scss'
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { getCategory } from '../../http/categoryAPI';
import { Link } from 'react-router-dom';
import { SIGNIN_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import CartModal from '../modals/cart-modal';
import pizza from '../../static/pizza.png'

const Header = observer(() => {
    const { user} = useContext(Context)
    const [categories, setCategories] = useState([])
    const [ModalShow, setModalShow] = useState(false)
    
    useEffect(() => {
        getCategory().then(data => {
            setCategories(data)
        })
    }, [])

    const logOut = () => {
        user.setUser([])
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }
    return (
        <>
        <header className='header'>
            <div className="header__top">
                <div className="header__top__logo"><Link to='/'>Just <span style={{'color': '#ff3a30'}}>Pizza</span> <img src={pizza} alt="" width="46" srcset="" /> </Link></div>
                <div className="header__top__tools">
                    <Link className="header__top__cart" onClick={() => setModalShow(true)}>Корзина<span>{user.cart.length}</span></Link>
                    {
                        !user.isAuth ?
                            <React.Fragment>
                                <Link className="header__top__auth" to={SIGNIN_ROUTE}>Авторизация</Link>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Link className="header__top__auth" to={SIGNIN_ROUTE} onClick={() => logOut()}>Выход</Link>
                            </React.Fragment>
                    }
                </div>
            </div>
            <div className="header__middle">
                <ul>
                    {categories.length && categories.map(category =>
                        <Link key={category.id} to={'/category/' + category.slug}><li>{category.title}</li></Link>
                    )}
                </ul>
            </div>
        </header>
        <CartModal show={ModalShow} onhide={() => setModalShow(false)} />
        </>
    )
})

export default Header
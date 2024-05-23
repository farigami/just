import { observer } from 'mobx-react-lite'
import './cart.scss'
import { useContext, useState } from 'react'
import { Context } from '../..'
import { Table } from 'react-bootstrap'

const Cart = observer(() => {
    const { user } = useContext(Context)
    return ( 
        <>
            {user.cart.length ?
                <Table striped bordered hover table-sm>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Кол-во</th>
                            <th>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.cart.map((item, key) =>
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td><img src={process.env.REACT_APP_API_URL + item.image} width='100' height='100' alt="" /></td>
                                    <td>{item.title}</td>
                                    <td><div className="cart__tools" ><span onClick={() => user.addCartItem(item)}>+</span>{item.quantity}<span onClick={() => user.deleteCartItem(item)}>-</span></div></td>
                                    <td>{item.price}₽</td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
                :
                <h1 className="empty-cart">
                    Корзина пуста
                </h1>
            }
        </>
    )
})

export default Cart
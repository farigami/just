import { useState, useContext, useEffect } from 'react'
import './admin.scss'
import Table from 'react-bootstrap/Table';
import { getCategory } from '../../http/categoryAPI';
import CreateCategory from '../modals/category-modal';
import CreateProduct from '../modals/product-modal';
import { getProducts } from '../../http/productAPI';
import { getOrders, getOrderProducts } from '../../http/orderAPI';

const OrderProducts = ({ id }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getOrderProducts(id).then(({data}) => {
            setProducts(data)
        })
    }, [id])
    return (
        <>
            {products.length &&
                products.map(product => 
                    <tr key={product.id}>
                        <th>{product.id}</th>
                        <th><img src={process.env.REACT_APP_API_URL + product.image} width='100' height='100'></img></th>
                        <th>{product.title}</th>
                        <th>{product.quantity}</th>
                    </tr>
                )
            }

        </>

    )
}
const Admin = () => {
    const [orders, setOrders] = useState([])
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [categoryVisible, setCategoryVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)
    useEffect(() => {
        getCategory().then(data => {
            setCategories(data)
        })
        getProducts().then(({ data }) => {
            setProducts(data)
        })
        getOrders().then(({ data }) => {
            setOrders(data)
        })
    }, [])
    return (
        <>
            <div className='admin'>
                <div className='admin__panel'><h1>Заказы</h1></div>
                <Table responsive striped bordered hover >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Имя</th>
                            <th>Номер</th>
                            <th>Продукты</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length ? orders.map(order =>
                            <>
                                <tr key={order.id}>
                                    <td key={order.id}>{order.id}</td>
                                    <td key={order.firts_name}>{order.firts_name}</td>
                                    <td key={order.telephone}>{order.telephone}</td>
                                    <td><Table striped bordered hover >
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Изображение</th>
                                                <th>Название</th>
                                                <th>Количество</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <OrderProducts id={order.id} />
                                        </tbody>
                                    </Table></td>
                                </tr>
                            </>
                        ) : null}
                    </tbody>
                </Table>
                <div className='admin__panel'><h1>Категории</h1><button onClick={() => setCategoryVisible(true)}>Добавить категорию</button></div>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Категория</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length ? categories.map(category =>
                            <>
                                <tr key={category.id}>
                                    <td key={category.id}>{category.id}</td>
                                    <td key={category.title}>{category.title}</td>
                                </tr>
                            </>
                        ) : null}

                    </tbody>
                </Table>
                <div className='admin__panel'><h1>Товары</h1><button onClick={() => setProductVisible(true)}>Добавить товар</button></div>
                <Table responsive striped bordered >
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Кол-во</th>
                            <th>Категория</th>
                            <th>Старая цена</th>
                            <th>Цена</th>
                            <th>Скидка</th>
                            <th>Хит</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length && products.map(product =>
                            <>
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td><img src={process.env.REACT_APP_API_URL + product.image} width='150' height='150'></img></td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.amount}</td>
                                    <td>{categories.map(category =>
                                        category.id === product.categoryId &&
                                        category.title
                                    )}</td>
                                    <td>{product.old_price}</td>
                                    <td>{product.price}</td>
                                    <td>{product.sale ? 'СКИДКА' : null}</td>
                                    <td>{product.hit ? 'ХИТ' : null}</td>
                                </tr>
                            </>
                        )}

                    </tbody>
                </Table>
            </div>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
        </>
    )
}

export default Admin
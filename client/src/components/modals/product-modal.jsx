import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { getCategory } from '../../http/categoryAPI';
import { addProduct } from '../../http/productAPI';

const CreateProduct = ({ show, onHide }) => {
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState(null)
    const [sale, setSale] = useState(false)
    const [hit, setHit] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(false)
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        old_price: '',
        price: '',
        amount: '',
    })
    useEffect(() => {
        getCategory().then(data => {
            setCategories(data)
        })
    }, [])
    const Submit = () => {
        const formData = new FormData()
        formData.append('title', productForm.title)
        formData.append('image', file)
        formData.append('description', productForm.description)
        formData.append('old_price', productForm.old_price)
        formData.append('price', productForm.price)
        formData.append('amount', productForm.amount)
        formData.append('categoryId', selectedCategory.id)
        formData.append('hit', hit)
        formData.append('sale', sale)
        addProduct(formData).then(() => {
            onHide()
        })
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const changeHandler = (event) => {
        setProductForm({ ...productForm, [event.target.name]: event.target.value })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{!selectedCategory ? "Выберите Категорию" : selectedCategory.title}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => setSelectedCategory(category)}
                                    key={category.id}
                                >
                                    {category.title}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        name='title'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Control
                        name='description'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Введите опинсание товара"
                        as="textarea"
                    />
                    <Form.Control
                        name='old_price'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Введите старую стоимость товара"
                        type="number"
                    />
                    <Form.Control
                        name='price'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Введите стоимость товара"
                        type="number"
                    />
                    <Form.Control
                        name='amount'
                        onChange={changeHandler}
                        className="mt-3"
                        placeholder="Кол-во на складе"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={selectFile}
                        type="file"
                        name='image'
                    />
                    <hr />
                    <Form.Check
                        inline
                        label="Скидка"
                        name="sale"
                        onClick={(event) => setSale(event.target.checked)}
                    />
                    <Form.Check
                        inline
                        label="Хит"
                        name="hit"
                        onChange={(event) => setHit(event.target.checked)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => Submit()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProduct;
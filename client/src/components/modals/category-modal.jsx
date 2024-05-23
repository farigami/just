import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import { addCategory } from '../../http/categoryAPI';



const CreateCategory = ({show, onHide}) => {
    const [categoryForm, setCategoryForm] = useState({
        title: '',
    })
    const Submit = () => {
        addCategory(categoryForm).then(data => {
            onHide()
            window.location.reload();
        })
    }

    const changeHandler = (event) => {
        setCategoryForm({ ...categoryForm, [event.target.name]: event.target.value })
    }
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        name='title'
                        onChange={changeHandler}
                        placeholder={"Введите название категории"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={() => Submit()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;
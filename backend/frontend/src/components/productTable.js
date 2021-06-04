import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import {deleteProduct} from "../actions/productActions";

function ProductTable({products}) {
    const dispatch = useDispatch()

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(id))
        }
    }

    return(
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            {products.map(product => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}₴</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='light' className='btn-sm'>
                                <i className='fas fa-edit'/>
                            </Button>
                        </LinkContainer>

                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                            <i className='fas fa-trash'/>
                        </Button>
                    </td>

                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export default ProductTable
import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/loader";
import Message from "../components/message";
import Paginate from "../components/paginate";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { ExportReact } from "../components/exportExcelFile";
import ProductTable from "../components/productTable";
import ExcelReader from "../components/importExcelFile";

function ProductListScreen({ history, match }){
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading,  error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete,  error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate,  error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword = history.location.search

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo.is_admin){
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const data = []

    products.forEach(product => {
        const obj = {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand
        }
        data.push(obj)
    })

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>


                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'/> Create Product
                    </Button>
                </Col>


            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading
                ? (<Loader/>)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                        <ProductTable products={products}/>
                            <Paginate pages={pages} page={page} isAdmin={true}/>
                            <Col className='text-left'>
                                <ExportReact dataSet={data} />
                            </Col>
                                <ExcelReader />

                        </div>
                    )

            }

        </div>
    )

}

export default ProductListScreen
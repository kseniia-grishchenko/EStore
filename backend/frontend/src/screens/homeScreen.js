import React, { useEffect } from 'react'
import {Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/product";
import Loader from "../components/loader";
import Message from "../components/message";
import Paginate from "../components/paginate";
import {listProducts} from "../actions/productActions";
import DemoPie from "../components/pieChart";
import DemoColumn from "../components/columnChart";
import ProductCarousel from "../components/productCarousel";
import {listOrders} from "../actions/orderActions";

function HomeScreen({ history }) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    const orderList = useSelector(state => state.orderList)
    const { loading: loadingOrders,  error: errorOrders, orders } = orderList

    let keyword = history.location.search
    useEffect(() => {

        dispatch(listProducts(keyword))
        dispatch(listOrders())

    }, [dispatch, keyword])

    let categories = products?.reduce((acc, product) =>
            ({ ...acc, [product.category]: (acc[product.category] || 0) + 1 }),
        {});

    let orderItems = orders?.reduce((acc, order) => {
        order.orderItems?.forEach(orderItem => (acc[orderItem.name] = (acc[orderItem.name] || 0) + 1))
        return acc
    }, {})
    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1>Latest Products</h1>
            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                    <Row>
                        {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product}/>
                                </Col>
                            )
                        )}
                    </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>
            }
            <div>
                <DemoPie categories={categories}/>
            </div>
            <div>
                <DemoColumn orderItems={orderItems}/>
            </div>

        </div>
    )

}

export default HomeScreen
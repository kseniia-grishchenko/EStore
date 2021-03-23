import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import { getOrderDetails, deliverOrder } from "../actions/orderActions";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants";

function OrderScreen({ match, history }){
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {

        if(!userInfo){
            history.push('/login')
        }


        if(!order || order._id !== Number(orderId) || successDeliver){
            dispatch({type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))

        }

    }, [dispatch,  order, orderId, successDeliver])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return  loading ? (
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) :
        (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'   '}
                                {order.shippingAddress.postalCode},
                                {'   '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered at {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order items</h2>
                            {order.orderItems.length === 0 ? (<Message variant='info'>
                                Order is empty
                            </Message> ): (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col>
                                                    <Link to={`product/${item.product}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x {item.price}₴ = {(item.qty * item.price).toFixed(2)}₴
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items:
                                    </Col>
                                    <Col>
                                        {order.itemsPrice}₴
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>{order.totalPrice}₴</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.is_admin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}
                                >
                                    Mark As Deliver
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>

                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen
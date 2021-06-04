import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutSteps from "../components/checkoutSteps";
import { savePaymentMethod } from "../actions/cartActions";


function PaymentScreen({ history }){
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('С.O.D.')

    if(!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return(
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form as='legend'>Select Method</Form>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='C.O.D. or Credit Card'
                            id='C.O.D.'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>


                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
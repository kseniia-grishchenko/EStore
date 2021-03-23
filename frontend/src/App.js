import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import CartScreen from "./screens/cartScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/registerScreen";
import ProfileScreen from "./screens/profileScreen";
import UserListScreen from "./screens/userListScreen";
import UserEditScreen from "./screens/userEditScreen";
import ShippingScreen from "./screens/shippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/placeOrderScreen";
import OrderScreen from "./screens/orderScreen";
import ProductListScreen from "./screens/productListScreen";
import ProductEditScreen from "./screens/productEditScreen";
import OrderListScreen from "./screens/orderListScreen";

function App() {
  return (
    <Router>
        <Header/>
        <main className="py-3">
            <Container>
                <Route path="/" component={HomeScreen} exact/>
                <Route path="/login" component={LoginScreen}/>
                <Route path="/register" component={RegisterScreen}/>
                <Route path="/profile" component={ProfileScreen}/>
                <Route path="/shipping" component={ShippingScreen}/>
                <Route path="/payment" component={PaymentScreen}/>
                <Route path="/placeorder" component={PlaceOrderScreen}/>
                <Route path="/order/:id" component={OrderScreen}/>
                <Route path="/product/:id" component={ProductScreen}/>
                <Route path="/cart/:id?" component={CartScreen}/>

                <Route path="/admin/userlist" component={UserListScreen}/>
                <Route path="/admin/user/:id/edit" component={UserEditScreen}/>

                <Route path="/admin/productlist" component={ProductListScreen}/>
                <Route path="/admin/product/:id/edit" component={ProductEditScreen}/>

                <Route path="/admin/orderlist" component={OrderListScreen}/>
            </Container>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;

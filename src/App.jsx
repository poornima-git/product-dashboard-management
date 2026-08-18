import React from 'react'

import {
    Routes,
    Route
} from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'

import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import ProductDetails from './pages/ProductDetails'
import Orders from './pages/Orders'

import {
    ToastContainer
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


function App() {

    return (

        <>
            <Navbar />
                <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/products/add" element={<AddProduct />}/>
                <Route path="/products/edit/:id" element={<EditProduct />}/>
                <Route path="/products/:id" element={<ProductDetails />}  />
                <Route path="/orders" element={<Orders />}/>


                <Route path="*" element={

                    <div className="container text-center my-5">
                        <h1>404</h1>
                        <p>Page not found</p>
                    </div>

                    }
                />

            </Routes>


            <ToastContainer
                position="top-center"
                theme="colored"
                autoClose={3000}
                hideProgressBar={true}
            />

        </>

    )
}

export default App
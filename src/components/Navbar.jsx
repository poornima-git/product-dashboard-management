import React from "react"
import { Link } from "react-router-dom"
import { FaStore } from "react-icons/fa"

function Navbar() {

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{
                backgroundColor: "#0f4c5c"
            }}
        >

            <div className="container">

                <Link to="/" className="navbar-brand fw-bold">
                    <FaStore className="me-2" />
                    CartMart
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link to="/" className="nav-link">
                        Dashboard
                    </Link>

                    <Link to="/products"className="nav-link">
                        Products
                    </Link>

                    <Link to="/products/add"className="nav-link">
                        Add Product
                    </Link>

                    <Link to="/orders"className="nav-link">
                        Orders
                    </Link>

                </div>

            </div>

        </nav>
    )
}

export default Navbar
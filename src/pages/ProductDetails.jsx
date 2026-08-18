import React, {
    useEffect,
    useState
} from "react"

import {
    Link,
    useParams
} from "react-router-dom"

import { FaStar } from "react-icons/fa"
import { toast } from "react-toastify"

import {
    getProductAPI
} from "../services/apiService"

function ProductDetails() {

    const { id } = useParams()

    const [product, setProduct] =
        useState(null)

    const [loading, setLoading] =
        useState(true)

    useEffect(() => {

        const getProductDetails =
            async () => {

                try {

                    const response =
                        await getProductAPI(id)

                    if (response.status === 200) {

                        setProduct(
                            response.data
                        )
                    }

                } catch (error) {

                    toast.error(
                        "Unable to get product"
                    )

                } finally {

                    setLoading(false)

                }
            }

        getProductDetails()

    }, [id])

    if (loading) {

        return (

            <div className="container my-5 text-center">

                <div
                    className="spinner-border"
                    style={{
                        color: "#0f4c5c"
                    }}
                />

                <p className="mt-3 text-muted">
                    Loading product...
                </p>

            </div>
        )
    }

    if (!product) {

        return (

            <div className="container my-5">

                <div
                    className="alert text-white border-0"
                    style={{
                        backgroundColor: "#c94c4c"
                    }}
                >
                    Product not found
                </div>

            </div>
        )
    }

    return (

        <div className="container my-5">

            <div className="row justify-content-center">

                <div className="col-lg-9">

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "10px"
                        }}
                    >

                        <div className="row g-0">

                            <div className="col-md-6">

                                <img
                                    src={product.image}
                                    className="img-fluid w-100 h-100"
                                    style={{
                                        minHeight: "450px",
                                        maxHeight: "500px",
                                        objectFit: "cover",
                                        borderRadius:
                                            "10px 0 0 10px"
                                    }}
                                    alt={product.name}
                                />

                            </div>


                            <div className="col-md-6">

                                <div className="card-body p-4">

                                    <span
                                        className="badge mb-3"
                                        style={{
                                            backgroundColor:
                                                "#d9f0f4",
                                            color:
                                                "#0f4c5c"
                                        }}
                                    >
                                        {product.category}
                                    </span>

                                    <h2
                                        className="fw-bold"
                                        style={{
                                            color:
                                                "#0f4c5c"
                                        }}
                                    >
                                        {product.name}
                                    </h2>

                                    <h3 className="fw-bold mt-3">
                                        ₹
                                        {Number(
                                            product.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </h3>

                                    <hr />

                                    <p>

                                        <strong>
                                            Stock:
                                        </strong>{" "}

                                        {Number(
                                            product.stock
                                        ) > 0

                                            ?

                                            <span className="badge bg-success">
                                                {product.stock}
                                            </span>

                                            :

                                            <span className="badge bg-danger">
                                                Out of Stock
                                            </span>

                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Rating:
                                        </strong>{" "}

                                        <FaStar
                                            style={{
                                                color:
                                                    "#f4b400"
                                            }}
                                        />

                                        {" "}
                                        {product.rating}

                                    </p>

                                    <p>

                                        <strong>
                                            Total Sales:
                                        </strong>{" "}

                                        {Number(
                                            product.sales ||
                                            0
                                        )}

                                    </p>


                                    <div className="mt-4">

                                        <Link
                                            to={`/products/edit/${product.id}`}
                                            className="btn text-white me-2"
                                            style={{
                                                backgroundColor:
                                                    "#0f4c5c"
                                            }}
                                        >
                                            Edit Product
                                        </Link>

                                        <Link
                                            to="/products"
                                            className="btn btn-outline-secondary"
                                        >
                                            Back
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ProductDetails
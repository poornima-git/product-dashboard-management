import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import ProductForm from "../components/ProductForm"
import { addProductAPI } from "../services/apiService"

function AddProduct() {

    const navigate = useNavigate()

    const [productDetails, setProductDetails] =
        useState({
            name: "",
            category: "",
            price: "",
            stock: "",
            rating: "",
            image: "",
            sales: 0
        })

    const handleSubmit = async () => {

        try {

            const productData = {

                ...productDetails,

                price:
                    Number(productDetails.price),

                stock:
                    Number(productDetails.stock),

                rating:
                    Number(productDetails.rating),

                sales: 0

            }

            const response =
                await addProductAPI(productData)

            if (response.status === 201) {

                toast.success(
                    "Product added successfully!",
                    {
                        style: {
                            backgroundColor: "#198754"
                        }
                    }
                )

                setTimeout(() => {
                    navigate("/products")
                }, 800)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                "Unable to add product",
                {
                    style: {
                        backgroundColor: "#dc3545"
                    }
                }
            )
        }
    }

    return (

        <div className="container my-5">

            <div className="row justify-content-center">

                <div className="col-lg-7">

                    <h1
                        className="mb-4 fw-bold"
                        style={{
                            color: "#0f4c5c"
                        }}
                    >
                        Add Product
                    </h1>

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "10px"
                        }}
                    >

                        <div className="card-body p-4">

                            <ProductForm
                                productDetails={
                                    productDetails
                                }
                                setProductDetails={
                                    setProductDetails
                                }
                                handleSubmit={
                                    handleSubmit
                                }
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddProduct
import React, {
    useEffect,
    useState
} from "react"

import {
    useNavigate,
    useParams
} from "react-router-dom"

import { toast } from "react-toastify"

import ProductForm from "../components/ProductForm"

import {
    editProductAPI,
    getProductAPI
} from "../services/apiService"

function EditProduct() {

    const { id } = useParams()
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

    const [loading, setLoading] =
        useState(true)

    const getProductDetails = async () => {

        try {

            const response =
                await getProductAPI(id)

            if (response.status === 200) {

                setProductDetails(
                    response.data
                )
            }

        } catch (error) {

            toast.error(
                "Unable to get product details"
            )

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        getProductDetails()

    }, [id])

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

                sales:
                    Number(
                        productDetails.sales || 0
                    )

            }

            const response =
                await editProductAPI(
                    id,
                    productData
                )

            if (response.status === 200) {

                toast.success(
                    "Product updated successfully!",
                    {
                        style: {
                            backgroundColor: "#0f4c5c"
                        }
                    }
                )

                setTimeout(() => {
                    navigate("/products")
                }, 800)
            }

        } catch (error) {

            toast.error(
                "Unable to update product"
            )
        }
    }

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
                        Edit Product
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

export default EditProduct
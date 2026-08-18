import React, {
    useEffect,
    useMemo,
    useState
} from "react"

import { Link } from "react-router-dom"

import SearchBar from "../components/SearchBar"
import ProductTable from "../components/ProductTable"

import {
    deleteProductAPI,
    getAllProductsAPI
} from "../services/apiService"

import { toast } from "react-toastify"

function Products() {

    const [products, setProducts] =
        useState([])

    const [searchKey, setSearchKey] =
        useState("")

    const [category, setCategory] =
        useState("")

    const [stockFilter, setStockFilter] =
        useState("")

    const [sortPrice, setSortPrice] =
        useState("")

    const [currentPage, setCurrentPage] =
        useState(1)

    const [loading, setLoading] =
        useState(true)

    const rowsPerPage = 5

    const getProducts = async () => {

        try {

            setLoading(true)

            const response =
                await getAllProductsAPI()

            if (response.status === 200) {

                setProducts(
                    response.data || []
                )
            }

        } catch (error) {

            console.log(error)

            toast.error(
                "Unable to fetch products"
            )

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        getProducts()

    }, [])

    const filteredProducts =
        useMemo(() => {

            let result = [...products]

            if (searchKey.trim()) {

                result =
                    result.filter(
                        product =>
                            product.name
                                .toLowerCase()
                                .includes(
                                    searchKey
                                        .toLowerCase()
                                )
                    )
            }

            if (category) {

                result =
                    result.filter(
                        product =>
                            product.category ===
                            category
                    )
            }

            if (
                stockFilter ===
                "available"
            ) {

                result =
                    result.filter(
                        product =>
                            Number(
                                product.stock
                            ) > 0
                    )
            }

            if (
                stockFilter ===
                "out"
            ) {

                result =
                    result.filter(
                        product =>
                            Number(
                                product.stock
                            ) === 0
                    )
            }

            if (sortPrice === "low") {

                result.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                )
            }

            if (sortPrice === "high") {

                result.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                )
            }

            return result

        }, [
            products,
            searchKey,
            category,
            stockFilter,
            sortPrice
        ])

    useEffect(() => {

        setCurrentPage(1)

    }, [
        searchKey,
        category,
        stockFilter,
        sortPrice
    ])

    const totalPages =
        Math.ceil(
            filteredProducts.length /
            rowsPerPage
        )

    const lastIndex =
        currentPage * rowsPerPage

    const firstIndex =
        lastIndex - rowsPerPage

    const currentProducts =
        filteredProducts.slice(
            firstIndex,
            lastIndex
        )

    const deleteProduct = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            )

        if (!confirmDelete) {
            return
        }

        try {

            const response =
                await deleteProductAPI(id)

            if (
                response.status === 200 ||
                response.status === 204
            ) {

                toast.success(
                    "Product deleted successfully!"
                )

                getProducts()
            }

        } catch (error) {

            toast.error(
                "Product deletion failed"
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
                    Loading products...
                </p>

            </div>
        )
    }

    return (

        <div className="container my-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1
                    className="fw-bold"
                    style={{
                        color: "#0f4c5c"
                    }}
                >
                    All Products
                </h1>

                <Link
                    to="/products/add"
                    className="btn text-white"
                    style={{
                        backgroundColor: "#0f4c5c"
                    }}
                >
                    Add Product
                </Link>

            </div>


            {/* Filters */}

            <div
                className="card border-0 shadow-sm mb-4"
                style={{
                    borderRadius: "10px"
                }}
            >

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-4">

                            <SearchBar
                                searchKey={
                                    searchKey
                                }
                                setSearchKey={
                                    setSearchKey
                                }
                            />

                        </div>


                        <div className="col-md-2">

                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Categories
                                </option>

                                <option value="Electronics">
                                    Electronics
                                </option>

                                <option value="Footwear">
                                    Footwear
                                </option>

                                <option value="Clothing">
                                    Clothing
                                </option>

                                <option value="Bags">
                                    Bags
                                </option>

                                <option value="Cosmetics">
                                    Cosmetics
                                </option>

                                <option value="Home">
                                    Home
                                </option>

                            </select>

                        </div>


                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={stockFilter}
                                onChange={(e) =>
                                    setStockFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Stock
                                </option>

                                <option value="available">
                                    Available
                                </option>

                                <option value="out">
                                    Out of Stock
                                </option>

                            </select>

                        </div>


                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={sortPrice}
                                onChange={(e) =>
                                    setSortPrice(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Sort By Price
                                </option>

                                <option value="low">
                                    Low to High
                                </option>

                                <option value="high">
                                    High to Low
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            <ProductTable
                products={currentProducts}
                deleteProduct={deleteProduct}
            />


            {/* Pagination */}

            {totalPages > 0 && (

                <div className="d-flex justify-content-center align-items-center mt-4">

                    <button
                        className="btn btn-outline-secondary me-3"
                        disabled={
                            currentPage === 1
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                    >
                        Previous
                    </button>

                    <span className="fw-semibold">
                        Page {currentPage} of{" "}
                        {totalPages}
                    </span>

                    <button
                        className="btn btn-outline-secondary ms-3"
                        disabled={
                            currentPage ===
                            totalPages
                        }
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>
    )
}

export default Products
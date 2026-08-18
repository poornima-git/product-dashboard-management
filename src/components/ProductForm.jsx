import React, { useState } from "react"
import { toast } from "react-toastify"

function ProductForm({
    productDetails,
    setProductDetails,
    handleSubmit
}) {

    const [errors, setErrors] = useState({})

    const validateForm = () => {

        const newErrors = {}

        const name = productDetails.name.trim()
        const category = productDetails.category
        const price = Number(productDetails.price)
        const stock = Number(productDetails.stock)
        const rating = Number(productDetails.rating)
        const image = productDetails.image.trim()

        if (!name) {
            newErrors.name = "Product name is required"
        }

        if (!category) {
            newErrors.category = "Category is required"
        }

        if (
            productDetails.price === "" ||
            Number.isNaN(price) ||
            price <= 0
        ) {
            newErrors.price = "Enter a valid price"
        }

        if (
            productDetails.stock === "" ||
            Number.isNaN(stock) ||
            stock < 0 ||
            !Number.isInteger(stock)
        ) {
            newErrors.stock = "Enter a valid stock quantity"
        }

        if (
            productDetails.rating === "" ||
            Number.isNaN(rating) ||
            rating < 0 ||
            rating > 5
        ) {
            newErrors.rating =
                "Rating should be between 0 and 5"
        }

        if (!image) {
            newErrors.image = "Image URL is required"
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const updateField = (field, value) => {

        setProductDetails({
            ...productDetails,
            [field]: value
        })

    }

    const submitForm = (e) => {

        e.preventDefault()

        if (validateForm()) {

            handleSubmit()

        } else {

            toast.info("Please check the form")

        }
    }

    const resetForm = () => {

        setProductDetails({
            name: "",
            category: "",
            price: "",
            stock: "",
            rating: "",
            image: "",
            sales: 0
        })

        setErrors({})

    }

    return (

        <form onSubmit={submitForm}>

            {/* Product Name */}

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Product Name
                </label>

                <input
                    type="text"
                    className={`form-control ${
                        errors.name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter product name"
                    value={productDetails.name}
                    onChange={(e) =>
                        updateField(
                            "name",
                            e.target.value
                        )
                    }
                />

                {errors.name && (
                    <div className="invalid-feedback">
                        {errors.name}
                    </div>
                )}

            </div>


            {/* Category */}

            <div className="mb-3">

                <label className="form-label fw-semibold">
                    Category
                </label>

                <select
                    className={`form-select ${
                        errors.category
                            ? "is-invalid"
                            : ""
                    }`}
                    value={productDetails.category}
                    onChange={(e) =>
                        updateField(
                            "category",
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Choose Category
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

                {errors.category && (
                    <div className="invalid-feedback">
                        {errors.category}
                    </div>
                )}

            </div>


            {/* Price / Stock / Rating */}

            <div className="row">

                <div className="col-md-4 mb-3">

                    <label className="form-label fw-semibold">
                        Price
                    </label>

                    <input
                        type="number"
                        min="1"
                        className={`form-control ${
                            errors.price
                                ? "is-invalid"
                                : ""
                        }`}
                        placeholder="Price"
                        value={productDetails.price}
                        onChange={(e) =>
                            updateField(
                                "price",
                                e.target.value
                            )
                        }
                    />

                    {errors.price && (
                        <div className="invalid-feedback">
                            {errors.price}
                        </div>
                    )}

                </div>


                <div className="col-md-4 mb-3">

                    <label className="form-label fw-semibold">
                        Stock
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        className={`form-control ${
                            errors.stock
                                ? "is-invalid"
                                : ""
                        }`}
                        placeholder="Stock"
                        value={productDetails.stock}
                        onChange={(e) =>
                            updateField(
                                "stock",
                                e.target.value
                            )
                        }
                    />

                    {errors.stock && (
                        <div className="invalid-feedback">
                            {errors.stock}
                        </div>
                    )}

                </div>


                <div className="col-md-4 mb-3">

                    <label className="form-label fw-semibold">
                        Rating
                    </label>

                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        className={`form-control ${
                            errors.rating
                                ? "is-invalid"
                                : ""
                        }`}
                        placeholder="0 - 5"
                        value={productDetails.rating}
                        onChange={(e) =>
                            updateField(
                                "rating",
                                e.target.value
                            )
                        }
                    />

                    {errors.rating && (
                        <div className="invalid-feedback">
                            {errors.rating}
                        </div>
                    )}

                </div>

            </div>


            {/* Image */}

            <div className="mb-4">

                <label className="form-label fw-semibold">
                    Image URL
                </label>

                <input
                    type="text"
                    className={`form-control ${
                        errors.image
                            ? "is-invalid"
                            : ""
                    }`}
                    placeholder="Enter image URL"
                    value={productDetails.image}
                    onChange={(e) =>
                        updateField(
                            "image",
                            e.target.value
                        )
                    }
                />

                {errors.image && (
                    <div className="invalid-feedback">
                        {errors.image}
                    </div>
                )}

            </div>


            <button
                type="submit"
                className="btn text-white me-2"
                style={{
                    backgroundColor: "#0f4c5c"
                }}
            >
                Submit
            </button>

            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={resetForm}
            >
                Reset
            </button>

        </form>
    )
}

export default ProductForm
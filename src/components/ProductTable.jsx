import React from "react"
import { Link } from "react-router-dom"
import {
    FaEdit,
    FaTrash,
    FaEye
} from "react-icons/fa"

function ProductTable({
    products,
    deleteProduct
}) {

    return (

        <div className="table-responsive shadow-sm rounded">

            <table className="table table-hover align-middle mb-0">

                <thead
                    style={{
                        backgroundColor: "#0f4c5c",
                        color: "white"
                    }}
                >

                    <tr>

                        <th>#</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>Sales</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {products.length > 0 ?
                        products.map((product, index) => (

                                <tr key={product.id}>

                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>

                                        <Link
                                            to={`/products/${product.id}`}
                                            className="text-decoration-none fw-semibold"
                                            style={{
                                                color: "#0f4c5c"
                                            }}
                                        >
                                            {product.name}
                                        </Link>

                                    </td>

                                    <td>
                                        {product.category}
                                    </td>

                                    <td>
                                        ₹
                                        {Number(
                                            product.price
                                        ).toLocaleString("en-IN")}
                                    </td>

                                    <td>

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

                                    </td>

                                    <td>
                                        ⭐ {product.rating}
                                    </td>

                                    <td>
                                        {Number(
                                            product.sales || 0
                                        )}
                                    </td>

                                    <td>

                                        <Link
                                            to={`/products/${product.id}`}
                                            className="btn btn-sm btn-outline-primary me-1"
                                            title="View"
                                        >
                                            <FaEye />
                                        </Link>

                                        <Link
                                            to={`/products/edit/${product.id}`}
                                            className="btn btn-sm btn-outline-warning me-1"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            onClick={() =>
                                                deleteProduct(
                                                    product.id
                                                )
                                            }
                                            className="btn btn-sm btn-outline-danger"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>

                                    </td>

                                </tr>

                            )
                        )

                        :

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center py-4 text-muted"
                            >
                                No products found.
                            </td>

                        </tr>
                    }

                </tbody>

            </table>

        </div>
    )
}

export default ProductTable
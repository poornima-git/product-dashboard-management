import React from "react"
import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"

function ProductCard({ product }) {

    return (

        <div className="card h-100 shadow-sm border-0"style={{borderRadius: "10px"}}>
            <img src={product.image} className="card-img-top"
                style={{height: "220px",objectFit: "cover",borderRadius: "10px 10px 0 0"}}alt={product.name}/>

            <div className="card-body">

                <h5 className="card-title fw-bold" style={{color: "#0f4c5c"}}>
                    {product.name}
                </h5>

                <p className="text-muted mb-2">
                    {product.category}
                </p>

                <h5 className="fw-bold mb-3">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                </h5>

                <p className="mb-2">

                    <strong>
                        Stock:
                    </strong>

                    {Number(product.stock) > 0
                        ?
                        <span className="badge bg-success ms-2">
                            {product.stock}
                        </span>
                        :
                        <span className="badge bg-danger ms-2">
                            Out of Stock
                        </span>
                    }

                </p>

                <p className="mb-3">

                    <FaStar
                        className="me-1"
                        style={{
                            color: "#f4b400"
                        }}
                    />

                    {product.rating}

                </p>

                <Link to={`/products/${product.id}`} className="btn text-white w-100"
                    style={{
                        backgroundColor: "#0f4c5c"
                    }}
                >
                    View Details
                </Link>

            </div>

        </div>
    )
}

export default ProductCard
import React, {
    useCallback,
    useEffect,
    useState
} from "react"

import {
    getAllOrdersAPI,
    getAllProductsAPI
} from "../services/apiService"

import { Bar } from "react-chartjs-2"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js"

import { toast } from "react-toastify"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)

function Dashboard() {

    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])

    const [loading, setLoading] =
        useState(true)

    const [error, setError] =
        useState("")

    const getDashboardData =
        useCallback(async () => {

            try {

                setLoading(true)
                setError("")

                const productResult =
                    await getAllProductsAPI()

                const orderResult =
                    await getAllOrdersAPI()

                setProducts(
                    productResult.data || []
                )

                setOrders(
                    orderResult.data || []
                )

            } catch (error) {

                console.log(error)

                setError(
                    "Unable to load dashboard data"
                )

                toast.error(
                    "Unable to load dashboard data"
                )

            } finally {

                setLoading(false)

            }

        }, [])

    useEffect(() => {

        getDashboardData()

    }, [getDashboardData])

    const totalRevenue =
        orders.reduce(
            (total, order) =>
                total +
                Number(order.total || 0),
            0
        )

    const outOfStock =
        products.filter(
            product =>
                Number(product.stock || 0) === 0
        ).length

    const topProducts =
        [...products]
            .sort(
                (a, b) =>
                    Number(b.sales || 0) -
                    Number(a.sales || 0)
            )
            .slice(0, 5)

    const chartData = {

        labels:
            topProducts.map(
                product => product.name
            ),

        datasets: [

            {
                label: "Sales",

                data:
                    topProducts.map(
                        product =>
                            Number(
                                product.sales || 0
                            )
                    ),

                backgroundColor: "#0f4c5c",

                borderColor: "#0f4c5c",

                borderWidth: 1

            }

        ]
    }

    const chartOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: true
            },

            tooltip: {
                enabled: true
            }

        },

        scales: {

            x: {
                grid: {
                    display: false
                }
            },

            y: {

                beginAtZero: true,

                ticks: {
                    precision: 0
                }

            }
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
                    Loading dashboard...
                </p>

            </div>
        )
    }

    if (error) {

        return (

            <div className="container my-5">

                <div
                    className="alert text-white border-0 shadow-sm"
                    style={{
                        backgroundColor: "#c94c4c"
                    }}
                >

                    {error}

                    <button
                        className="btn btn-light btn-sm ms-3"
                        onClick={
                            getDashboardData
                        }
                    >
                        Retry
                    </button>

                </div>

            </div>
        )
    }

    return (

        <div className="container my-5">

            <h1
                className="mb-4 fw-bold"
                style={{
                    color: "#0f4c5c"
                }}
            >
                Dashboard
            </h1>


            {/* Dashboard Cards */}

            <div className="row">

                <div className="col-md-3 mb-3">

                    <div
                        className="card border-0 shadow-sm text-white h-100"
                        style={{
                            backgroundColor: "#0f4c5c"
                        }}
                    >

                        <div className="card-body">

                            <h6>
                                Total Products
                            </h6>

                            <h2 className="fw-bold">
                                {products.length}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-3 mb-3">

                    <div
                        className="card border-0 shadow-sm text-white h-100"
                        style={{
                            backgroundColor: "#1976a3"
                        }}
                    >

                        <div className="card-body">

                            <h6>
                                Total Orders
                            </h6>

                            <h2 className="fw-bold">
                                {orders.length}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-3 mb-3">

                    <div
                        className="card border-0 shadow-sm text-white h-100"
                        style={{
                            backgroundColor: "#2e8b70"
                        }}
                    >

                        <div className="card-body">

                            <h6>
                                Total Revenue
                            </h6>

                            <h2 className="fw-bold">
                                ₹
                                {totalRevenue.toLocaleString(
                                    "en-IN"
                                )}
                            </h2>

                        </div>

                    </div>

                </div>


                <div className="col-md-3 mb-3">

                    <div
                        className="card border-0 shadow-sm text-white h-100"
                        style={{
                            backgroundColor: "#c94c4c"
                        }}
                    >

                        <div className="card-body">

                            <h6>
                                Out Of Stock
                            </h6>

                            <h2 className="fw-bold">
                                {outOfStock}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>


            {/* Chart */}

            <div className="row mt-4">

                <div className="col-lg-8 mb-4">

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "10px"
                        }}
                    >

                        <div className="card-body">

                            <h4
                                className="mb-4"
                                style={{
                                    color: "#0f4c5c"
                                }}
                            >
                                Top 5 Products Based on Sales
                            </h4>

                            {topProducts.length > 0

                                ?

                                <div
                                    style={{
                                        height: "380px"
                                    }}
                                >

                                    <Bar
                                        data={chartData}
                                        options={chartOptions}
                                    />

                                </div>

                                :

                                <div className="text-center text-muted py-5">

                                    No product data available

                                </div>
                            }

                        </div>

                    </div>

                </div>


                {/* Top Products */}

                <div className="col-lg-4 mb-4">

                    <div
                        className="card border-0 shadow-sm"
                        style={{
                            borderRadius: "10px"
                        }}
                    >

                        <div className="card-body">

                            <h4
                                className="mb-3"
                                style={{
                                    color: "#0f4c5c"
                                }}
                            >
                                Top Products
                            </h4>

                            {topProducts.length > 0

                                ?

                                topProducts.map(
                                    (product, index) => (

                                        <div
                                            key={
                                                product.id ||
                                                index
                                            }
                                            className="d-flex justify-content-between align-items-center border-bottom py-3"
                                        >

                                            <span>
                                                {index + 1}.{" "}
                                                {product.name}
                                            </span>

                                            <strong>
                                                {Number(
                                                    product.sales ||
                                                    0
                                                )}
                                            </strong>

                                        </div>
                                    )
                                )

                                :

                                <p className="text-muted">
                                    No products available
                                </p>
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Dashboard
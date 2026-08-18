import React, {
    useEffect,
    useMemo,
    useState
} from "react"

import {
    getAllOrdersAPI,
    getOrderAPI
} from "../services/apiService"

import { toast } from "react-toastify"

import { FaEye } from "react-icons/fa"

function Orders() {

    const [orders, setOrders] =
        useState([])

    const [searchKey, setSearchKey] =
        useState("")

    const [status, setStatus] =
        useState("")

    const [sortDate, setSortDate] =
        useState("")

    const [selectedOrder, setSelectedOrder] =
        useState(null)

    const [loading, setLoading] =
        useState(true)

    const getOrders = async () => {

        try {

            setLoading(true)

            const response =
                await getAllOrdersAPI()

            if (response.status === 200) {

                setOrders(
                    response.data || []
                )
            }

        } catch (error) {

            toast.error(
                "Unable to fetch orders"
            )

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        getOrders()

    }, [])

    const filteredOrders =
        useMemo(() => {

            let result =
                orders.filter(
                    order =>
                        String(
                            order.customer || ""
                        )
                            .toLowerCase()
                            .includes(
                                searchKey.toLowerCase()
                            )
                )

            if (status) {

                result =
                    result.filter(
                        order =>
                            order.status ===
                            status
                    )
            }

            if (sortDate === "new") {

                result.sort(
                    (a, b) =>
                        new Date(b.date) -
                        new Date(a.date)
                )
            }

            if (sortDate === "old") {

                result.sort(
                    (a, b) =>
                        new Date(a.date) -
                        new Date(b.date)
                )
            }

            return result

        }, [
            orders,
            searchKey,
            status,
            sortDate
        ])

    const viewOrder = async (id) => {

        try {

            const response =
                await getOrderAPI(id)

            if (response.status === 200) {

                setSelectedOrder(
                    response.data
                )
            }

        } catch (error) {

            toast.error(
                "Unable to get order details"
            )
        }
    }

    const totalOrderAmount =
        orders.reduce(
            (total, order) =>
                total +
                Number(order.total || 0),
            0
        )

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
                    Loading orders...
                </p>

            </div>
        )
    }

    return (

        <div className="container my-5">

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">

                <h1
                    className="fw-bold"
                    style={{
                        color: "#0f4c5c"
                    }}
                >
                    Orders
                </h1>

                <div
                    className="px-3 py-2 rounded text-white"
                    style={{
                        backgroundColor: "#0f4c5c"
                    }}
                >
                    Total Order Amount:
                    {" "}
                    ₹
                    {totalOrderAmount.toLocaleString(
                        "en-IN"
                    )}
                </div>

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

                        <div className="col-md-5">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by customer name"
                                value={searchKey}
                                onChange={(e) =>
                                    setSearchKey(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="col-md-3">

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Status
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>

                            </select>

                        </div>


                        <div className="col-md-4">

                            <select
                                className="form-select"
                                value={sortDate}
                                onChange={(e) =>
                                    setSortDate(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Sort By Date
                                </option>

                                <option value="new">
                                    Newest First
                                </option>

                                <option value="old">
                                    Oldest First
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* Orders Table */}

            <div
                className="table-responsive shadow-sm rounded"
            >

                <table className="table table-hover align-middle mb-0">

                    <thead
                        style={{
                            backgroundColor: "#0f4c5c",
                            color: "white"
                        }}
                    >

                        <tr>

                            <th>#</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>View</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredOrders.length > 0

                            ?

                            filteredOrders.map(
                                (order, index) => (

                                    <tr
                                        key={
                                            order.id
                                        }
                                    >

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            {order.customer}
                                        </td>

                                        <td>
                                            {order.date}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    order.status ===
                                                    "Delivered"

                                                        ?

                                                        "badge bg-success"

                                                        :

                                                        order.status ===
                                                        "Cancelled"

                                                            ?

                                                            "badge bg-danger"

                                                            :

                                                            order.status ===
                                                            "Shipped"

                                                                ?

                                                                "badge bg-primary"

                                                                :

                                                                "badge bg-warning text-dark"
                                                }
                                            >
                                                {order.status}
                                            </span>

                                        </td>

                                        <td>
                                            {order.items}
                                        </td>

                                        <td>
                                            ₹
                                            {Number(
                                                order.total ||
                                                0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() =>
                                                    viewOrder(
                                                        order.id
                                                    )
                                                }
                                            >
                                                <FaEye />
                                            </button>

                                        </td>

                                    </tr>
                                )
                            )

                            :

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center py-4 text-muted"
                                >
                                    No orders found.
                                </td>

                            </tr>
                        }

                    </tbody>

                </table>

            </div>


            {/* Order Details */}

            {selectedOrder && (

                <div
                    className="card border-0 shadow-sm mt-4"
                    style={{
                        borderRadius: "10px"
                    }}
                >

                    <div className="card-body">

                        <div className="d-flex justify-content-between">

                            <h3
                                style={{
                                    color: "#0f4c5c"
                                }}
                            >
                                Order Details
                            </h3>

                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                    setSelectedOrder(
                                        null
                                    )
                                }
                            >
                                X
                            </button>

                        </div>

                        <hr />

                        <p>
                            <strong>
                                Order ID:
                            </strong>{" "}
                            {selectedOrder.id}
                        </p>

                        <p>
                            <strong>
                                Customer:
                            </strong>{" "}
                            {selectedOrder.customer}
                        </p>

                        <p>
                            <strong>
                                Date:
                            </strong>{" "}
                            {selectedOrder.date}
                        </p>

                        <p>
                            <strong>
                                Status:
                            </strong>{" "}
                            {selectedOrder.status}
                        </p>

                        <p>
                            <strong>
                                Items:
                            </strong>{" "}
                            {selectedOrder.items}
                        </p>

                        <h4>
                            Total: ₹
                            {Number(
                                selectedOrder.total ||
                                0
                            ).toLocaleString(
                                "en-IN"
                            )}
                        </h4>

                    </div>

                </div>
            )}

        </div>
    )
}

export default Orders
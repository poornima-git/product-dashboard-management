import axiosService from "../api/axiosService"




export const getAllProductsAPI = async () => {
    return await axiosService("GET", "/products")
}

export const getProductAPI = async (productId) => {
    return await axiosService("GET", `/products/${productId}`)
}

export const addProductAPI = async (productDetails) => {
    return await axiosService("POST", "/products", productDetails)
}

export const editProductAPI = async (productId, productDetails) => {
    return await axiosService(
        "PUT",
        `/products/${productId}`,
        productDetails
    )
}

export const deleteProductAPI = async (productId) => {
    return await axiosService(
        "DELETE",
        `/products/${productId}`
    )
}




export const getAllOrdersAPI = async () => {
    return await axiosService("GET", "/orders")
}

export const getOrderAPI = async (orderId) => {
    return await axiosService(
        "GET",
        `/orders/${orderId}`
    )
}
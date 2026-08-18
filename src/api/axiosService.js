import axiosInstance from "./axiosInstance"

const axiosService = async (
    httpMethod,
    url,
    reqBody = null
) => {

    try {

        const response = await axiosInstance({
            method: httpMethod,
            url: url,
            data: reqBody
        })

        return response

    } catch (error) {

        throw error

    }
}

export default axiosService
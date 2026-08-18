import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },

    (error) => {

        if (error.response) {

            const status = error.response.status

            if (status === 404) {
                console.log("API Not Found")
            }
            else if (status === 500) {
                console.log("Something went wrong... Try again later!!!")
            }
            else {
                console.log("Error:", error.message)
            }

        }
        else if (error.request) {
            console.log("No response from server")
        }
        else {
            console.log("Error:", error.message)
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
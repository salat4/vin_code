import axios from "axios";



axios.defaults.baseURL = "https://vpic.nhtsa.dot.gov/api/"



export const FetchDecode = async (vin) => {
    try {
        const response = await axios.get(`/vehicles/decodevin/${vin}?format=json`,vin)
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

export const FetchList = async () => {
    try {
        const response = await axios.get("/vehicles/GetVehicleVariableList?format=json")
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}

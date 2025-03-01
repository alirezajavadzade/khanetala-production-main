import axios from "axios";


const PriceTemplateK = axios.create({
    baseURL: "http://192.168.43.152:3000/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})


const PriceServiceK = {
    async Gold() {
        const response = await PriceTemplateK.get('api/v1/price/gold');
        return response
    }
}





export default PriceServiceK
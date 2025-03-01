// import axios from "axios";


// const PriceTemplate = axios.create({
//     baseURL: "https://studio.persianapi.com/index.php/web-service/",
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": "Bearer ludkwahfpf8dogmal5us"
//     },
// })


// const PriceService = {
//     async Gold() {
//         const response = await PriceTemplate.get('/gold?format=json&limit=30&page=1');
//         return response
//     }
// }





// export default PriceService


import VerifyTemplate from "./api";


const PriceService = {
    async GoldPrice() {
        const response = await VerifyTemplate.get('/goldPrice');
        return response.data;
    }
}

export default PriceService
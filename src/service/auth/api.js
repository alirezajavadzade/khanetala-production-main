import axios from "axios";


const VerifyTemplate = axios.create({
    baseURL: "https://khaneetala.ir/api",
    // baseURL: 'http://192.168.168.220:3000',
    // timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})





// before request
VerifyTemplate.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// before response
VerifyTemplate.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API Error:", error.response || 'مشکلی در انتقال داده ها بوجود آمده است');
        return Promise.reject(error);
    }
);

export default VerifyTemplate;

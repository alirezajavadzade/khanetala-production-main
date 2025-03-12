import VerifyTemplate from "./api";


const DashboardService = {
    async DahboardChart() {
        const response = await VerifyTemplate.get("/dashboard");
        return response.data;
    },
}


export default DashboardService
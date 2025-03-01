import VerifyTemplate from "./api";


const TradeService = {
    async createInvoice(buyInfo) {
        const body = JSON.stringify(buyInfo);
        const response = await VerifyTemplate.post("/createTransaction", body);
        return response.data;
    },

    async complateTransaction(paymentInfo) {
        const body = JSON.stringify(paymentInfo);
        const response = await VerifyTemplate.post("/completeBuy", body);
        return response.data;
    },

    async GoldBoxBuyTransactions(filterTransactions) {
        const body = JSON.stringify(filterTransactions);
        const response = await VerifyTemplate.post("/selltransactions", body);
        return response.data;
    },

    async GoldBoxSellTransactions(filterTransactions) {
        const body = JSON.stringify(filterTransactions);
        const response = await VerifyTemplate.post("/buytransactions", body);
        return response.data;
    },

    async CreateCart() {
        const body = JSON.stringify();
        const response = await VerifyTemplate.post(`/createCart`);
        return response.data;
    },

    async VerifyTransaction(zarinpal) {
        const body = JSON.stringify(zarinpal);
        console.log(zarinpal)
        const response = await VerifyTemplate.post(`/VerifyTransaction`, body);
        return response.data;
    },

    async createSellInvoice(sellInfo) {
        const body = JSON.stringify(sellInfo);
        const response = await VerifyTemplate.post("/createTransaction", body);
        return response.data;
    },

    async complateSellTransaction(SellPaymentInfo) {
        const body = JSON.stringify(SellPaymentInfo);
        const response = await VerifyTemplate.post("/completeSell", body);
        return response.data;
    },

    async DepositWallet(depositDetail) {
        const body = JSON.stringify({
            "amount": depositDetail
        });
        const response = await VerifyTemplate.post("/deposit", body);
        return response.data;
    },


    async VerifyDepositWallet(zarinpal) {
        const body = JSON.stringify(zarinpal);
        const response = await VerifyTemplate.post(`/VerifyDeposit`, body);
        return response.data;
    },

    async WithdrawWallet(withdrawDetail) {
        const body = JSON.stringify({
            "amount": withdrawDetail
        });
        const response = await VerifyTemplate.post("/withdraw", body);
        return response.data;
    },

    async WalletTransaction(filterTransactions) {
        const body = JSON.stringify(filterTransactions);
        const response = await VerifyTemplate.post(`/WalletTransactions`, body);
        return response.data;
    }

}


export default TradeService
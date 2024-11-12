export default class Api{    
    
    static BASE_URL = "http://localhost:8080"

    static getHeader(){
        const token = localStorage.getItem("token")
        return{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiW1VTRVJdIiwidXNlcm5hbWUiOiJsdXV0aGFuaCIsInN1YiI6Imx1dXRoYW5oIiwiaWF0IjoxNzMxMzE0NTY0LCJleHAiOjE3MzE1MDA5NjR9.9Hu-7LxrK5yy9yd0gvmVfLhysyGUs4WJyykwrKHm3N4`,
            "Content-Type": "application/json"
        }
    }

    static async get(endpoint) {
        try {
            const response = await fetch(`${Api.BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: Api.getHeader(),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json(); 
        } catch (error) {
            console.error('Fetch GET error:', error);
        }
    }

    static async getNoAuth(endpoint) {
        try {
            const response = await fetch(`${Api.BASE_URL}${endpoint}`, {
                method: 'GET',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json(); 
        } catch (error) {
            console.error('Fetch GET error:', error);
        }
    }
    
    static async post(endpoint, data) {
        try {
            const response = await fetch(`${Api.BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: Api.getHeader(),
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch POST error:', error);
        }
    }

    static getSpecByProduct =  async (productId)=>{
        const response = await this.get(`/specifications/get-by-product/${productId}`)
        return response
    }

    static getDeleveryByUser =  async ()=>{
        const response = await this.get(`/delevery-information/get-by-user`)
        return response
    }

    static createNewDelevery =  async (data)=>{
        console.log(data)
        const response = await this.post(`/delevery-information/add`,data)
        return response
    }

    static editDelevery =  async (data)=>{
        console.log(data)
        const response = await this.post(`/delevery-information/add`,data)
        return response
    }

    static createNewOrder = async (data) => {
        console.log(data)
        const response = await this.post(`/order/add`,data)
        return response
    }

    static getInforUser = async () => {
        const response = await this.get(`/user/get-user-info`)
        return response
    }

    static addCartItem = async (data) => {
        const response = await this.post(`/cart-items/add`, data)
        return response
    }

    static getCartByAccout = async () => {
        const response = await this.get(`/cart-items/get-by-account`)
        return response
    }

    static getAllProduct = async () => {
        const response = await this.getNoAuth("/product/get-all")
        return response
    }

    static getAvailableProduct = async () => {
        const response = await this.getNoAuth("/product/get-available-product")
        return response
    }

    static getProductById = async (id) => {
        const response = await this.getNoAuth(`/product/get-by-id/${id}`)
        console.log(response)
        return response
    }

    static getProductByCategory = async (id) => {
        const response = await this.getNoAuth(`/product/get-by-category-id/${id}`)
        console.log(response)
        return response
    }

    static getNewProduct = async () => {
        const response = await this.getNoAuth("/product/get-new-products")
        console.log(response)
        return response
    }

    static getHotProduct = async () => {
        const response = await this.getNoAuth("/product/get-hot-products")
        console.log(response)
        return response
    }

    static getAllCategory = async () => {
        const response = await this.getNoAuth("/category/get-all")
        console.log(response)
        return response
    }

    static getAllTeeProduct = async () => {
        const response = await this.get("/tee-product")
        return response
    }
    static getAllJeanProduct = async () => {
        const response = await this.get("/jean-product")
        return response
    }
    static getAllHoodieProduct = async () => {
        const response = await this.get("/hoodie-product")
        return response
    }
    static getAllTShirtProduct = async () => {
        const response = await this.get("/t-shirt-product")
        return response
    }
    static getAllPaintProduct = async ()=>{
        const response = await this.get("/paint-product")
        return response
    }
    static getAllShortProduct = async ()=>{
        const response = await this.get("/short-product")
        return response
    }
}
export default class Api{    
    
    static BASE_URL = "http://localhost:8080"

    static getHeader(){
        const token = localStorage.getItem("token")
        return{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiW1VTRVJdIiwidXNlcm5hbWUiOiJsdXV0aGFuaCIsInN1YiI6Imx1dXRoYW5oIiwiaWF0IjoxNzMxMDgwMDU0LCJleHAiOjE3MzEyNjY0NTR9.9T6ffPppm5_IsYSHZkhFsTBtqeSVvP3TpP5_SRi93gI`,
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

    static getInforUser = async () => {
        const response = await this.get(`/user/get-user-info`)
        return response
    }

    static addCartItem = async (id) => {
        console.log(id)
        const response = await this.get(`/cart-items/add/${id}`)
        return response
    }

    static getAllProduct = async () => {
        const response = await this.getNoAuth("/product/get-all")
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
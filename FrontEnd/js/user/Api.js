export default class Api{    
    
    static BASE_URL = "http://localhost:8080"

    static getHeader(){
        const token = localStorage.getItem("token")
        return{
            Authorization: `Bearer ${token}`,
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

    static getTeeProduct = async ()=>{
        const response = await this.get("/tee-product")
        return response.data
    }
    static getJeanProduct = async ()=>{
        const response = await this.get("/jean-product")
        return response.data
    }
    static getHoodieProduct = async ()=>{
        const response = await this.get("/hoodie-product")
        return response.data
    }
    static getTShirtProduct = async ()=>{
        const response = await this.get("/t-shirt-product")
        return response.data
    }
    static getPaintProduct = async ()=>{
        const response = await this.get("/paint-product")
        return response.data
    }
    static getShortProduct = async ()=>{
        const response = await this.get("/short-product")
        return response.data
    }
}
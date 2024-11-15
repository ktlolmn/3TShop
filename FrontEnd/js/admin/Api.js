export default class Api {

    static BASE_URL = 'http://localhost:8080/'
    static authenticate = "Bearer " + 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiW1VTRVJdIiwidXNlcm5hbWUiOiJUaGFuaFRydW9uZyIsInN1YiI6IlRoYW5oVHJ1b25nIiwiaWF0IjoxNzMxNTcwMDkyLCJleHAiOjE3MzE3NTY0OTJ9.Qj9A4yibgBMRc_Dn1Exa-BzqVcaHVlslQbGBCxjLRMs'

    static async getData(URL) {
        try {
            const response = await fetch(Api.BASE_URL + URL, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": this.authenticate
                }
            })
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    static async postData(URL, data) {
        try {
            const response = await fetch(Api.BASE_URL + URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": this.authenticate
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            return await response.json()      
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    static async putData(URL, data) {
        try {
            const response = await fetch(Api.BASE_URL + URL, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            return await response.json()      
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    static async getCategoryList() {
        const data = await Api.getData('category/get-all')
        if (data) {
            return data
        } else {
            Utils.showToast(
                'Lỗi lấy danh sách danh mục',
                'error'
            )
        }
    }

    static async getAllColors() {
        try {
            const data = await Api.getData('color/get-all-colors');
            if (data) {
                return data
            } else {
                Utils.showToast(
                    'Lỗi lấy danh sách màu sắc',
                    'error'
                )
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    

}
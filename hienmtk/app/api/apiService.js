import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/public",
});

async function callApi(endpoint, method = "GET", body, params) {
    const token = await AsyncStorage.getItem("authToken");
    const queryString = params ? new URLSearchParams(params).toString() : "";
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    const config = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        },
        data: body ? JSON.stringify(body) : null,
    };

    return axiosInstance(config)
        .then((response) => response.data)
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized. Redirecting to login.");
                // Handle unauthorized case
            } else {
                console.error("API call error:", error);
            }
            throw error;
        });
}

export const GET_ALL = (endpoint, params) => {
    console.log("Calling API with endpoint:", endpoint);
    return callApi(endpoint, "GET", null, params); // Pass just the endpoint
};

export function GET_ID(endpoint, id) {
    return callApi(`${endpoint}/${id}`, "GET");
}

export function POST_ADD(endpoint, data) {
    return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint) {
    return callApi(endpoint, "DELETE");
}

export function GET_IMG(endpoint, imgName) {
    const imageURL = `http://localhost:8080/api/public/${endpoint}/${imgName}`; // Đảm bảo định dạng đúng
    console.log("Generated Image URL: ", imageURL); // Log URL
    return imageURL;
}

export async function LOGIN(body) {
    const API_URL_LOGIN = "http://localhost:8080/api/login";

    try {
        const response = await axios.post(API_URL_LOGIN, body, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            const token = response.data.token || response.data["jwt-token"];
            const userId = response.data.userId;
            if (token) {
                await AsyncStorage.setItem("authToken", token);
                await AsyncStorage.setItem("email", body.email);
                console.log("User email stored in AsyncStorage:", body.email);
            } else {
                console.error("Token not found in response");
            }
        } else {
            console.log("Login failed with status:", response.status);
        }
        console.log("Data stored in AsyncStorage:", response.data);
        return response;
    } catch (error) {
        return (error.message, "Sai mật khẩu hoặc email");
        throw error;
    }
}

export function searchProducts(keyword) {
    return callApi(`/products/keyword/${keyword}`, "GET");
}

export function ProductByCategory(categoryId) {
    return callApi(`/categories/${categoryId}/products`, "GET");
}



export async function REGISTER(data, navigate) {
    const API_URL_REGISTER = "http://localhost:8080/api/register";

    const payload = {
        userId: 0,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        password: data.password,
        roles: [{ roleId: 0, roleName: data.roleName || "USER" }],
        address: {
            addressId: 0,
            street: data.street || "Default Street",
            buildingName: data.buildingName || "Default Building",
            city: data.city || "Default City",
            state: data.state || "Default State",
            country: data.country || "Default Country",
            pincode: data.pincode || "000000",
        },
        cart: {
            cartId: 0,
            totalPrice: 0,
            products: [{
                productId: 0,
                productName: "Default Product",
                image: "default.png",
                description: "Default Description",
                quantity: 1,
                price: 0,
                discount: 0,
                specialPrice: 0,
                categoryId: 0,
            }],
        },
    };

    try {
        const response = await axios.post(API_URL_REGISTER, payload, {
            headers: { "Content-Type": "application/json" },
        });

        Alert.alert("Success", "Registration successful!");
        navigate.navigate("SignIn");
        return { success: true, message: response.data.message || "Registration successful" };
    } catch (error) {
        const message = error.response?.data?.message || "Registration failed. Please try again.";
        Alert.alert("Error", message);
        return { success: false, message };
    }
}



export async function CHANGEPASS(userId, data) {
    const API_URL_CHANGEPASS = `http://localhost:8080/api/public/users/${userId}`;

    try {
        const token = await AsyncStorage.getItem('authToken');

        // Logging for debugging
        console.log("Request URL:", API_URL_CHANGEPASS);
        console.log("Request Headers:", {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });
        console.log("Request Data:", data);

        const response = await axios.put(API_URL_CHANGEPASS, data, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            Alert.alert("Success", "Password changed successfully!");
            return response;
        } else {
            console.error("Change password failed with status:", response.status);
            throw new Error("Failed to change password");
        }
    } catch (error) {
        console.error("Change pass error:", error);
        if (error.response && error.response.status === 400) {
            console.error("Bad Request:", error.response.data);
        }
        throw error;
    }
}



export async function ADDCART(cartId, productId, quantity) {
    const API_URL_ADDCART = `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity/${quantity}`;
    const API_URL_UPDATE_CART = `http://localhost:8080/api/public/carts/${cartId}/products/${productId}/quantity`;

    try {
        const emailId = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('authToken');

        const cartData = await GET_CART(emailId, cartId);
        if (!cartData) {
            console.error("Failed to retrieve cart data");
            return;
        }

        // Calculate old quantity based on totalPrice and specialPrice
        const cartItems = cartData.products;
        const existingProduct = cartItems.find(item => item.productId === productId);
        const oldQuantity = existingProduct 
            ? Math.floor(cartData.totalPrice / (existingProduct.specialPrice || 1))
            : 0;

        if (existingProduct) {
            // Update quantity if product exists
            const newQuantity = oldQuantity + quantity;
            const updateResponse = await axios.put(
                `${API_URL_UPDATE_CART}/${newQuantity}`,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Product quantity updated successfully:", updateResponse.status);
            return updateResponse;
        } else {
            // Add new product to cart if it doesn't exist
            const response = await axios.post(API_URL_ADDCART, null, {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200 || response.status === 201) {
                console.log("Product added to cart successfully with status:", response.status);
                return response;
            } else {
                console.error("Failed to add product to cart:", response.status);
            }
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }
};


export async function REMOVEFROMCART(cartId, productId) {
    const API_URL_REMOVEFROMCART = `http://localhost:8080/api/public/carts/${cartId}/product/${productId}`;

    try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await axios.delete(API_URL_REMOVEFROMCART, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("Product removed from cart in database successfully");
        } else {
            console.error("Failed to remove product from cart in database", response.status);
        }
    } catch (error) {
        console.error("Error removing product from cart in database:", error);
    }
}



export async function ADD_ORDER(emailId, cartId, paymentMethod) {
    const API_URL_ADD_ORDER = `http://localhost:8080/api/public/users/${emailId}/carts/${cartId}/payments/${paymentMethod}/order`;

    try {
        const token = await AsyncStorage.getItem('authToken');
        console.log("Token:", token);
        const response = await axios.post(API_URL_ADD_ORDER, {}, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            console.log("Add order successfully");
        } else {
            console.error("Failed to Add order", response.status);
        }
    } catch (error) {
        console.error("Error Add order:", error);
    }
}

export async function OrderByEmail(emailId) {
    const API_URL_GET_ORDER = `http://localhost:8080/api/public/users/${emailId}/orders`;

    try {
        const token = await AsyncStorage.getItem('authToken');
        console.log("Token:", token);
        const response = await axios.get(API_URL_GET_ORDER, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            console.log("Get order successfully");
            return response.data;
        } else {
            console.error("Failed to get order", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error getting order:", error);
        return null;
    }
}


export async function GET_CART(emailId, cartId) {
    const API_URL_GET_CART = `http://localhost:8080/api/public/users/${emailId}/carts/${cartId}`;

    try {
        const token = await AsyncStorage.getItem('authToken');
        console.log("Token:", token);
        const response = await axios.get(API_URL_GET_CART, {
            headers: {
                accept: "*/*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200 || response.status === 201) {
            console.log("Get cart successfully");
            return response.data;
        } else {
            console.error("Failed to get cart", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error getting cart:", error);
        return null;
    }
}

export async function LOGOUT() {
    await localStorage.removeItem("authToken");
    await localStorage.removeItem("email");
    await localStorage.removeItem("userId");
    await localStorage.removeItem("cartId");
    await localStorage.setItem("cart", JSON.stringify([]));


}


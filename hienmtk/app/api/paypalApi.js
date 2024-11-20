let baseURL = "https://api-m.sandbox.paypal.com/";
const base64 = require('base-64');

let clientId = 'AcmkfshyYinMznGLJ7FuLW8f0G-Gwq5-AtnT38hGxsDXXaY9fNUlpM-L-ws4C4_Lqz3JXt9YYoX0OWXV';
let secretKey = 'EJuWc0ZWVC5rPJwGfTBQ0Oq0SxfMwj0v9ZjJnLJ1HpZFnTNhD0_JI98MUYy2x2QWufAKNaqqJUN5pZ3z';

let orderDetail = {
    "intent": "CAPTURE",
    "purchase_units": [
        {
            "items": [
                {
                    "name": "USD",
                    "description": "100.00",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "100.00"
                    }
                }
            ],
            "amount": {
                "currency_code": "USD",
                "value": "100.00",
                "breakdown": {
                    "item_total": {
                        "currency_code": "USD",
                        "value": "100.00"
                    }
                }
            }
        }
    ],
    "application_context": {
        "return_url": "myapp://payment/success",
        "cancel_url": "myapp://payment/cancle"
    }
};


const generateToken = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`)); // Fixed syntax for Authorization header

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseURL + "v1/oauth2/token", requestOptions)
            .then(response => response.json()) // Use .json() directly to parse JSON
            .then(result => {
                console.log("Access Token: ", result.access_token);
                resolve(result.access_token);
            })
            .catch(error => {
                console.log("Error: ", error);
                reject(error);
            });
    });
}

const CreateOrder = (token = '') => {
    var requestOptions = {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        // },
        // body: JSON.stringify(orderDetail),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderDetail)
    };

    return new Promise((resolve, reject) => {
        fetch(baseURL + "v2/checkout/orders", requestOptions)
            .then(response => response.json()) // Use .json() directly to parse JSON
            .then(result => {
                console.log("Order Result: ", result);
                resolve(result);
            })
            .catch(error => {
                console.log("Error: ", error);
                reject(error);
            });
    });
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseURL + `v2/checkout/orders/${id}/capture`, requestOptions)
            .then(response => response.json()) // Use .json() directly to parse JSON
            .then(result => {
                console.log("Order Result: ", result);
                resolve(result);
            })
            .catch(error => {
                console.log("Error: ", error);
                reject(error);
            });
    });
}

export default {
    generateToken,
    CreateOrder,
    capturePayment,
};

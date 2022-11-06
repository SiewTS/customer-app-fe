import axios from 'axios'

const url = `http://localhost:5000/api/customers`

export const fetchCustomers = () => {
    const response = axios.get(url)
    return response;
}

export const fetchSingleCustomer = (id) => {
    const newUrl = url+`/${id}`
    const response = axios.get(newUrl)
    return response;
}

export const registerCustomer = (payload) => {
    const newUrl = url + `/register`;
    const response = axios.post(newUrl,payload)
    return response;
}

export const updateCustomer = (payload,id) => {
    const newUrl = url + `/update/${id}`;
    const response = axios.put(newUrl,payload)
    return response;
}

export const deleteCustomer = (id) => {
    const newUrl = url + `/delete/${id}`;
    const response = axios.delete(newUrl)
    return response;
}
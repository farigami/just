import { $host, $authHost } from "./index";

export const getOrders = async () => {
    const data = $authHost.get('api/order/all')
    return data
}

export const getOrderProducts = async (id) => {
    const data = $authHost.get('api/order/get/' + id)
    return data
}

export const createOrder = async (order) => {
    console.log(order)
    const data = $host.post('api/order/create', order)
    return data
}
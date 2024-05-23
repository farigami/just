import { $host, $authHost } from "./index";

export const addProduct = async (product) => {
    const { data } = $authHost.post(
        '/api/product/create',
        product
    )
}

export const getProducts = async () => {
    const data = $host.get('/api/product/all')
    return data
}

export const getProduct = async (slug) => {
    const data = $host.get('/api/product/find/' + slug)
    return data
}
import { $host, $authHost } from "./index";

export const addCategory = async ({ title }) => {
    const { data } = await $authHost.post('api/product/category/create', { title })
    return data
}

export const getCategory = async () => {
    const { data } = await $host.get('api/product/category')
    return data
}

export const getCategoryProducts = async (slug) => {
    const { data } = await $host.get('api/product/category/' + slug)
    return data
}